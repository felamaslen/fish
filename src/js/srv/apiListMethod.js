/**
 * API methods to manipulate list data
 */

import { ObjectId as objectId } from 'mongodb';

const validateItem = (value, item) => {
  switch (item.type) {
  case 'date':
    return value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
  case 'string':
    return value.toString().length > 0;
  case 'float':
    const floatValue = parseFloat(value, 10);
    return !isNaN(floatValue) && floatValue >= item.min && floatValue <= item.max;
  case 'int':
    const intValue = parseInt(value, 10);
    return !isNaN(intValue) && intValue >= item.min && intValue <= item.max;
  default:
    return false;
  }
};

const getProps = (propList, body) => {
  const props = {};
  propList.forEach(item => {
    if (typeof body[item.name] !== 'undefined') {
      let value = body[item.name];
      switch (item.type) {
      case 'float':
        value = parseFloat(value, 10);
        break;
      case 'int':
        value = parseInt(value, 10);
        break;
      case 'date':
      case 'string':
        value = value.toString();
      }

      props[item.name] = value;
    }
  });
  return props;
};

const getListItems = (db, table, res, params) => {
  // get a list of items
  let error = false;
  let errorText = null;

  db.collection(table).find(params).toArray((err, results) => {
    const data = {};

    if (err) {
      error = true;
      errorText = err.errmsg;
    }

    data[table] = results.map(item => {
      const out = { id: item._id };
      for (const prop in item.props) {
        out[prop] = item.props[prop];
      }
      return out;
    });

    res.json({ error, errorText, data });
  });
};

export default (router, db, table, options) => {
  router.get(`/${table}`, (req, res) => {
    // get items list
    getListItems(db, table, res, {});
  });
  if (options.listParams) {
    // get filtered items list
    const listParams = options.listParams.map(param => `:${param}`).join('/');
    router.get(`/${table}/${listParams}`, (req, res) => {
      const propsQuery = {};
      for (const prop in req.params) {
        propsQuery[`props.${prop}`] = req.params[prop];
      }
      getListItems(db, table, res, propsQuery);
    });
  }
  router.post(`/${table}/add`, (req, res) => {
    // add an item to the database
    let error = false;
    let errorText = null;

    const reqValidAdd = options.props.reduce((last, item) => {
      if (!last || typeof req.body[item.name] === 'undefined') {
        return false;
      }

      return validateItem(req.body[item.name], item);
    }, true);

    if (!reqValidAdd) {
      error = true;
      errorText = 'Must supply valid data';
    }

    if (!error) {
      const props = getProps(options.props, req.body);

      db.collection(table).insert({ props }, (err, result) => {
        const data = {};

        if (err) {
          error = true;
          errorText = err.errmsg;
          res.json({ error, errorText });
          return;
        }

        data.id = result.insertedIds[0];

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
      let _id;
      try {
        _id = objectId(req.body.id);
      }
      catch (err) {
        error = true;
        errorText = 'Invalid id given';
        res.json({ error, errorText });
        return;
      }

      db.collection(table).deleteOne({ _id }, (err, result) => {
        if (err) {
          error = true;
          errorText = err.errmsg;
        }
        else if (result && !result.deletedCount) {
          error = true;
          errorText = `Item ${_id} does not exist in ${table}`;
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
        return validateItem(req.body[item.name], item);
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
      let _id;
      try {
        _id = objectId(req.body.id);
      }
      catch (err) {
        error = true;
        errorText = 'Invalid id given';
        res.json({ error, errorText });
        return;
      }

      const newProps = getProps(options.props, req.body);

      db.collection(table).find({ _id }).toArray((err, results) => {
        if (err) {
          error = true;
          errorText = err.errmsg;
        }
        else if (!results.length) {
          error = true;
          errorText = `Item ${_id} does not exist in ${table}`;
        }
        if (error) {
          res.json({ error, errorText });
          return;
        }

        const oldProps = results[0].props;
        for (const prop in oldProps) {
          if (!(prop in newProps)) {
            newProps[prop] = oldProps[prop];
          }
        }

        db.collection(table).update({ _id }, {
          $set: { props: newProps }
        }, updateErr => {
          if (updateErr) {
            error = true;
            errorText = err.errmsg;
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

