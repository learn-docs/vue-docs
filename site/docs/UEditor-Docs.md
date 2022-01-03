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

二次开发方式

无需对 UEditor 代码做任何修改，只需在UEditor之外通过UEditor提供的二次开发接口开发定制功能.这种开发方式不仅避免了修改UEditor源码，方便日后UEditor的升级，而且通过接口，可以将开发的定制功能维护到一个文件中或者一个目录中，方便日后对其维护。

部署定制功能

对于 UEditor 的二次开发，一般多为添加按钮，下拉筐或者是添加一个dialog。基于这几种常规的方式，我在_examples目录下分别书写了3个类型的定制demo。

- addCustomizeButton.js 添加一个按钮
- addCustomizeCombox.js 添加一个下拉框
- addCustomizeDialog.js 添加一个弹出层

除了添加弹出层需要一个而外的html页面外，对于需要添加和修改的功能代码全部都维护到一个js文件中了。

使用文件的方式:

```js
<script type="text/javascript" charset="utf-8" src="../ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="editor_api.js">
</script>
<script type="text/javascript" charset="utf-8" src="../lang/zh-cn/zh-cn.js"></script>
<!--添加按钮-->
<script type="text/javascript" charset="utf-8" src="addCustomizeButton.js"></script>
```

新添加的按钮就完成了。实例化编辑器时，无需再而外添加任何代码。

开发细节

前面讲了如何部署你的功能，这个小节来和大家讲一下，UEditor提供那些接口，让大家可以在编辑器之外扩展你的功能。

```js
UE.registerUI('uiname', function(editor, uiname) {
    //do something
}, [index, [editorId]]);
```

考虑到大家的功能基本上都会扩展一个UI和这个UI做的事情，所以UEditor提供了registerUI这个接口，可以让开发者动态的注入扩展的内容。

1. uiname,是你为新添加的UI起的名字，这里可以是1个或者多个，“uiname”后者是“uiname1 uiname2 uiname3”
2. function，是实际你要做的事情，这里提供两个参数，editor是编辑器实例，如果你有多个编辑器实例，那每个编辑器实例化后，都会调用这个function,并且把editor传进来,uiname,你为ui起的名字，如果前边你添加的是多个的化，这里function会被调用多次，并且将每一个ui名字传递进来.如果函数返回了一个UI 实例，那这个UI实例就会被默认加到工具栏上。当然也可以不返回任何UI。比如希望监控selectionchange事件，在某些场景下弹出浮层，这时就不需要返回任何UI.
3. index,是你想放到toolbar的那个位置，默认是放到最后
4. editorId,当你的页面上有多个编辑器实例时，你想将这个ui扩展到那个编辑器实例上，这里的editorId是给你编辑器初始化时，传入的id,默认是每个实例都会加入你的扩展

添加按钮

添加一个按钮

```js
UE.registerUI('button', function(editor, uiName) {
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            alert('execCommand:' + uiName)
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: uiName,
        //添加额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position: -500px 0;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(uiName);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
```

添加多个

```js
UE.registerUI('bold italic redo undo underline strikethrough', function(editor, uiName) {
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            alert('execCommand:' + uiName)
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: uiName,
        //添加额外样式,指定icon图标,这里默认使用一个重复的icon
        cssRules: 'background-position: -500px 0;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(uiName);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
```

在完整版本的下载包里，我写了3个例子，添加一个按钮，下拉筐，弹出一个浮层，大家可以参考

总结

之前UEditor对于第三方的开发确实支持的不够灵活，导致为了开发还要污染UEditor本身，这为后学升级添加了麻烦。当然现在这个设计可能还有考虑不到的地方，大家可以直接发issue给我们，我们会进行及时的补丁，并在后续的版本中更新。

使用grunt打包源代码

随着 nodejs 和 grunt 的火爆，UEditor 采用了 grunt 来作为线下的合并打包工具，支持编码和后台语言指定。

支持版本

