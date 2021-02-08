import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import path from 'path';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import { configureRoutes } from './routes';

const app = express();
app.set('trust proxy', true);
// json parser
app.use(json());

// health check and static files
app.get('/api/ping', (_, res) => res.send({ ping: 'pong' }));
app.use('/api/assets', express.static(path.join(__dirname, '../assets')));

// enable API endpoints
configureRoutes(app);

// 404
app.all('*', async () => {
    throw new NotFoundError();
});
// Any other errors thrown
app.use(errorHandler);

export default app;
