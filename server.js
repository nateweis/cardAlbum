const express = require('express');
const app = express();

const port = process.env.PORT || 3005;

// middleware
app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`The Card Album is a go on port: ${port}`);
  });