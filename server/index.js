const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "..", "build")))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routes')); 

// app.get('/activate')
// app.use(function timeLog(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'GET')
//   next();
// });

// app.get('*', (req, res)=> {
//   res.redirect(301, `https://catchstudy.stanford.edu${req.originalUrl}`);
// });




const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on', port);
});