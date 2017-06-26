/**
 * API methods to manipulate "last done" data
 */

export default (router, db, item) => {
  router.get(`/last/${item}/:tankId`, (req, res) => {
    let error = false;
    let errorText = null;

    const tankId = req.params.tankId;
    db.collection(item).findOne({ tankId }, (err, results) => {
      let value = null;
      if (err) {
        error = true;
        errorText = err.errmsg;
      }
      else if (results) {
        value = results.value;
      }

      res.json({ error, errorText, value });
    });
  });
  router.post(`/last/${item}/:tankId/update`, (req, res) => {
    let error = false;
    let errorText = null;

    const tankId = req.params.tankId;
    const value = new Date().getTime();

    db.collection(item).save({ tankId, value }, err => {
      if (err) {
        error = true;
        errorText = err.errmsg;
      }

      res.json({ error, errorText });
    });
  });
};

