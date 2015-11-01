# tm-autoload
---
install:

```sh
npm i --save tm-autoload
```

## examples
---

### load a directory
/Foo/Bar.js
```js
module.exports = 'Foo'
```
/index.js
```js
var autoload = require('tm-autoload');

var App = autoload.load('Foo');

console.log(App.Bar); //return 'Foo'
```

### load a directory with modifier

/Foo/Bar.js
```js
module.exports = {
	Foo: 'Bar'
}
```
/index.js
```js
var autoload = require('tm-autoload');

var App = autoload.load('Foo', function (file) {
	file.Bar = 'Foo';
	return file;
});

console.log(App.Bar.Bar); //return 'Foo'
```