支持 UEditor 1.3.0+ 的版本

使用方法

线上下载ueditor

下载地址：ueditor，要下载"完整版 + 源码"

安装nodejs

下载 nodejs 并安装到本地

安装成功后，打开控制台，在控制台下输入

    node -v

如果控制台输出nodejs的版本。那恭喜你，nodejs安装好了，可以使用ctrl+c退出node模式.

安装打包需要的grunt插件

以终端方式（windows用户用cmd）进入ueditor源码根目录，执行

    npm install

这个命令会根据package.json文件，安装打包需要的grunt和grunt插件

安装结束后，会在ueditor目录下出现一个node_modules文件夹

执行打包命令

以终端方式（windows用户用cmd）进入ueditor源码根目录，执行

 `grunt`

这个命令会根据Gruntfile.js执行打包打包的任务，运行过程 需要java环境 支持

命令完成后，ueditor目录下会出现dist/目录，里面有你要的打包好的ueditor文件夹，默认是utf8-php文件夹

打包其他版本

执行打包grunt命令时，可以传入编码和后台语言的参数

支持两种编码指定：--encode参数

- utf8 (默认编码)
- gbk

提供四种后台语言支持：--server参数

```js
php (默认语言)
jsp
net (代表.net后台)
asp
```

例如:想要打包成编码是gbk，后台语言是asp版本，可执行命令:

    grunt --encode=gbk --server=asp

后端请求规范

与后台通信的功能列表

ueditor和后台通信的功能较多，这里列一下编辑器和后台通信的功能：

```js
上传图片
拖放图片上传、粘贴板图片上传
word文档图片转存
截图工具上传
上传涂鸦
上传视频
上传附件
在线图片管理
粘贴转存远程图片
统一请求格式说明
```

为了规范化前后端通信的请求，这里统一规范前端请求格式和后端数据返回格式

- 前端请求通过唯一的后台文件 controller.php处理前端的请求
- controller.php通过GET上的action参数，判断是什么类型的请求
- 省去不必要的请求，去除涂鸦添加背景的请求，用前端FileReader读取本地图片代替
- 请求返回数据的格式，常规返回json字符串，数据包含state属性（成功时返回'SUCCESS'，错误时返回错误信息）。
- 请求支持jsonp请求格式，当请求有通过GET方式传callback的参数时，返回json数据前后加上括号，再在前面加上callback的值，格式类似这样：

```js
 cb({"key": "value"})
```

请求格式规范

以下是各类型的请求说明

1. config

请求参数:

```js
GET {"action": "config"}
POST "upfile": File Data
```

返回格式:

```js
// 需要支持callback参数,返回jsonp格式
{
    "imageUrl": "http://localhost/ueditor/php/controller.php?action=uploadimage",
    "imagePath": "/ueditor/php/",
    "imageFieldName": "upfile",
    "imageMaxSize": 2048,
    "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"]
}
```

2. uploadimage

请求参数:

```js
GET {"action": "uploadimage"}
POST "upfile": File Data
```

返回格式:

```js
{
    "state": "SUCCESS",
    "url": "upload/demo.jpg",
    "title": "demo.jpg",
    "original": "demo.jpg"
}
```

3. uploadscrawl

请求参数:

```js
GET {"action": "uploadscrawl"}
POST "content": Base64 Data
```

返回格式:

```js
{
    "state": "SUCCESS",
    "url": "upload/demo.jpg",
    "title": "demo.jpg",
    "original": "demo.jpg"
}
```

4. uploadvideo

请求参数:

```js
GET {"action": "uploadvideo"}
POST "upfile": File Data
```

返回格式:

```js
{
    "state": "SUCCESS",
    "url": "upload/demo.mp4",
    "title": "demo.mp4",
    "original": "demo.mp4"
}
```

5. uploadfile

请求参数:

```js
GET {"action": "uploadfile"}
POST "upfile": File Data
```

返回格式:

