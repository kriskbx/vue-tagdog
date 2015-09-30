# vue-tagdog

> A Vue.js directive for [tagdog.js](https://github.com/odiumediae/tagdog.js)

## requirements

* Vue.js `^0.12.0`
* tagdog.js `^0.0.2`

## installation

```bash
npm install vue-tagdog --save
```

## usage

With webpack or browserify:

```javascript
var Vue = require('vue');
Vue.use(require('vue-tagdog'));
```

Direct HTML include:

```javascript
Vue.use(window['vue-tagdog']);
``

Usage of the `v-tagdog` directive:

```html
<p v-tagdog="tags" settings="tagdogSettings">
	<label for="tags">Tags</label>
	<input type="text" id="tags" placeholder="Separate tags with commas" />
</p>
```

```javascript
var vm = new Vue({

	// ...
	
	data: {
		tags: 'blue,red,green',
		tagdogSettings: {
			maxTags: 4
		}
		
	// ...
	
});
```

