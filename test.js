var events = require('dom-event-stream')
  , values = require('./index.js')

var test = require('tape')
  , ever = require('ever')

test('input is drawn from `event.target`', function(assert) {
  var div = document.createElement('div')
    , expected = Math.random() + ''
    , input

  div.innerHTML = '<input type="text" value="" />'
  input = div.querySelector('input')

  document.body.appendChild(div)

  events(div, 'input')
    .pipe(values())
    .on('data', onvalue)

  input.value = expected
  ever(input).emit('input', {canBubble: true})

  function onvalue(val) {
    assert.equal(val, expected)
    assert.end()
  }
})

test('null is passed as undefined', function(assert) {
  var div = document.createElement('div')

  div.innerHTML = '<input type="radio" name="womp" />'

  document.body.appendChild(div)

  events(div, 'click')
    .pipe(values())
    .on('data', onvalue)

  ever(div).emit('click', {canBubble: true})

  function onvalue(val) {
    assert.equal(val, '')
    assert.end()
  }
})

test('emits error if `event.target` is inaccessible', function(assert) {

  var vals = values()

  vals.on('error', onerror)
  vals._transform({}, null, Function())

  function onerror(err) {
    assert.ok(
        err.message.indexOf('event.target') > -1
      , 'error message contains `event.target`'
    )
    assert.end()
  }

})
