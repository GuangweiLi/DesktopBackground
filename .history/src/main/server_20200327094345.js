const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const path = require('path');
import getPictures from ('./requestPicture');
console.log(getPictures)

// CORS
app.use((req, res, next) => {
  console.log("receive routes")
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

app.use('setPicture', (req, res, next) => {
  console.log(req.body)
  // pictureWall.getPictures()
  res.json({msg: 'success'})
})

module.exports = app