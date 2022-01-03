# let和const命令

let命令，用来声明变量

所声明的变量，只在let命令所在的代码块内有效。

```js
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

计数器i只在for循环体内有效，在循环体外引用就会报错。

```js
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined
```

不存在变量提升

var命令会发生“变量提升”现象 即变量可以在声明之前使用，值为undefined

let命令 它所声明的变量一定要在声明后使用

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

暂时性死区

只要块级作用域内存在let命令

```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

“暂时性死区”（temporal dead zone，简称 TDZ）

```js
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

“暂时性死区”意味着typeof不再是一个百分之百安全的操作。

```js
typeof x; // ReferenceError
let x;
```

变量x使用let命令声明，所以在声明之前，都属于x的“死区”

```js
typeof undeclared_variable // "undefined"
```

在没有let之前，typeof运算符是百分之百安全的

变量一定要在声明之后使用，否则就报错。

有些“死区”比较隐蔽

```js
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
```

此时y还没有声明，属于“死区”

此时x已经声明

```js
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]
```

```js
// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
```

暂时性死区的本质

只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

不允许重复声明

```js
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
```

不能在函数内部重新声明参数。

```js
function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错
```

ES5 只有全局作用域和函数作用域

块级作用域

内层变量可能会覆盖外层变量。

变量提升

```js
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
```

变量i 它并没有消失，泄露成了全局变量。

```js
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

ES6 的块级作用域

外层代码块不受内层代码块的影响

```js
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

ES6 允许块级作用域的任意嵌套。

```js
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
```

块级作用域的出现 使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了

块级作用域与函数声明

函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

```js
// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch(e) {
  // ...
}
```

上面两种函数声明，根据 ES5 的规定都是非法的。

但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。

```js
function f() { console.log('i am nezha'); }

(function(){
  if (false) {
    // 重复声明一次函数；
    function f() { console.log('i am false'); }
  }
  f();
}());
```

上面代码在 ES5 中运行，会得到“I am inside!”，因为在if内声明的函数f会被提升到函数头部，实际运行的代码如下。

```js
// ES5 环境
function f() { console.log('I am outside!'); }

(function () {
  function f() { console.log('I am inside!'); }
  if (false) {
  }
  f();
}());
```

ES6 就完全不一样了，理论上会得到“I am outside!”。因为块级作用域内声明的函数类似于let，对作用域之外没有影响。但是，如果你真的在 ES6 浏览器中运行一下上面的代码，是会报错的，这是为什么呢？

```js
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```

上面的代码在 ES6 浏览器中，都会报错。

原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。

- 允许在块级作用域内声明函数
- 函数声明类似于var, 即会提升全局作用域或函数作用域的头部
- 同时，函数声明还会提升到所在的作用域的头部

注意，上面三条规则只对es6的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。

根据这三条规则，浏览器的ES6环境中，块级作用域内声明的函数，行为类似于var声明的变量。上面的列子实际运行的代码如下：

```js
// 浏览器的 ES6
function f() { console.log('i am outside'); }
(function(){
  var f = undefined;
  if (false) {
    function f() { console.log('i am inside'); }
  }
  f();
}());
// Uncaught TypeError: f is not a function
```

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```js
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

另外，还有一个需要注意的地方。ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

```js
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}
```

上面代码中，第一种写法没有大括号，所以不存在块级作用域，而let只能出现在当前作用域的顶层，所以报错。第二种写法有大括号，所以块级作用域成立。

函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。

```js
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}
```

const 命令

基本用法

const声明一个只读的常量。一旦声明，常量的值就不能改变。









