const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, "..", "build")))
// app.use(express.static("public"))

app.get('/', (req, res) => {
  console.log('Hello world received a request.');

  const target = process.env.TARGET || 'World';
  res.send(`Hello1 ${target}!`);
});

app.get('/api', (req, res) => {
    console.log('Hello world received a request.');
  
    const name = req.query.name || 'World';
    console.log(name)
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});