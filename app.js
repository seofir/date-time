const express = require('express');
const moment = require('moment');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from date-time app!');
});

app.listen(port, () => {
  console.log(`Date-time app listening at http://localhost:${port}`);
});