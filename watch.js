const { spawn } = require('child_process')
const { watch } = require('chokidar')

const options = {
  stdio: 'inherit',
  shell: process.platform === 'win32'
}

const debounce = (fn, interval) => {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval)
  }
}

spawn('npm', ['run', 'serve'], options)

const watcher = watch(['templates', 'config.json'])

watcher.on('ready', () => {
  watcher.on('all', debounce(() => {
    spawn('npm', ['run', 'build'], options)
  }, 300))
})