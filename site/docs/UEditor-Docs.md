# UEditor-Docs

UEditor文档📖 [http://fex.baidu.com/ueditor/#start-start](http://fex.baidu.com/ueditor/#start-start)

重要安全通告：
- commons-fileupload-1.3.1.jar 存在漏洞可能会导致 ddos，源代码中已经修改，使用老版本的用户，强烈推荐升级 commons-fileupload.jar 至最新版本。（2018-04-09）.
- UEditor 所提供的所有后端代码都仅为 DEMO 作用，切不可直接使用到生产环境中，目前已知 php 的代码会存在 ssrf 的安全漏洞。修复方式：使用最新的 Uploader.class code 

下载编辑器

- git clone 仓库
- npm install 安装依赖（如果没有安装 grunt , 请先在全局安装 grunt）
- 在终端执行 grunt default

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

定制工具栏图标

配置项修改说明

修改配置项的方法：

1. 方法一：修改 ueditor.config.js 里面的 toolbars
2. 方法二：实例化编辑器的时候传入 toolbars 参数

```js
var ue = UE.getEditor('container');
```

简单列表

```js
toolbars: [
    ['fullscreen', 'source', 'undo', 'redo', 'bold']
]
```

多行列表

```js
toolbars: [
    ['fullscreen', 'source', 'undo', 'redo'],
    ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
]
```

完整的按钮列表

```js
toolbars: [
    [
        'anchor', //锚点
        'undo', //撤销
        'redo', //重做
        'bold', //加粗
        'indent', //首行缩进
        'snapscreen', //截图
        'italic', //斜体
        'underline', //下划线
        'strikethrough', //删除线
        'subscript', //下标
        'fontborder', //字符边框
        'superscript', //上标
        'formatmatch', //格式刷
        'source', //源代码
        'blockquote', //引用
        'pasteplain', //纯文本粘贴模式
        'selectall', //全选
        'print', //打印
        'preview', //预览
        'horizontal', //分隔线
        'removeformat', //清除格式
        'time', //时间
        'date', //日期
        'unlink', //取消链接
        'insertrow', //前插入行
        'insertcol', //前插入列
        'mergeright', //右合并单元格
        'mergedown', //下合并单元格
        'deleterow', //删除行
        'deletecol', //删除列
        'splittorows', //拆分成行
        'splittocols', //拆分成列
        'splittocells', //完全拆分单元格
        'deletecaption', //删除表格标题
        'inserttitle', //插入标题
        'mergecells', //合并多个单元格
        'deletetable', //删除表格
        'cleardoc', //清空文档
        'insertparagraphbeforetable', //"表格前插入行"
        'insertcode', //代码语言
        'fontfamily', //字体
        'fontsize', //字号
        'paragraph', //段落格式
        'simpleupload', //单图上传
        'insertimage', //多图上传
        'edittable', //表格属性
        'edittd', //单元格属性
        'link', //超链接
        'emotion', //表情
        'spechars', //特殊字符
        'searchreplace', //查询替换
        'map', //Baidu地图
        'gmap', //Google地图
        'insertvideo', //视频
        'help', //帮助
        'justifyleft', //居左对齐
        'justifyright', //居右对齐
        'justifycenter', //居中对齐
        'justifyjustify', //两端对齐
        'forecolor', //字体颜色
        'backcolor', //背景色
        'insertorderedlist', //有序列表
        'insertunorderedlist', //无序列表
        'fullscreen', //全屏
        'directionalityltr', //从左向右输入
        'directionalityrtl', //从右向左输入
        'rowspacingtop', //段前距
        'rowspacingbottom', //段后距
        'pagebreak', //分页
        'insertframe', //插入Iframe
        'imagenone', //默认
        'imageleft', //左浮动
        'imageright', //右浮动
        'attachment', //附件
        'imagecenter', //居中
        'wordimage', //图片转存
        'lineheight', //行间距
        'edittip ', //编辑提示
        'customstyle', //自定义标题
        'autotypeset', //自动排版
        'webapp', //百度应用
        'touppercase', //字母大写
        'tolowercase', //字母小写
        'background', //背景
        'template', //模板
        'scrawl', //涂鸦
        'music', //音乐
        'inserttable', //插入表格
        'drafts', // 从草稿箱加载
        'charts', // 图表
    ]
]
```

前端配置项说明

UEditor 的配置项分为两类：前端配置项 和 后端配置项

配置方法主要通过修改ueditor.config.js，另外在编辑器实例化的时候也可以传入配置参数

```js
var ue = UE.getEditor('container', {
    toolbars: [
        ['fullscreen', 'source', 'undo', 'redo', 'bold']
    ],
    autoHeightEnabled: true,
    autoFloatEnabled: true
});
```

读取配置项

读取配置项可以通过getOpt方法读取

```js
var lang = ue.getOpt('lang'); //默认返回：zh-cn
```

前端配置项说明

以下的"URL"是`ueditor.config.js`文件所在目录

`UEDITOR_HOME_URL {Path String} [默认值：根据config文件路径自动获取]` // 为编辑器实例添加一个路径，这个不能被注释

`serverUrl {Path String} [默认值：URL + "php/controller.php"]` // 服务器统一请求接口路径

`toolbars {2d Array}` //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义

`labelMap {Object} [默认：从lang包的labelMap项获取]` //参数格式是键值对，键名对应toolbar参数的项：`{"bold": "加粗"}` ，当鼠标放在工具栏上时显示的`tooltip`提示，留空支持自动多语言配置，否则以配置值为准

`lang {String} [默认值："zh-cn"]` //lang值也可以通过自动获取 `(navigator.language||navigator.browserLanguage ||navigator.userLanguage)`.
`toLowerCase()`，语言配置项，默认是zh-cn。有需要的话也可以使用如下这样的方式来自动多语言切换，当然，前提条件是lang文件夹下存在对应的语言文件：

`langPath {Path String} [默认值：URL +"lang/"]` //语言包文件存放目录

`theme {String} [默认值：'default']` //主题配置项，默认是default。有需要的话也可以使用如下这样的方式来自动多主题切换，当然，前提条件是themes文件夹下存在对应的主题文件：

`themePath {Path String} [默认值：URL +"themes/"]` //现有如下皮肤：default

`zIndex {Number} [默认值：900]` //编辑器在页面上的z-index层级的基数，默认是900

`charset {String} [默认值："utf-8"]` //针对getAllHtml方法，会在对应的head标签中增加该编码设置。

`customDomain {Boolean} [默认值：false]` //若实例化编辑器的页面手动修改的domain，此处需要设置为true

`isShow {Boolean} [默认值：true]` //默认显示编辑器

`textarea {String} [默认值：'editorValue']` // 提交表单时，服务器获取编辑器提交内容的所用的参数，多实例时可以给容器name属性，会将name给定的值最为每个实例的键值，不用每次实例化的时候都设置这个值

`initialContent {String} [默认值：'欢迎使用ueditor!']` //初始化编辑器的内容，也可以通过textarea/script给值，看官网例子

`autoClearinitialContent {Boolean} [默认值：true]` //是否自动清除编辑器初始内容，注意：如果focus属性设置为true，这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了

`focus {Boolean} [默认值：false]` //初始化时，是否让编辑器获得焦点true或false

`initialStyle {String} [默认值：'p{line-height:1em}']` //编辑器层级的基数，可以用来改变字体等 //如果自定义，最好给p标签如下的行高，要不输入中文时，会有跳动感

`iframeCssUrl {Path String} [默认值：URL + '/themes/iframe.css']` //给编辑器内部引入一个css文件

`indentValue {String} [默认值：'2em']` //首行缩进距离，默认是2em

`initialFrameWidth {Number} [默认值：1000]` //初始化编辑器宽度，默认1000

`initialFrameHeight {Number} [默认值：320]` //初始化编辑器高度，默认320

`readonly {Boolean} [默认值：false]` //编辑器初始化结束后，编辑区域是否是只读的，默认是false

`autoClearEmptyNode {Boolean} [默认值：true]` //getContent时，是否删除空的inlineElement节点（包括嵌套的情况）

`enableAutoSave {Boolean} [默认值：true]` //启用自动保存

`saveInterval {Number} [默认值：500]` //自动保存间隔时间，单位ms

`imageScaleEnabled {Boolean} [默认值：true]` //启用图片拉伸缩放

`fullscreen {Boolean} [默认值：false]` //是否开启初始化时即全屏，默认关闭

`imagePopup {Boolean} [默认值：true]` //图片操作的浮层开关，默认打开

`autoSyncData {Boolean} [默认值：true]` //自动同步编辑器要提交的数据

`emotionLocalization {Boolean} [默认值：false]` //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹

`retainOnlyLabelPasted {Boolean} [默认值：false]` //粘贴只保留标签，去除标签所有属性

`pasteplain {Boolean} [默认值：false]` //是否默认为纯文本粘贴。false为不使用纯文本粘贴，true为使用纯文本粘贴

`filterTxtRules {Object}` //纯文本粘贴模式下的过滤规则

```js
//默认值：
function() {
    function transP(node) {
        node.tagName = 'p';
        node.setStyle();
    }
    return {
        //直接删除及其字节点内容
        '-': 'script style object iframe embed input select',
        'p': {
            $: {}
        },
        'br': {
            $: {}
        },
        'div': {
            '$': {}
        },
        'li': {
            '$': {}
        },
        'caption': transP,
        'th': transP,
        'tr': transP,
        'h1': transP,
        'h2': transP,
        'h3': transP,
        'h4': transP,
        'h5': transP,
        'h6': transP,
        'td': function(node) {
            //没有内容的td直接删掉
            var txt = !! node.innerText();
            if (txt) {
                node.parentNode.insertAfter(UE.uNode.createText('    '), node);
            }
            node.parentNode.removeChild(node, node.innerText())
        }
    }
}()
allHtmlEnabled [默认值：false] //提交到后台的数据是否包含整个html字符串
```

`insertorderedlist` //有序列表的下拉配置，值留空时支持多语言自动识别，若配置值，则以此值为准

```js
//默认值：
{
//自定的样式
'num': '1,2,3...',
'num1': '1),2),3)...',
'num2': '(1),(2),(3)...',
'cn': '一,二,三....',
'cn1': '一),二),三)....',
'cn2': '(一),(二),(三)....',
//系统自带
'decimal': '' , '1,2,3...'
'lower-alpha': '' , // 'a,b,c...'
'lower-roman': '' , //'i,ii,iii...'
'upper-alpha': '' , //'A,B,C'
'upper-roman': '' //'I,II,III...'
}
```

`insertunorderedlist` //无序列表的下拉配置，值留空时支持多语言自动识别，若配置值，则以此值为准

```js
{ //自定的样式
    'dash': '— 破折号', //-破折号
    'dot': ' 。 小圆圈', //系统自带
    'circle': '', // '○ 小圆圈'
    'disc': '', // '● 小圆点'
    'square': '' //'■ 小方块'
}]
```

`listDefaultPaddingLeft [默认值：'30']` //默认的左边缩进的基数倍

`listiconpath [默认值：'http://bs.baidu.com/listicon/']`//自定义标号的路径

`maxListLevel [默认值：3]` //限制可以tab的级数， 设置-1为不限制

`autoTransWordToList [默认值：false]` //禁止word中粘贴进来的列表自动变成列表标签

`fontfamily` //字体设置 label留空支持多语言自动切换，若配置，则以配置值为准

```js
//默认值：
[{
    label: '',
    name: 'songti',
    val: '宋体,SimSun'
}, {
    label: '',
    name: 'kaiti',
    val: '楷体,楷体_GB2312, SimKai'
}, {
    label: '',
    name: 'yahei',
    val: '微软雅黑,Microsoft YaHei'
}, {
    label: '',
    name: 'heiti',
    val: '黑体, SimHei'
}, {
    label: '',
    name: 'lishu',
    val: '隶书, SimLi'
}, {
    label: '',
    name: 'andaleMono',
    val: 'andale mono'
}, {
    label: '',
    name: 'arial',
    val: 'arial, helvetica,sans-serif'
}, {
    label: '',
    name: 'arialBlack',
    val: 'arial black,avant garde'
}, {
    label: '',
    name: 'comicSansMs',
    val: 'comic sans ms'
}, {
    label: '',
    name: 'impact',
    val: 'impact,chicago'
}, {
    label: '',
    name: 'timesNewRoman',
    val: 'times new roman'
}]
```

`fontsize {Array}` //字号

```js
//默认值：
[10, 11, 12, 14, 16, 18, 20, 24, 36]
```

`paragraph {Object} `//段落格式 值留空时支持多语言自动识别，若配置，则以配置值为准

```js
//默认值：
{
    'p': '',
    'h1': '',
    'h2': '',
    'h3': '',
    'h4': '',
    'h5': '',
    'h6': ''
}
```

`rowspacingtop {Array} `//段间距 值和显示的名字相同

```js
//默认值：
['5', '10', '15', '20', '25']
```

`rowspacingbottom` //段间距 值和显示的名字相同

```js
//默认值：
['5', '10', '15', '20', '25']
```

`lineheight [默认值：['1', '1.5','1.75','2', '3', '4', '5'] ]` //行内间距 值和显示的名字相同

`customstyle [Array]` //自定义样式，不支持国际化，此处配置值即可最后显示值block的元素是依据设置段落的逻辑设置的，inline的元素依据BIU的逻辑设置，尽量使用一些常用的标签

```js
//默认值：
[{
        tag: 'h1', //tag 使用的标签名字
        name: 'tc', //
        label: '', //label 显示的名字也是用来标识不同类型的标识符，注意这个值每个要不同
        style: 'border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;' //style 添加的样式
    }, //每一个对象就是一个自定义的样式
    {
        tag: 'h1',
        name: 'tl',
        label: '',
        style: 'border-bottom:#ccc 2px solid;padding:0 4px 0 0;margin:0 0 10px 0;'
    }, {
        tag: 'span',
        name: 'im',
        label: '',
        style: 'font-style:italic;font-weight:bold'
    }, {
        tag: 'span',
        name: 'hi',
        label: '',
        style: 'font-style:italic;font-weight:bold;color:rgb(51, 153, 204)'
    }
]
```

`enableContextMenu {Boolean} [默认值：true] `//打开右键菜单功能

`contextMenu {Object}` //右键菜单的内容，可以参考plugins/contextmenu.js里边的默认菜单的例子，label留空支持国际化，否则以此配置为准

```js
//默认值：
[{
    label: '', //显示的名称
    cmdName: 'selectall', //执行的command命令，当点击这个右键菜单时
    exec: function() { //exec可选，有了exec就会在点击时执行这个function，优先级高于cmdName
        //this是当前编辑器的实例
        //this.ui._dialogs['inserttableDialog'].open();
    }
}]
shortcutMenu {Array} //快捷菜单
```

```js
//默认值
["fontfamily", "fontsize", "bold", "italic", "underline", "forecolor", "backcolor", "insertorderedlist", "insertunorderedlist"]
```

`elementPathEnabled {Boolean} [默认值：true]` //是否启用元素路径，默认是显示

`wordCount {Boolean} [默认值：true]` //是否开启字数统计

`maximumWords {Number} [默认值：10000]` //允许的最大字符数

`wordCountMsg {String} [默认值：]` //当前已输入 {#count} 个字符，您还可以输入{#leave} 个字符，字数统计提示，{#count}代表当前字数，{#leave}代表还可以输入多少字符数，留空支持多语言自动切换，否则按此配置显示

```js
\\默认值：
'当前已输入{#count}个字符, 您还可以输入{#leave}个字符。 '
wordOverFlowMsg {String} [默认值：] //超出字数限制提示 留空支持多语言自动切换，否则按此配置显示

\\默认值：
'<span style="color:red;">你输入的字符个数已经超出最大允许值，服务器可能会拒绝保存！</span>'
```

`tabSize {Number} [默认值：4]` //点击tab键时移动的距离，tabSize倍数，tabNode什么字符做为单位

`tabNode {String} [默认值：'&nbsp;']`

`removeFormatTags` //清除格式时可以删除的标签和属性

```js
//默认值：
'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var'
removeFormatAttributes [默认值：'class,style,lang,width,height,align,hspace,valign'
```

`maxUndoCount {Number} [默认值：20]` //undo操作，可以最多回退的次数，默认20

`maxInputCount {Number} [默认值：1]` //undo操作，当输入的字符数超过该值时，保存一次现场

`autoHeightEnabled {Boolean} [默认值：true]` //是否自动长高，默认true

`scaleEnabled {Boolean} [默认值：false]` //是否可以拉伸长高，默认true(当开启时，自动长高失效)

`minFrameWidth {Number} [默认值：800]` //编辑器拖动时最小宽度，默认800

`minFrameHeight {Number} [默认值：220]` //编辑器拖动时最小高度，默认220

`autoFloatEnabled [默认值：true]` //是否保持toolbar的位置不动，默认true

`topOffset [默认值：30]` //浮动时工具栏距离浏览器顶部的高度，用于某些具有固定头部的页面

`toolbarTopOffset [默认值：400]` //编辑器底部距离工具栏高度(如果参数大于等于编辑器高度，则设置无效)

`pageBreakTag [默认值：'ueditorpagebreaktag']` //分页标识符，默认是ueditorpagebreaktag

`autotypeset {Object}` //自动排版参数 默认值：

```js
{
    mergeEmptyline: true, //合并空行
    removeClass: true, //去掉冗余的class
    removeEmptyline: false, //去掉空行
    textAlign: "left", //段落的排版方式，可以是 left，right，center，justify 去掉这个属性表示不执行排版
    imageBlockLine: 'center', //图片的浮动方式，独占一行剧中，左右浮动，默认: center，left，right，none 去掉这个属性表示不执行排版
    pasteFilter: false, //根据规则过滤没事粘贴进来的内容
    clearFontSize: false, //去掉所有的内嵌字号，使用编辑器默认的字号
    clearFontFamily: false, //去掉所有的内嵌字体，使用编辑器默认的字体
    removeEmptyNode: false, // 去掉空节点
    //可以去掉的标签
    removeTagNames: {标签名字: 1
    },
    indent: false, // 行首缩进
    indentValue: '2em', //行首缩进的大小
    bdc2sb: false,
    tobdc: false
}
```

`tableDragable {Boolean} [默认值：true]` //表格是否可以拖拽

`disabledTableInTable {Boolean} [默认值：true]` //禁止表格嵌套

`sourceEditor {String} [默认值："codemirror"]` //源码的查看方式，codemirror是代码高亮，textarea是文本框，默认是codemirror，注意默认codemirror只能在ie8+和非ie中使用

`codeMirrorJsUrl {Path String} [默认值：URL + "third-party/codemirror/codemirror.js"]` //如果sourceEditor是codemirror需要配置这项，codeMirror js加载的路径

`codeMirrorCssUrl {Path String} [默认值：URL + "third-party/codemirror/codemirror.css"]` //如果sourceEditor是codemirror需要配置这项，codeMirror css加载的路径

`sourceEditorFirst {String} [默认值：false]` //编辑器初始化完成后是否进入源码模式，默认为否。

`iframeUrlMap {Object} `//dialog内容的路径 ～会被替换成URL，垓属性一旦打开，将覆盖所有的dialog的默认路径

```js
//默认值：
{
    'anchor': '~/dialogs/anchor/anchor.html',
}
```

`webAppKey {String} //webAppKey `百度应用的APIkey，每个站长必须首先去百度官网注册一个key后方能正常使用app功能，注册介绍，`http://app.baidu.com/static/cms/getapikey.html`

`allowDivTransToP {Boolean} `默认会将外部进入的html数据中的Div标签转换成P标签，外部进入的数据包括粘贴和调用setContent接口进入编辑器的数据。如果设置成false将不在做这个转换。

目录说明

部署包目录说明

- dialogs: 弹出对话框对应的资源和JS文件
- lang: 编辑器国际化显示的文件
- php或jsp或asp或net: 涉及到服务器端操作的后台文件
- themes: 样式图片和样式文件
- third-party: 第三方插件(包括代码高亮，源码编辑等组件）
- ueditor.all.js: 开发版代码合并的结果,目录下所有文件的打包文件
- ueditor.all.min.js: ueditor.all.js文件的压缩版，建议在正式部署时采用
- ueditor.config.js: 编辑器的配置文件，建议和编辑器实例化页面置于同一目录
- ueditor.parse.js: 编辑的内容显示页面引用，会自动加载表格、列表、代码高亮等样式,具体看内容展示文档
- ueditor.parse.min.js: ueditor.parse.js文件的压缩版，建议在内容展示页正式部署时采用

源码包目录说明

源码包解压后的文件目录结构如下所示

源码包部分目录和文件与部署包名称一致,用途也会是一致,具体说明如下:

- `_doc`: 部分markdown格式的文档
- `_example`: ueditor的使用例子
- `_parse`: ueditor.parse.js的源码,parse的用途具体看内容展示文档
- `_src`: ueditor.all.js的源码,打包方法看grunt打包文档
    - `_src\core`: ueditor核心代码
    - _`src\plugins`: 插件文件
    - `_src\ui`: ui相关文件
    - `_src\adapter`: 桥接层文件,对接ueditor核心和ui代码
- `php`: php后台文件的目录
    - `php\config.json`: 后端配置文件,所有前后端相关配置项,都放在这里
    - `php\controller.php`: 接收所有请求的接口文件,通过它判断action参数,分发具体任务给其他php文件
    - `php\action_crawler`: 撞去远程文件的代码,转存文件使用
    - `php\action_upload`: 上传图片、附件、视频的处理代码
    - `php\action_list`: 列出在线的图片或者是附件
    - `php\Upload.class.php`: 上传文件使用的类
- `jsp`: jsp后台文件的目录
    - `jsp\config.json`: 后端配置文件,所有前后端相关配置项,都放在这里
    - `jsp\controoler.jsp`: 接收所有请求的接口文件
    - `jsp\lib`: 所有用到的jar包,其中的ueditor-*.jar包是ueditor所有后台相关处理逻辑的工具
    - `jsp\src`: lib里面的uedior-*jar文件的java源码
- `asp`: asp后台文件的目录
- `net`: .net后台文件的目录
    - `App_Code`: 上的文件是应用程序的源码。
    - `Bin`: 里面的是应用程序的依赖库，当前依赖 Newtonsoft 的 Json 库。Bin 目录和 App_Code 目录受应用程序保护，不用担心被用户访问到。
    - `config.json`: 是 UEditor 后端的配置文件，上一节已经介绍了比较重要的配置项。
    - `controller.ashx`: 是 UEditor 请求的入口，它把不同的 action 分发到不同的 Handler 来处理。
    - `net.sln`: 是项目的解决方案文件，安装 Visual Studio 2013 或以上的机器可以打开进行项目的改造。
    - `README.md`: 是net后台使用文件。
    - `Web.config`: 是应用程序的配置文件
- `dialogs`: 同部署包说明
- `lang`: 同部署包说明
- `themes`: 同部署包说明
- `third-party`: 同部署包说明
- `changelog.md`: 各版本的ueditor更新记录
- `Gruntfile.js`: grunt执行的任务文件,用来把源码包打包成部署版本,打包方法看grunt打包文档
- `LICENSE`: 开源协议说明证书,ueditor使用MIT开源协议
- `ueditor.config.js`: 前端配置文件
- `ueditor.parse.js`: 还没合并时使用的parse文件,会自动加载_parse里面的文件

提交表单

提交表单设置

按照部署编辑器的教程，完成编辑器加载

把容器放到form表单里面，设置好要提交的路径，如下面代码中的`<form>`标签

```js
<!DOCTYPE HTML>
<html lang="en-US">

<head>
    <meta charset="UTF-8">
    <title>ueditor demo</title>
</head>

<body>
    <form action="server.php" method="post">
        <!-- 加载编辑器的容器 -->
        <script id="container" name="content" type="text/plain">
            这里写你的初始化内容
        </script>
    </form>
    <!-- 配置文件 -->
    <script type="text/javascript" src="ueditor.config.js"></script>
    <!-- 编辑器源码文件 -->
    <script type="text/javascript" src="ueditor.all.js"></script>
    <!-- 实例化编辑器 -->
    <script type="text/javascript">
        var editor = UE.getEditor('container');
    </script>
</body>

</html>
```

编辑内容展示

最终的目的是为了呈现用户编辑的内容。也就是内容的展示。原来我们对这块是不考虑的，只关注在编辑端。但随着编辑器产出内容的增加和复杂化，比如图表展示，代码高亮，自定义的列表标号等等，如果都在最终产出的编辑数据中处理，那势必会导致产出数据带有冗余内容，而且也很大程度上硬编码了展示时定制效果。基于这些问题，uparse产生了。

uparse的定义

基于js的实现机制，在展示页面中，对 UEditor 的产出的编辑数据，进行解析和转换，以呈现不同的效果。为后边的多端（移动端和pc端）展示打下基础。

uparse的作用

它会根据内容展示内容，动态的在你的展示页中加入css代码,比如你的编辑数据中有表格，那就会加入一些表格的css样式,如果有图表数据，会调用相关的js插件，解析数据成为图表等。

uparse的使用

在下载包中找到`ueditor.parse.js`或者`uparse.js`(这两个没有区别，就是版本不同，功能是一致的).完整版本的包中，`ueditor.parse.js`是没有打包编译的，需要进行编译，编译相关的请看编译文档。

从1.3.5开始，`uparse`做了重构，将原来的一个文件拆解成了多个插件形式的`js`,为了适应越来越多的功能需求。

现在的`parse`目录`parse.js`是核心文件，定了插件的管理机制和一些快捷方法，感兴趣的同学可以看一下。其他文件代表的一种数据解析功能，比如`insertcode.js`是针对的数据里边的代码进行展示时的解析等等。看到这里，大家应该能想到，`uparse`是需要依赖`ueditor`项目中的third-party中相关的第三方库的。
根据你的路径加载`uparse.js`

```js
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <script src="../ueditor.parse.js"></script>
    <title></title>
</head>将uparse.js记载到页面，不同目录结构，路径不同.
```

如何使用补丁文件

什么是补丁文件

虽然每次 UEditor 发布版本都会修复很多已知的bug，但每次的版本升级都会间隔一段时间，而且由于 UEditor 每次发布的版本众多，所以升级发布都会经过很多测试环节，导致一些已知的较严重bug，不能及时修复并更新线上版本。之前有过的chrome升级，导致无法输入文字，虽然后来我们做了修复，但时间上却脱了很久。所以我们提出了补丁策略。补丁策略是在现有的版本基础之上，针对某个bug进行修复，开发者可以及时的部署补丁文件修复bug,ueditor也会在下次的版本更新时包含上一次到这次之间所有发布的 补丁内容。

如何使用补丁文件

一般的补丁文件都会是一个js的文件，它的命令规则是 ueditor-patch-issue号.js，issue 号是 github 的 issue 编号，可以通过这里,进行查询修复的那个问题。

使用方式

```js
<script type="text/javascript" charset="utf-8" src="ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="ueditor.all.min.js"></script>
<!--一定要在这个下边加载相应的patch文件-->
<script type="text/javascript" charset="utf-8" src="ueditor-patch-149.js"></script>
```




