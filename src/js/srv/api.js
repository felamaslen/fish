/**
 * Define routes for the api
 */

const setupDatabase = db => {
  db.collection('tanks').createIndex({ id: 1 }, { unique: true });
};

const validateItem = (value, type) => {
  if (type === 'string') {
    return value.toString().length > 0;
  }
  if (type === 'float') {
    return !isNaN(parseFloat(value, 10));
  }
  if (type === 'int') {
    return !isNaN(parseInt(value, 10));
  }
  return false;
};

const getProps = (propList, body) => {
  const props = {};
  propList.forEach(item => {
    if (typeof body[item.name] !== 'undefined') {
      let value = body[item.name];
      if (item.type === 'string') {
        value = value.toString();
      }
      if (item.type === 'float') {
        value = parseFloat(value, 10);
      }
      if (item.type === 'int') {
        value = parseInt(value, 10);
      }

      props[item.name] = value;
    }
  });
  return props;
};

const apiListMethod = (router, db, table, options) => {
  router.get(`/${table}`, (req, res) => {
    // get a list of items
    let error = false;
    let errorText = null;

    db.collection(table).find().toArray((err, results) => {
      const data = {};

      if (err) {
        error = true;
        errorText = err.errmsg;
      }

      data[table] = results.map(item => options.callbackList(item));

      res.json({ error, errorText, data });
    });
  });
  router.post(`/${table}/add`, (req, res) => {
    // add an item to the database
    let error = false;
    let errorText = null;

    const reqValidAdd = options.props.reduce((last, item) => {
      if (!last || typeof req.body[item.name] === 'undefined') {
        return false;
      }

      return validateItem(req.body[item.name], item.type);
    }, true);

    if (!reqValidAdd) {
      error = true;
      errorText = 'Must supply valid data';
    }

    if (!error) {
      const id = options.getId(req.body);
      const props = getProps(options.props, req.body);

      db.collection(table).insert({ id, props }, (err, result) => {
        const data = {};

        if (err) {
          error = true;
          errorText = err.errmsg;
        }

        data.id = id;

        res.json({ error, errorText, data });
      });
    }
    else {
      res.json({ error, errorText });
    }
  });
  router.post(`/${table}/delete`, (req, res) => {
    // delete an item from the database
    let error = false;
    let errorText = null;

    if (!req.body.id || !req.body.id.length) {
      error = true;
      errorText = 'Must supply an id';
    }

    if (!error) {
      const id = req.body.id;

      db.collection(table).deleteOne({ id }, (err, result) => {
        if (err) {
          error = true;
          errorText = err.errmsg;
        }
        else if (result && !result.deletedCount) {
          error = true;
          errorText = `Item ${id} does not exist in ${table}`;
        }

        res.json({ error, errorText });
      });
    }
    else {
      res.json({ error, errorText });
    }
  });
  router.post(`/${table}/update`, (req, res) => {
    // update an item in the database
    let error = false;
    let errorText = null;

    const reqValidUpdate = options.props.reduce((last, item) => {
      const hasItem = typeof req.body[item.name] !== 'undefined';
      if (last === false || (item.required && !hasItem)) {
        return false;
      }

      if (hasItem) {
        return validateItem(req.body[item.name], item.type);
      }
      return last;
    }, null);

    if (!req.body.id || !req.body.id.length) {
      error = true;
      errorText = 'Must supply an id';
    }
    if (!reqValidUpdate) {
      error = true;
      errorText = 'Must supply valid data';
    }

    if (!error) {
      const id = req.body.id;
      const newProps = getProps(options.props, req.body);

      db.collection(table).find({ id }).toArray((err, results) => {
        if (err) {
          error = true;
          errorText = err.errmsg;
          res.json({ error, errorText });
          return;
        }

        const oldProps = results[0].props;
        for (const prop in oldProps) {
          if (!(prop in newProps)) {
            newProps[prop] = oldProps[prop];
          }
        }

        db.collection(table).update({ id }, {
          $set: { props: newProps }
        }, (err, result) => {
          if (err) {
            error = true;
            errorText = err.errmsg;
          }
          else if (result.result && !result.result.nModified) {
            error = true;
            errorText = `Item ${id} unchanged or nonexistent`;
          }

          res.json({ error, errorText });
        });
      });
    }
    else {
      res.json({ error, errorText });
    }
  });
};

export default (router, db) => {
  setupDatabase(db);

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
    getId: body => body.name.toLowerCase().replace(/\s+/, '-'),
    callbackList: tank => {
      return {
        id: tank.id,
        name: tank.props.name,
        volume: tank.props.volume
      };
    }
  });
};

