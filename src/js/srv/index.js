/**
 * This handles the api routing for the backend
 * The actual express server is run from the gulpfile
 */

import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import { Router } from 'express';
import api from './api';
import { MONGO_URL } from '../../../local';

export default app => {
  // the front end route (/) is handled in the gulp file itself
  let db;
  MongoClient.connect(MONGO_URL, (err, database) => {
    if (err) {
      console.log('[FATAL]', err);
      return;
    }
    db = database;

    // body parser is used to get POST/URL parameters
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    const apiRouter = Router();
    api(apiRouter, db);
    app.use('/api', apiRouter);
  });
};

