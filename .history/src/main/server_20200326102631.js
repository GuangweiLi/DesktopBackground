const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const path = require('path');

// CORS
app.use((req, res, next) => {
  console.log("receive routes")
  console.log(req)
  if(req.path !== '/' && !req.path.includes('.')){
    res.header({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8'
    })
  }
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.server = app.listen(port, () => {
  console.log(`server running @ http://localhost:${port}`)
})

app.on('test', (req, res, next) => {
  console.log("receive message");
  res.json({msg: 'success'})
})

module.exports = app