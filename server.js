// NPM Libraries to use
const http = require('http');
const express = require('express');
const session = require('express-session');
const io = require('socket.io');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });
// Create the HTTP & RealTime Server
const httpServer = http.createServer(app);
const realtimeServer = io(httpServer);
// Set the View Engine
app.set('view engine', 'ejs');
// Connect to Database
var url = "mongodb://localhost:27017/epts";
mongodb.connect(url, function(err, client) {
  if (err) throw err;
  console.log("Database connection success");
  // Specify the Database name for MongoDB
  const db = client.db('epts');
  //Sets the database to global app variable?
  app.set('db', db);
  // Specify the collection inside the database we will be working with
  const users = db.collection("users");
  const orders = db.collection("orders");
  // Settup sessions
  app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true
  }));
  // Let Express know where to find the public folder
  app.use('/public', express.static('public'));


  // ROUTE HANDLERS BELOW THIS LINE -----------------------------------------------------------------------------
  // Render pages on request
  require('./routes/index')(app);
  require('./routes/sign-out')(app);
  require('./routes/register')(app);
  require('./routes/admin')(app);
  require('./routes/dashboard')(app);
  require('./routes/orders')(app);
  require('./routes/new-order')(app);
  require('./routes/log-in')(app);
  require('./routes/order')(app);

  // REAL TIME SERVER EMITS AND LISTENERS HERE -------------------------------------------------------------
  realtimeServer.on('connect', function (socket) {
  // A client has connected to the realtime server.

    socket.on('want-users-list', async function () {
      // This client is asking for users list data. Ok.
      const usersList = await users.find().toArray();
      socket.emit('users-list', usersList);
    });

    socket.on('want-orders-list', async function () {
      // This client is asking for orders list data. Ok.
      const ordersList = await orders.find().toArray();
      socket.emit('orders-list', ordersList);
    });


  });

  //Start the server
  httpServer.listen(8080, function () {
      console.log('Listening on port 8080.')
  });
});