```js
{
    "state": "SUCCESS",
    "url": "upload/demo.zip",
    "title": "demo.zip",
    "original": "demo.zip"
}
```

6. listimage

请求参数:

```js
GET {"action": "listimage", "start": 0, "size": 20}
```

返回格式:

```js
// 需要支持callback参数,返回jsonp格式
{
    "state": "SUCCESS",
    "list": [{
        "url": "upload/1.jpg"
    }, {
        "url": "upload/2.jpg"
    }, ],
    "start": 20,
    "total": 100
}
```

7. catchimage

请求参数:

```js
GET {
    "action": "catchimage",
     "source": [
     	"http://a.com/1.jpg",
        "http://a.com/2.jpg"
    ]
}
```

返回格式:

```js
// 需要支持callback参数,返回jsonp格式
// list项的state属性和最外面的state格式一致
{
    "state": "SUCCESS",
    "list": [{
        "url": "upload/1.jpg",
        "source": "http://b.com/2.jpg",
        "state": "SUCCESS"
    }, {
        "url": "upload/2.jpg",
        "source": "http://b.com/2.jpg",
        "state": "SUCCESS"
    }, ]
}
```

自定义请求参数

很多情境下，编辑器与后台通信需要有登录状态，很多时候后台需要额外的参数。 UEditor 自1.4.0版本提供设置额外参数的命令serverparam命令，可动态设置自定义参数表。 在向后台发出请求时，会把参数表以GET方式加到请求里。

另外，编辑器上传使用webuploader插件，在低版本的ie下，浏览器使用Flash形式的上传。 flash发送的请求不带有cookie，这里也需要额外的参数，让后台判断是否登录。

设置自定义参数表

通过serverparam命令设置自定义参数表，有四种调用方式，看下面的例子（下文的ue指编辑器实例）：

```js
/* 1.传入函数,命令里执行该函数得到参数表,添加到已有参数表里 */
ue.ready(function() {
    ue.execCommand('serverparam', function(editor) {
            return {
                'key': 'value'
            };
        }
    };
});
```

```js
/* 2.传入参数表,添加到已有参数表里 */
ue.ready(function() {
    ue.execCommand('serverparam', {
        'key': 'value'
    });
});
```

```js
/* 3.按照键值添加参数 */
ue.ready(function() {
    ue.execCommand('serverparam', 'key', 'value');
});
/* 4.清除参数表 */
ue.ready(function() {
    ue.execCommand('serverparam'
    };
});
```

查询自定义参数表

前端发出请求时，会通过queryCommandValue方法，查询当前自定义参数表，把参数表以GET方式加到请求里：

```js
ue.ready(function() {
    ue.queryCommandValue('serverparam'); //返回参数值键值对的对象
});
```

使用例子

```js
var ue = UE.getEditor('container');
ue.ready(function() {
    ue.execCommand('serverparam', {
        'key1': 'value1',
        'key2': 'value2',
    });
});
```

提交请求的时候会把key1和key2一起以GET的方式发送到后台。后台再通过`$GET["key1"]`和`$GET["key2"]`获取key1和key2的值。

跨域支持说明

前端和后端不在同域的情况下，ueditor很多功能需要跨域设置才能正常执行。

跨域的例子

只要两个路径的 协议、域名、端口，其中一个不相同，两个路径间的请求就是跨域请求，以下都是跨域的例子：

```js
UEditor 的页面在 http://a.com 下，serverUrl指向域名在 http://b.com 域下
UEditor 的页面在 http://a.com 下，serverUrl指向域名在 http://a.b.com 域下
UEditor 的页面在 http://a.com 下，serverUrl指向域名在 http://a.com:8080 域下
UEditor 的页面在 http://a.com 下，serverUrl指向域名在 https://a.com 域下
```

ueditor各种请求的跨域解决方案

ueditor有四类请求方式，Ajax GET请求，Ajax POST请求，flash上传请求，表单上传请求

1. Ajax GET请求

相关请求：

