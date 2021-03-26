import * as express from 'express';
import * as cors from 'cors';
import { createMeliApi } from './app/meli';

/**
 * Creates global constants.
 */
const app = express();
const port = process.env.port || 3333;
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

/**
 * Adds cross origin configuration
 */
app.use(cors(corsOptions));

/**
 * Adds the API routes.
 */
createMeliApi(app);

/**
 * Creates the server.
 */
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

/**
 * Logs any errors on the server.
 */
server.on('error', console.error);
