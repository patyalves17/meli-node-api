const express = require('express');
const items = require('./routes/items.route');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/items', items);

app.listen(3000, () => {
  console.log('server is loader on localhost:3000');
});
