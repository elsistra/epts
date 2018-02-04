module.exports = function (app) {

  const bodyParser = require('body-parser');
  const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });
  const mongodb = require('mongodb');
  const ObjectId = mongodb.ObjectId;

  const db = app.get('db')
  const orders = db.collection("orders");

  // When the New-comment form is posted, this function will run
  app.post('/new-status', urlencodedBodyParser, async(req, res) =>{
    // Get the POST content from the form
    let orderId = req.body.orderId;
    let status = req.body.status;

    const date = new Date(); // Current date and time
    const year = date.getFullYear();
    const day = date.getDate(); // Unsure here
    const month = date.getMonth() + 1; // Month index is from 0 = January
    const dateString = month + '/' + day + '/' + year;

    // Ensure no fields are empty
    if (!orderId || !status) {
      console.log('A field was left empty');
    }else{
      // Update database
      await orders.updateOne({ _id: new ObjectId(orderId) }, { $set: { status: status } });
      console.log('Attempted to update')
      //Send the user back to the page they were on
      res.redirect('/order/' + orderId);
    }
  });
};
