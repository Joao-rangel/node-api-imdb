import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from './errors/AppError';
import routes from './routes';

import './typeorm';
import './container';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err); // eslint-disable-line no-console

    return response.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  },
);

app.listen(process.env.APP_API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${process.env.APP_API_PORT}`);
});
