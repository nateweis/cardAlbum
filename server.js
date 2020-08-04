const express = require('express');
const app = express();
const session = require('express-session');

const port = process.env.PORT || 3005;

// middleware
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: process.env.SECRET ||'secretKey',
  resave: false,
  saveUninitialized: false
}));

// controllers 
const userConroller = require('./controllers/userRoutes');
app.use('/users', userConroller);

const cardController = require('./controllers/cardRoutes');
app.use('/cards', cardController);

// port listener 
app.listen(port, () => {
    console.log(`The Card Album is a go on port: ${port}`);
  });