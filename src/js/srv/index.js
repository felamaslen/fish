/**
 * This handles the api routing for the backend
 * The actual express server is run from the gulpfile
 */

import { Router as router } from 'express';
import bodyParser from 'body-parser';

export default app => {
  // the front end route (/) is handled in the gulp file itself

  // api
  const apiRouter = router();
  // since we only have a single api endpoint (submit survey), it can be done here in
  // a few lines - otherwise we'd have a separate api.js file and import this stuff
  // from there
  apiRouter.post('/submit_survey', (req, res) => {
    // this doesn't really do anything - the instructions were to log the form details
    // to the console and do nothing else.
    console.log('Form submitted:', req.body);
    // empty response
    res.json({error: false, response: 'Form submitted.'});
  });

  // body parser is used to get POST/URL parameters
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/api', apiRouter);
};

