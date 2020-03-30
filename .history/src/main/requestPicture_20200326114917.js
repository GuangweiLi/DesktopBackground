const request = require('request');
const qs = require('querystring');
let switchTimer = null;
let picIndex = 0;

function getPictures (word) {
  console.log("trigger!")
}
  


function getPictureUrl (word) {
  const params = {
    tn: 'resultjson_com',
    ipn: 'rj',
    ct: '201326592',
    fp: 'result',
    queryWord: word,
    cl: 2,
    lm: -1,
    ie: 'utf-8',
    oe: 'utf-8',
    st: -1,
    ic: 0,
    word: word,
    width: 1920,
    height: 1080,
    face: 0,
    istype: 2,
    nc: 1,
    pn: picIndex,
    rn: 1
  }
  console.log('https://image.baidu.com/search/acjson?' + qs.stringify(params))
  request.get('https://image.baidu.com/search/acjson?' + qs.stringify(params), null, (err, res) => {
    console.log("trigger!!!!!")
    console.log(res)
  })
  // console.log(request)
  // request.get("https://www.baidu.com",null,(...rest) => {
  //   console.log("trigger")
  //   console.log(rest)
  // })
}

getPictureUrl('汽车')

module.exports = {
  getPictures: getPictures
}

