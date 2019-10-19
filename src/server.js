import express from 'express';
import '@babel/polyfill';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
// import passport from 'passport';

import dbconnect from './db/connection';

import router from './routes';

const app = express();

app.use(cors());

// enable morgan logs only in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// enable use of dotenv config file.
dotenv.config();

// app.use(passport.initialize());
// app.use(passport.session());

// Connect to MongoDB
process.env.NODE_ENV === 'test' ? null : dbconnect();

app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(express.json());

// API routes
app.use('/api/v1', router);

// Handling unavailable routes
app.all('*', (req, res) =>
  res.status(405).json({
    error: 'Method not allowed',
  }),
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
