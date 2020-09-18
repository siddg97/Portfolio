import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Charts from "./GhCharts.js";
import { Loading, cache } from "../../../common";

const GithubProfile = (props) => {
  const [userData, setUserData] = useState(null);
  const [langData, setLangData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [starData, setStarData] = useState(null);

  const initUserData = () => {
    (async () => {
      try {
        // Check cache first
        const data = cache.get("/user");
        if (data) {
          setUserData(data);
        } else {
          // Get user data
          var res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`);
          let user = await res.data;
          cache.set("/user", user, 3600);
          setUserData(user);
        }
      } catch (err) {
        console.log(err.message);
        setUserData(null);
        cache.remove("/user");
      }
    })();
  };

  const initLangData = () => {
    (async function () {
      try {
        // Check cache
        const data = cache.get("/user/lang-stats");
        if (data) {
          setLangData(data);
        } else {
          // Get data
          const res = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/user/lang-stats`
          );
          let response = await res.data;
          const langChartData = response.langStats;
          cache.set("/user/lang-stats", langChartData, 3600);
          setLangData(langChartData);
        }
      } catch (err) {
        console.log(err.message);
        setLangData(null);
        cache.remove("/user/lang-stats");
      }
    })();
  };

  const initRepoData = () => {
    (async function () {
      try {
        // Check cache first
        const data = cache.get("/user/top-repos");
        if (data) {
          setRepoData(data);
        } else {
          // Get data
          const res = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/user/top-repos`
          );
          const response = await res.data;
          const repoChartData = response.topRepos;
          cache.set("/user/top-repos", repoChartData, 3600);
          setRepoData(repoChartData);
        }
      } catch (err) {
        console.log(err.message);
        setRepoData(null);
        cache.remove("/user/top-repos");
      }
    })();
  };

  const initStarData = () => {
    (async function () {
      try {
        // Check cache first
        const data = cache.get("/user/lang-stars");
        if (data) {
          setStarData(data);
        } else {
          const res = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/user/lang-stars`
          );
          const response = await res.data;
          const starChartData = response.langStars;
          cache.set("/user/lang-stars", starChartData, 3600);
          setStarData(starChartData);
        }
      } catch (err) {
        console.log(err.message);
        setStarData(null);
        cache.remove("/user/lang-stars");
      }
    })();
  };

  useEffect(() => {
    initUserData();
    initLangData();
    initRepoData();
    initStarData();
  }, []);

  return (
    <Grid container spacing={1} justify="center" alignItems="center">
      {userData && langData && repoData && starData ? (
        <Charts
          user={userData}
          langData={langData}
          repoData={repoData}
          starData={starData}
        />
      ) : (
        <Loading />
      )}
    </Grid>
  );
};

export default GithubProfile;
