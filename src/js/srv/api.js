/**
 * Define routes for the api
 */

import apiListMethod from './apiListMethod';
import apiLastMethod from './apiLastMethod';

export default (router, db) => {
  // allow CORS requests
  router.all('/**', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
  });

  router.get('/', (req, res) => {
    res.json({ error: true, errorText: 'Must supply an API method!' });
  });

  // (Fish) tanks methods
  const propsTank = [
    { name: 'name', type: 'string' },
    { name: 'volume', type: 'float' }
  ];

  apiListMethod(router, db, 'tanks', {
    props: propsTank
  });

  // water test methods
  const propsWater = [
    { name: 'tankId', type: 'string' },
    { name: 'date', type: 'date' },
    { name: 'ph', type: 'float', min: 0, max: 14 },
    { name: 'nh3', type: 'float', min: 0, max: 1000000 },
    { name: 'no2', type: 'float', min: 0, max: 1000000 },
    { name: 'no3', type: 'float', min: 0, max: 1000000 },
    { name: 'kh', type: 'float', min: 0, max: Infinity },
    { name: 'gh', type: 'float', min: 0, max: Infinity },
    { name: 'notes', type: 'string', optional: true }
  ];

  apiListMethod(router, db, 'water', {
    props: propsWater,
    listParams: ['tankId']
  });

  // last feed method
  apiLastMethod(router, db, 'feed');

  // last water change method
  apiLastMethod(router, db, 'waterChange');

  // last filter clean method
  apiLastMethod(router, db, 'filterClean');
};

