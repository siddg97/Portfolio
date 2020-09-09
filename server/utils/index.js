const axios = require("axios").default;
const GhPolyglot = require("gh-polyglot");

const me = new GhPolyglot("siddg97", process.env.GITHUB_ACCESS_TOKEN);
axios.defaults.headers[
  "Authorization"
] = `token ${process.env.GITHUB_ACCESS_TOKEN}`;

/*
 * Get user data from github and send response
 * @name: getUserData
 * @param: response; express response object
 * @returns: N/A
 */
const getUserData = (response) => {
  axios
    .get(`${process.env.GITHUB_API}/user`)
    .then((res) => res.data)
    .then((data) => {
      const {
        login,
        created_at,
        avatar_url,
        location,
        public_repos,
        followers,
        following,
        name,
        html_url,
      } = data;
      const payload = {
        login,
        created_at,
        avatar_url,
        location,
        public_repos,
        followers,
        following,
        name,
        html_url,
      };
      response.json(payload);
    })
    .catch((err) => {
      response.status(500).json({ error: err.message });
      console.log(err.message);
    });
};

/*
 * Get user top repos from github and send response
 * @name: getTopRepos
 * @param: response; express response object
 * @returns: N/A
 */
const getTopRepos = (response, sortBy, limit = 8) => {
  axios
    .get(`${process.env.GITHUB_API}/users/siddg97/repos`, {
      params: {
        per_page: 100,
      },
    })
    .then((res) => res.data)
    .then((data) => {
      return data
        .filter((repo) => !repo.fork)
        .sort((a, b) => b[sortBy] - a[sortBy])
        .slice(0, limit);
    })
    .then((data) =>
      response.json({
        topRepos: data.map((r) => {
          const {
            name,
            html_url,
            description,
            stargazers_count,
            size,
            forks_count,
          } = r;
          return {
            name,
            html_url,
            description,
            stargazers_count,
            size,
            forks_count,
          };
        }),
      })
    )
    .catch((err) => {
      console.log(err.message);
      response.status(500).json({ error: err.message });
    });
};

/*
 * Get language stats from github and send response
 * @name: getLangStats
 * @param: response; express response object
 * @returns: N/A
 */
const getLangStats = (response) => {
  me.userStats((err, stats) => {
    if (err) {
      response.status(500).json({ error: err.message });
      console.log(err.message);
    } else {
      response.json({ stats: stats });
    }
  });
};

async function fetchRepos() {
  try {
    var res = await axios.get(`${process.env.GITHUB_API}/users/siddg97/repos`);
    return await res.data;
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

/*
 * Get stars for top languages from github and send response
 * @name: getLangStars
 * @param: response; express response object
 * @returns: N/A
 */
const getLangStars = (response) => {
  (async function () {
    try {
      let repos = await fetchRepos();
      const filteredRepos = repos.filter(
        (repo) => !repo.fork && repo.stargazers_count > 0
      );
      const langSet = new Set(filteredRepos.map((r) => r.language));
      const labels = Array.from(langSet.values()).filter((l) => l);
      const data = labels.map((lang) => {
        const repos = filteredRepos.filter((r) => r.language === lang);
        const starCount = repos.map((r) => r.stargazers_count);
        const starSum = starCount.reduce((a, b) => a + b, 0);
        return { [lang]: starSum };
      });
      response.json({ stars: data });
    } catch (err) {
      console.log(err.message);
      response.status(500).json({ error: err.message });
    }
  })();
};

module.exports = {
  getUserData,
  getTopRepos,
  getLangStats,
  getLangStars,
};
