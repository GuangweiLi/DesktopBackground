const request = require('request');
const qs = require('querystring');
let switchTimer = null;
let picIndex = 0;

function getPictures (word) {
  console.log("trigger!")
}
  
const getPictureUrl = (word) => {
  // return new Promise((resolve, reject) => {
  //   const params = {
  //     tn: 'resultjson_com',
  //     ipn: 'rj',
  //     ct: '201326592',
  //     fp: 'result',
  //     queryWord: word,
  //     cl: 2,
  //     lm: -1,
  //     ie: 'utf-8',
  //     oe: 'utf-8',
  //     st: -1,
  //     ic: 0,
  //     word: word,
  //     width: 1920,
  //     height: 1080,
  //     face: 0,
  //     istype: 2,
  //     nc: 1,
  //     pn: picIndex,
  //     rn: 1
  //   }
  //   request.get('https://image.baidu.com/search/acjson?' + qs.stringify(params), null, (err, incoming, res) => {
  //     if (!err) {
  //       resolve(JSON.parse(res).data)
  //     } else {
  //       reject(err)
  //     }
  //   })
  // })
}


getPictureUrl('汽车').then(res => {
  // request.get(data.thumbURL,(err, incoming, res) => {
  //   console.log(res)
  // })
})

module.exports = {}

