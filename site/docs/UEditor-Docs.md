# UEditor-Docs

UEditor文档📖 [http://fex.baidu.com/ueditor/#start-start](http://fex.baidu.com/ueditor/#start-start)

创建demo文件📃

```html
<!DOCTYPE HTML>
<html lang="en-US">

<head>
    <meta charset="UTF-8">
    <title>ueditor demo</title>
</head>

<body>
    <!-- 加载编辑器的容器 -->
    <script id="container" name="content" type="text/plain">
        这里写你的初始化内容
    </script>
    <!-- 配置文件 -->
    <script type="text/javascript" src="ueditor.config.js"></script>
    <!-- 编辑器源码文件 -->
    <script type="text/javascript" src="ueditor.all.js"></script>
    <!-- 实例化编辑器 -->
    <script type="text/javascript">
        var ue = UE.getEditor('container');
    </script>
</body>

</html>
```

在浏览器打开demo.html

如果看到了下面这样的编辑器，恭喜你，初次部署成功！

传入自定义的参数

编辑器有很多可自定义的参数项，在实例化的时候可以传入给编辑器：

```js
var ue = UE.getEditor('container', {
    autoHeight: false
});
```

配置项也可以通过 ueditor.config.js 文件修改

设置和读取编辑器的内容

通 getContent 和 setContent 方法可以设置和读取编辑器的内容

```js
var ue = UE.getContent();
//对编辑器的操作最好在编辑器ready之后再做
ue.ready(function() {
    //设置编辑器的内容
    ue.setContent('hello');
    //获取html内容，返回: <p>hello</p>
    var html = ue.getContent();
    //获取纯文本内容，返回: hello
    var txt = ue.getContentTxt();
});
```


