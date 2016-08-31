---
title: How to get type of some data in JavaScript
date: 2016-08-21 02:25:19
categories:
- FrontEnd
tags:
- JavaScript
---
We known, sometimes it's difficult to get the type of some data, by native JavaScript. Especially scripting cross frames.

So, we need some tools to get it accurately. Let's do it.

## Limitations of `typeof`
JavaScript provides `typeof` to get the type of some data natively.
But the operator can not detect all types of data in JavaScript.
```javascript
typeof undefined              // 'undefined'
typeof 123                    // 'number'
typeof Infinity               // 'number'
typeof NaN                    // 'number'
typeof true                   // 'boolean'
typeof 'abc'                  // 'string'
typeof function(){}           // 'function'
typeof {name: 'uolcano'}      // 'object'
typeof null                   // 'object'
typeof [1,2,3]                // 'object'
typeof new (function F(){})   // 'object'
```
The codes above tell us three things:
- `typeof` can detect function type
- it can detect the primitive values, but not exactly for number type
- it regards all objects as the base object type, even though `null` is not an object semantically.

The latter two situation need to be solved.

## Refining the number detecting
`typeof` can not exactly detect `Infinity` and `NaN`, so we must detect them separately.

There are some hints: the object `window` has two methods -- `window.isNaN` and `window.isFinite`, detect whether a number is 'Not a Number', and whether a number is finite, respectively.
So, we just need to deal with them solely, the other number is really a number.
```javascript
var type = typeof arg;
if(type === 'number') {
	if(isNaN(arg)) return 'NaN';
	if(!isFinite(arg)) return 'Infinity';
	return type;
}
```

## Detecting object type
There two ways to get the correct type of an instance of certain type:
- `Object.prototype.toString` can get the type of the built-in object
- An object's `constructor` property references the constructor on the closest prototype chain

Firstly, we retrieve the type of the built-in object, thus the other objects is some non-native object -- e.g. BOM object, DOM object and developer-customized object.
```javascript
if(typeof arg === 'object') {
	var type = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
	switch(type){
		case 'number':
		case 'string':
		case 'boolean':
			return 'object ' + type;
		case 'null':
		case 'date':
		case 'regexp':
		    return type;
	    default:
		    return arg.constructor.toString().match(/function\s*([^\(\s]*)/)[1].toLowerCase();
	}
}
```

The complete codes:
<script src="https://gist.github.com/uolcano/e4d7a288bc6f092794dd020d09694e83.js"></script>