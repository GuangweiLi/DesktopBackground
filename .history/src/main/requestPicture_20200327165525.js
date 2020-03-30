const request = require('request');
const qs = require('querystring');
const fs = require('fs');
const {v1} = require('uuid');
const wallpaper = require('wallpaper')
let switchTimer = null;
let picIndex = 0;
let picArray = [];

async function setWall(path) {
  await wallpaper.set(path);
  await wallpaper.get();
};

export const getPictures =  (word, option) => {
  startTimer(word, option).then(() => {
    return Promise.resolve()
  })
}
  
const getPictureUrl = (word, option, flag) => {
  return new Promise((resolve, reject) => {
    // const params = {
    //   tn: 'resultjson_com',
    //   ipn: 'rj',
    //   ct: '201326592',
    //   fp: 'result',
    //   queryWord: word,
    //   cl: 2,
    //   lm: -1,
    //   ie: 'utf-8',
    //   oe: 'utf-8',
    //   st: -1,
    //   ic: 0,
    //   word: word,
    //   width: option.width || 1920,
    //   height: option.height || 1080,
    //   face: 0,
    //   istype: 2,
    //   nc: 1,
    //   pn: picIndex,
    //   rn: 1
    // }
    // https://image.baidu.com/search/acjson?
    const params = {
      tn: 'baiduimage',
      ie: 'utf-8',
      word: word,
      ic: 0,
      pn: picIndex,
      lm: -1,
      width: option.width || 1920,
      height: option.height || 1080
    };
    const url = 'http://image.baidu.com/search/flip?';
    if (picArray.length === 0 || flag) {
      request.get(url + qs.stringify(params), null, (err, incoming, res) => {
        if (!err) {
          picArray = res.match(/\"objURL":"http.*?"/g).map((str) => {
            return str.replace(/\"objURL":/,"").replace(/\"/g,"")
          })
          downloadPicture(resolve, reject)
        } else {
          reject()
        }
      })
    } else {
      downloadPicture()
    }
  })
}

const downloadPicture = async (resolve, reject) => {
  let imagePath = `static/${v1()}.png`;
  let downloadUrl = picArray.pop()
  let writeStream = fs.createWriteStream(imagePath);
  let readStream = request(downloadUrl);
  readStream.pipe(writeStream);
  readStream.on('end', async () => {
    picIndex ++;
    await setWall(imagePath);
    checkFiles();
    if (resolve) {
      resolve(imagePath);
    }
  })
  readStream.on('error', () => {
    console.log('文件下载失败!');
    if (reject) {
      reject();
    }
  })
}

const checkFiles = () => {
  const dir = 'static';
  fs.readdir(dir, (err, files) => {
    if (files.length > 20) {
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
    getPictureUrl(word, option, true).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
    switchTimer = setInterval(() => {
      getPictureUrl(word, option, false)
    }, option.timegap * 1000 || 30000)
  })
}