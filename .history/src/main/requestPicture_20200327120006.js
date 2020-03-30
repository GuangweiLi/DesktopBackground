const request = require('request');
const qs = require('querystring');
const fs = require('fs');
const {v1} = require('uuid');
const wallpaper = require('wallpaper')
let switchTimer = null;
let picIndex = 0;

function setWall(path) {
  Promise.all([wallpaper.set(path), wallpaper.get()]).then(() => {
    return Promise.resolve()
  })
};

export const getPictures =  (word, option) => {
  startTimer(word, option).then(() => {
    return Promise.resolve()
  })
}
  
const getPictureUrl = async (word, option) => {
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
      width: option.width || 1920,
      height: option.height || 1080,
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
          picIndex ++;
          setWall(imagePath).then(() => {
            checkFiles();
          });
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

const checkFiles = () => {
  const dir = 'src/images';
  fs.readdir(dir, (err, files) => {
    if (files.length > 2) {
      files.forEach((filename) => {
        fs.unlink(`${dir}/${filename}`)
      })
    }
  })
}

const startTimer = (word, option) => {
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
      getPictureUrl(word, option)
    }, option.timegap * 1000 || 30000)
  })
}