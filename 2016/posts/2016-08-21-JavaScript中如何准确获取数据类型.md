---
title: JavaScript中如何准确获取数据类型
date: 2016-08-21
author: uolcano
categories: 
- Snippets
tags: 
- JavaScript
- typeof
---

我们知道，有时候使用原生JavaScript要准确判断数据类型，并不容易，比如说跨框架脚本。所以，我们可以做一些工具来准确获取数据类型。

## `typeof`的局限
原生JavaScript提供了`typeof`来获取一些内置类型数据的数据类型，但是它并不能检测所有的数据类型。来看看下面的测试代码

```js
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

以上代码说明了三件事：
- 能够检测函数类型
- 能检测原始值类型，但是数值类型并不准确，比如：NaN
- 它把所有的对象当做object类型看待，即便`null`在语义上并不是一个对象

后两种情况，值得改善、扩展和增强。

## 细化数值类型检测
`typeof`不能准确检测到`Infinity`和`NaN`，所以我们需要将这两个分别出里。

好在从ES3开始，`window`对象就提供了两个方法来检测这两个特别的数值——`window.isNaN`和`window.isFinite`，分别检测一个变量是否为“不是一个数值”，以及一个变量是否有穷。

所以，我们只需要将这两个单独处理，其他的`typeof`检测为数值的，就是我们真正认识的数值了。

```js
var type = typeof arg;
if(type === 'number') {
	if(isNaN(arg)) return 'NaN';
	if(!isFinite(arg)) return 'Infinity';
	return type;
}
```

## 检测对象类型
有两种方式去获取一个某个类型实例的准确类型：

1. `Object.prototype.toString`能够得到JavaScript内置对象的类型，不包括BOM、DOM的对象

2. 每个对象都有的`constructor`属性，存储了在最近的原型链上对构造器的引用，但是对于自定义继承的类型，可能无法获得这个属性，因为往往构造函数的prototype属性是直接被赋值覆盖了的

	你有可能会认为，既然对象的`constructor`属性能够检测到`Object.prototype.toString`不能检测到的类型为何还要用两个。因为像`null`这样的值，是没有`constructor`属性的，只能通过`Object.prototype.toString`来获取。

	因此，我们可以分两步：首先，判断内建对象的类型，然后，判断其他非JavaScript原生对象

	```js
	if(typeof arg === 'object') {
		var type = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
		switch(type){
			case 'number':
			case 'string':
			case 'boolean':
				return 'object ' + type; // 扩展包装类型对象的类型，添加object前缀
			case 'null':
			case 'date':
			case 'regexp':
			    return type;
		    default:
			    return arg.constructor.toString().match(/function\s*([^\(\s]*)/)[1].toLowerCase();
		}
	}
	```

完整代码，查看我的[Gist](https://gist.github.com/uolcano/e4d7a288bc6f092794dd020d09694e83)