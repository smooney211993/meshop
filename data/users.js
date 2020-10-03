const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin_User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('hello', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: bcrypt.hashSync('hello', 10),
    isAdmin: true,
  },
  {
    name: 'Jane Doe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('hello', 10),
    isAdmin: true,
  },
];

module.exports = users;
