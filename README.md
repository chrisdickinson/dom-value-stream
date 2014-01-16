# dom-value-stream

Transform a stream of DOMEvents to the values they represent (in the case of inputs).

```javascript
var events = require('dom-event-stream')
  , values = require('dom-value-stream')

events(document.querySelector('#source'), 'keyup')
  .pipe(values())
  .pipe(output())

```

## API

### values(placeholder='') -> ValueTransform

Returns a transform stream that translates `DOMEvents`
into values over time (it looks at `ev.target.value`).

If `ev.target.value` is `null` or `undefined`, `placeholder`
is emitted instead. This will be an empty string if not
given as a parameter.

## License

MIT
