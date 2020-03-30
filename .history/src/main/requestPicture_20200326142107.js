const request = require('request');
const qs = require('querystring');
const fs = require('fs');
const {v1} = require('uuid')
let switchTimer = null;
let picIndex = 0;

function getPictures (word) {
  console.log("trigger!")
}
  
const getPictureUrl = (word) => {
  return new Promise((resolve, reject) => {
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
    let writeStream = fs.createWriteStream(`../images/${v1()}.png`);
    let readStream = request('https://image.baidu.com/search/acjson?' + qs.stringify(params));
    readStream.pipe(writeStream);
    readStream.on('end', () => {
      console.log('文件下载成功!');
      resolve(true);
    })
    readStream.on('error', () => {
      console.log('文件下载失败!');
      reject(false);
    })
    // request.get('https://image.baidu.com/search/acjson?' + qs.stringify(params), null, (err, incoming, res) => {
    //   if (!err) {
    //     resolve(JSON.parse(res).data[0])
    //   } else {
    //     reject(err)
    //   }
    // })
    
  })
}


getPictureUrl('汽车').then(data => {
  request.get(data.thumbURL, (err, incoming, res) => {
    console.log("WERWEREW")
    console.log(res)
  })
})



