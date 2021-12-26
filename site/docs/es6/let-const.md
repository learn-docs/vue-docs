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

块级作用域的出现 使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了

























