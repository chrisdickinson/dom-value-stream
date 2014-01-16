var readable = require('readable-stream')
  , inherits = require('inherits')

module.exports = Values

function Values(placeholder) {
  if(!(this instanceof Values)) {
    return new Values
  }

  this._placeholder = placeholder === undefined ? '' : placeholder

  readable.Transform.call(this, {
      objectMode: true
    , highWaterMark: 0
  })
}

inherits(Values, readable.Transform)

var cons = Values
  , proto = cons.prototype

proto._transform = function(event, enc, ready) {
  if(!event.target) {
    return this.emit('error', new Error('`event.target` not available!'))
  }

  event.target.value !== null && event.target.value !== undefined ?
    this.push(event.target.value) :
    this.push(this._placeholder)

  ready()
}
