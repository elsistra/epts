module.exports = function (app) {
  const db = app.get('db');
  const orders = db.collection('orders');
  const mongodb = require('mongodb');
  const ObjectId = mongodb.ObjectId;
  // Render the dashboard page on request
  app.get('/order/:orderId', async(req, res) => {
    const orderId = new ObjectId(req.params.orderId);
    const order = await orders.findOne({_id: orderId });
    res.render('order', { session: req.session, order });
  });
};
