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









