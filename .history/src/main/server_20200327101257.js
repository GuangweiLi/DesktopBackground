const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const path = require('path');
const router = require('express').Router();
import {getPictures} from'./requestPicture' 

// CORS
app.use('*', (req, res, next) => {
  console.log("receive routes")
  res.header({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
   })
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.server = app.listen(port, () => {
  console.log(`server running @ http://localhost:${port}`)
})

app.use('/', router);

router.post('/api/test', (req, res, next) => {
  console.log("comming!!!")
  // pictureWall.getPictures()
  res.json({msg: 'success'})
})

export default app;