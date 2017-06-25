/**
 * Define routes for the api
 */

import apiListMethod from './apiListMethod';

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
    { name: 'notes', type: 'string' }
  ];

  apiListMethod(router, db, 'water', {
    props: propsWater,
    listParams: ['tankId']
  });
};

