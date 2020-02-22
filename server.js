const express = require('express');
const items = require('./routes/items.route');

const app = express();

// app.get('/', (req, resp) => {
//   resp.send('retornou lol');
// });

app.use('/items', items);

app.listen(3000, () => {
  console.log('server is loader on localhost:3000');
});
