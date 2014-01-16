var readable = require('readable-stream')

var events = require('dom-event-stream')
  , values = require('./index.js')

var input = document.createElement('input')
  , keys = document.createElement('pre')
  , pos = document.createElement('pre')

var moves

document.body.appendChild(input)
document.body.appendChild(keys)
document.body.appendChild(pos)

events(document.body, 'keyup')
  .pipe(values())
  .pipe(writeToElement(keys))

function writeToElement(el) {
  var writable = readable.Writable({objectMode: true})

  writable._write = onwrite

  return writable

  function onwrite(chunk, encoding, ready) {
    el.textContent = chunk
    ready()
  }
}
