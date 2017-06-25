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
    props: propsTank,
    callbackList: tank => {
      return {
        id: tank._id,
        name: tank.props.name,
        volume: tank.props.volume
      };
    }
  });
};

