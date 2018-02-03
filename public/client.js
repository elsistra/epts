console.log('Hello');
const socket = window.io();

// Ask server for users data
socket.emit('want-users-list');

// Listen for users array replacement from server.
socket.on('users-list', function (usersArray) {
  var listElement = document.getElementById('usersList');
  // For each user in Users array...
  usersArray.forEach((user) => {
    const newElement = document.createElement('li');
    newElement.textContent = user.username;
    listElement.appendChild(newElement);
  });
});

// Ask server for orders data
socket.emit('want-orders-list');

// Listen for orders array replacement from server.
socket.on('orders-list', function (ordersArray) {
  var listElement = document.getElementById('ordersList');
  // For each order in orders array...
  ordersArray.forEach((order) => {
    const newElement = document.createElement('li');
    newElement.textContent = order.name;
    listElement.appendChild(newElement);
  });
});
