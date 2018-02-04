module.exports = function (app) {

  const bodyParser = require('body-parser');
  const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });


  // Render the dashboard page on request
  app.get('/new-order', (req, res) => {
    res.render('new-order', { session: req.session });
  });

  const db = app.get('db')
  const orders = db.collection("orders");

  // When the New-Order form is posted, this function will run
  app.post('/new-order', urlencodedBodyParser, async(req, res) =>{
    // Get the POST content from the form
    let name = req.body.name;
    let number = req.body.number;
    let content = req.body.content;

    const date = new Date(); // Current date and time
    const year = date.getFullYear();
    const day = date.getDate(); // Unsure here
    const month = date.getMonth() + 1; // Month index is from 0 = January
    const dateString = month + '/' + day + '/' + year;

    // Ensure no fields are empty
    if (!name || !number || !content) {
      window.console.log('A field was left empty');
    }else{
      // Insert into database
      await orders.insert({name: name, number: number, content: content, date: dateString, status: 'Processing'});
      //Send the user back to the page they were on
      res.redirect('/orders');
    }
  });
};
