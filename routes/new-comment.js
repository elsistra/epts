module.exports = function (app) {

  const bodyParser = require('body-parser');
  const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });
  const mongodb = require('mongodb');
  const ObjectId = mongodb.ObjectId;

  const db = app.get('db')
  const comments = db.collection("comments");

  // When the New-comment form is posted, this function will run
  app.post('/new-comment', urlencodedBodyParser, async(req, res) =>{
    // Get the POST content from the form
    let orderId = req.body.orderId;
    let content = req.body.commentContent;

    const date = new Date(); // Current date and time
    const year = date.getFullYear();
    const day = date.getDate(); // Unsure here
    const month = date.getMonth() + 1; // Month index is from 0 = January
    const dateString = month + '/' + day + '/' + year;

    // Ensure no fields are empty
    if (!orderId || !content) {
      console.log('A field was left empty');
    }else{
      // Insert into database
      await comments.insert({ orderId: new ObjectId(orderId), content: content, date: dateString, user: req.session.username });
      //Send the user back to the page they were on
      res.redirect('/order/' + orderId);
    }
  });
};
