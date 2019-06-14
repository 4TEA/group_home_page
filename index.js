const ejs = require('ejs')
const fs = require('fs')
const config = require('./config.json')

ejs.renderFile('./templates/index.ejs', {
  ...config
}, (err, res) => {
  if (err) {
    console.error(err)
  } else {
    fs.writeFileSync('./index.html', res)
  }
})