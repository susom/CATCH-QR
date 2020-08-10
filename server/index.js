const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, "..", "build")))
app.use(require('./routes'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on', port);
});