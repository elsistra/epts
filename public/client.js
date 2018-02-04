window.console.log('Hello');
const socket = window.io();

// Ask server for users data
socket.emit('want-users-list');

// Listen for users array replacement from server.
socket.on('users-list', function (usersArray) {
  var listElement = document.getElementById('usersList');
  if (!listElement) { return; }
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
  window.console.log(JSON.stringify(ordersArray));
  var listElement = document.getElementById('ordersList');
  if (!listElement) { return; }
  // For each order in orders array...
  ordersArray.forEach((order) => {
    //Create a new div element with class divRow
    const newElement = document.createElement('div');
    newElement.classList.add('row');
    //Create a new div element with class divCell
    const childElement = document.createElement('div');
    childElement.classList.add('cell');
    childElement.textContent = order.date;
    //Create a new div element with class divCell
    const childElement1 = document.createElement('div');
    childElement1.classList.add('cell');
    childElement1.textContent = order.name;
    //Create a new div element with class divCell
    const childElement2 = document.createElement('div');
    childElement2.classList.add('cell');
    childElement2.textContent = order.number;

    //Create a new div element with class divCell
    const childElement3 = document.createElement('div');
    childElement3.classList.add('cell');
    childElement3.textContent = order.status;

    //Create a new div element with class divCell
    const childElement5 = document.createElement('a');
    childElement5.classList.add('cell');
    childElement5.setAttribute('href', '/order/' + order._id);
    childElement5.textContent = 'View';

    //Append the new div element to its parent
    listElement.appendChild(newElement);
    //Append the child element to the new element
    newElement.appendChild(childElement);
    newElement.appendChild(childElement1);
    newElement.appendChild(childElement2);
    newElement.appendChild(childElement3);
    newElement.appendChild(childElement5);
  });
});