1. UEditor 获取 config 的请求
2. 远程图片转存的请求
3. 列出在线图片或附件请求

这几个请求，不需要额外的跨域设置。在请求发起之前，会判断serverUrl路径是否跨域，如果是跨域，自动转为使用jsonp的请求方式。由于后端有对jsonp请求做支持，它们可以正常完成请求。

另外，UEditor 1.4.2对jsonp做了一些支持：

UE.ajax工具新增了jsonp的请求方式和getJSONP方法，通过UE.ajax.getJSONP发送请求例子如下：

```js
UE.ajax.getJSONP('./php/controller.php', {
        key1: 'value1',
        key2: 'value2'
    }, function(r) {
        console.log(r);
        );

```

utils里新增了判断跨域的方法，可以传入路径判断是否与当前域名行程跨域关系。

```js
//当前页面是http://localhost下,那么
utils.isCrossDomain('./php/controller.php'); //相对路径不跨域，返回false
utils.isCrossDomain('/ueditor/php/controller.php'); //根路径跨域，返回false
utils.isCrossDomain('https://a.com:8080/php/controller.php'); //返回true
```

2. Ajax POST请求

相关请求：

1. 多图上传、上传附件、上传视频在支持html5上传的浏览器下使用时
2. 粘贴板图片上传、拖放图片上传
3. 涂鸦上传

UEditor 的 dialogs 主要使用webuploader做上传请求。默认情况下，使用webuploader时，如果浏览器支持html5上传，会使用html5的形式上传，否则使用flash上传。

跨域情况下，假如不做任何修改，使用html5上传，会有一个提示：跨域提示这个时候需要在后端设置允许跨域的header，php设置方式如下：

```js
header("Access-Control-Allow-Origin: http://a.com"); // 允许a.com发起的跨域请求
//如果需要设置允许所有域名发起的跨域请求，可以使用通配符 *
header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求
```

做了以上的修改之后，有一些请求还是会出错，例如下面这种，某些header属性不支持跨域：跨域header错误解决这个错误，需要在后端设置允许跨域的header属性，php设置方式如下：

```js
header('Access-Control-Allow-Headers: X-Requested-With,X_Requested_With'); //多个值用逗号隔开
```

另外，html5上传请求之前，webuploader 还会发起一个 OPTIONS 方法的请求，还需要注意这个请求需要返回正常的 200 状态码。

3. flash上传请求

相关请求：

1. 多图上传、上传附件、上传视频在不支持html5上传的浏览器下使用时
2. word 图片上传
3. webuploader 在不支持 html5 的浏览器下，通过flash完成上传，假如希望webuploader在支持html5的浏览器下也使用flash上传，可以修改dialogs里面的页面，把引用webuploader的js换成 webuploader.flashonly.js 路径。

解决flash跨域错误，需要在目标域名的根目录下防止crossdomain.xml文件，里面定义允许发起跨域请求的域名。xml例子设置如下：

```js
<?xml version="1.0"?>
<cross-domain-policy>
<allow-access-from domain="www.baidu.com" />
<allow-access-from domain="*.baidu.com" />
<allow-access-from domain="192.168.0.101" />
</cross-domain-policy>
```

同样的 flash 请求有一些情况还是出错，由于是flash发出的请求，于是，不再会在控制台报错，而是直接不发请求 解决这个错误，需要在后端设置允许跨域的header属性，php设置方式如下：

```js
header('Access-Control-Allow-Headers: X-Requested-With,X_Requested_With'); //多个值用逗号隔开
```

4. 表单上传请求

相关请求：单图上传

单图上传暂时不支持跨域设置，为了兼容低版本浏览器，使用了提交表单到iframe提交。通过iframe的onload事件，触发回调函数，这时候再读取iframe里面的内容，得到的服务器返回数据。 跨域情况下，产生了跨域的iframe访问，可以解决方法都需要前后端一起改变。要解决这个问题，小伙伴们发挥想象力吧。