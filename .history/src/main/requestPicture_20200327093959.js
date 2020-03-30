const request = require('request');
const qs = require('querystring');
const fs = require('fs');
const {v1} = require('uuid');
const wallpaper = require('wallpaper')
let switchTimer = null;
let picIndex = 0;

async function setWall(path) {
  await wallpaper.set(path);

  await wallpaper.get();
};

const getPictures =  (word, timegap) => {
  startTimer(word, timegap).then(() => {
    return Promise.resolve()
  })
}
  
const getPictureUrl = async (word) => {
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
    request.get('https://image.baidu.com/search/acjson?' + qs.stringify(params), null, (err, incoming, res) => {
      if (!err) {
        let imagePath = `src/images/${v1()}.png`;
        let response = JSON.parse(res);
        let writeStream = fs.createWriteStream(imagePath);
        let readStream = request(response.data[0].thumbURL);
        readStream.pipe(writeStream);
        readStream.on('end', () => {
          const result = await setWall(imagePath)
          resolve(imagePath);
        })
        readStream.on('error', () => {
          console.log('文件下载失败!');
          reject();
        })
      } else {
        reject()
      }
    })
  })
}

const startTimer = (word, timegap) => {
  return new Promise((resolve, reject) => {
    if (switchTimer) {
      clearInterval(switchTimer)
    }
    getPictureUrl(word).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
    switchTimer = setInterval(() => {
      getPictureUrl(word)
    }, timegap || 30000)
  })
}



module.exports = {
  getPictures
}
// getPictureUrl('汽车').then(data => {
//   console.log(data)
// })



