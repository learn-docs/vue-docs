# 打造属于自己的项目脚手架工具

`vue-cli`

`create-react-app`

`gulp`

`webpack`

`yeoman`

`express-generator`

## 为什么需要脚手架

减少重复性的工作，不再需要复制其他项目再删除无关代码，或者从零创建一个项目和文件。

根据交互动态生成项目结构和配置文件等。

多人协作更为方便，不需要把文件传来传去。

```js
npm install --global vue-cli

vue init webpack vue-demo
```

## 知识点

项目模板放在`github`上

用户通过命令交互的方式下载不同的模板

经过模板引擎渲染定制项目模板

模板变动，只需要更新模板即可，不需要用户更新脚手架

`NodeJS` - 基于`Node.js` 开发命令行工具

`es6` 使用最新版本语言开发

`npm` 发包，`npm`包的发布以及更新流程

`commander.js` 可以自动的解析命令和参数，用于处理用户输入的命令

`download-git-repo`

下载并提交`git` 仓库，用于下载项目模板

## 初始化-把脚本映射为命令

```js
// console.log('脚手架工具')

mkdir demo
cd demo
npm init -y
```

初始化`npm init -y` - `package.json`

```js
{
  "name": "jeskson",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bin": {
    "abc": "index.js"
  }
}
```

执行`npm link`链接命令到全局。执行`bin`中配置的命令测试。

现在可以使用`abc`

```js
... vue

Options:
 -V, --version output the version number
 -h, --help output usage information

Commands:

init generate a new project from a template
list list availabe official templates
build prototype a new project
create (for v3 warning only)
help [cmd] display help for [cmd]
```

### 命令行工具参数设计

```js
itcast -h | --help 查看使用帮助
itcast -V | --version 查看工具的版本号
itcast list 列出所有可用模板
itcast init <template-name> <project-name> 基于指定的模板进行项目初始化
```

### 使用'commander`模块处理命令行

安装`npm install commander`

```js
// index.js
console.log('itcast-cli 脚手架工具')
// 1. 获取用户输入命令
// 原生获取命令行参数的方式
console.log(process.argv)
// 2. 根据不同的执行 执行不同的功能操作
```

```js
const { Command } = require('commander');
const program = new Command();

program
  .version('0.0.1')
  .option('-c, --config <path>', 'set config path', './deploy.conf');

program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option('-s, --setup_mode <mode>', 'Which setup mode to use', 'normal')
  .action((env, options) => {
    env = env || 'all';
    console.log('read config from %s', program.opts().config);
    console.log('setup for %s env(s) with %s mode', env, options.setup_mode);
  });

program
  .command('exec <script>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option('-e, --exec_mode <mode>', 'Which exec mode to use', 'fast')
  .action((script, options) => {
    console.log('read config from %s', program.opts().config);
    console.log('exec "%s" using %s mode and config %s', script, options.exec_mode, program.opts().config);
  }).addHelpText('after', `
Examples:
  $ deploy exec sequential
  $ deploy exec async`
  );

// ？？？
program
  .command('*')
  .action(function(env){
    console.log('deploying "%s"', env);
  });

program.parse(process.argv);
```

## 设计命令行参数

```js
// index.js
program
  .version('0.1.0') // -v 或者 --version 的时候输出版本

const templates = {
  'da-a': {
    url: '仓库地址',
    description: 'a模板'
  }
  'da-b': {
    url: '仓库地址',
    description: 'b模板'
  }
}

// itcast init a a-name
// 基于a项目进行初始化
// itcast init b b-name
// 基于b项目进行初始化
program
  .command('init <template> <project>')
  .description('初始化项目模板')
  // .option('-e, --exec_mode [mode]', 'Which exec mode to use', 'fast')
  .action(function(templateName, projectName){
    console.log(templateName, projectName)
  })

program
  .command('list')
  .description('查看所有可用模板')
  .action(()=>{
    for (let key in templates) {
      console.log(`
      ${key} ${templates[key].description}
      `)
    }
//     console.log('
//  a a模板
//  b b模板   
// ')
  })

program.parse(process.argv);
```

```js
// itcast --help

Usage: index [options] [command]
Options:
 -V, --version output the version number
 -h, --help output usage information

Commands:
  init <template> <project> 初始化项目模板
  list 查看所有可用模板
```

## 准备模板

创建`github`仓库,链接模板

## 根据`init`指定的模板名和项目名下载生成到本地

```js
// index.js
program
  .version('0.1.0') // -v 或者 --version 的时候输出版本

const templates = {
  'da-a': {
    url: '仓库地址',
    downloadUrl: 'http://github.com:用户名/仓库名#master',
    description: 'a模板'
  }
  'da-b': {
    url: '仓库地址',
    description: 'b模板'
  }
}

// itcast init a a-name
// 基于a项目进行初始化
// itcast init b b-name
// 基于b项目进行初始化
program
  .command('init <template> <project>')
  .description('初始化项目模板')
  // .option('-e, --exec_mode [mode]', 'Which exec mode to use', 'fast')
  .action(function(templateName, projectName){
    // console.log(templateName, projectName)
    // 根据模板名下载对应的模板到本地
    console.log(templates[templateName])
    // itcast init da-a abc 
    const { downloadUrl } = templates[templateName]
    download(downloadUrl, projectName, { clone: true }, (err) => {
      if (err) {
        console.log('下载失败')
      } else {
        console.log('下载成功')
      }
    })
  })

program
  .command('list')
  .description('查看所有可用模板')
  .action(()=>{
    for (let key in templates) {
      console.log(`
      ${key} ${templates[key].description}
      `)
    }
//     console.log('
//  a a模板
//  b b模板   
// ')
  })

program.parse(process.argv);
```

下载模板

安装：

```js
npm install download-git-repo
```

修改代码：

```js
const program = require('commander')
const download = require('download-git-repo')

program
  .version('1.0.0')

program
  .command('init <name')
  .description('generate a new project from a template')
  .action((name)=>{
    download('https://github', name, {clone:true}, (err) =>{
      console.log(err ? 'Error':'Success')
    })
  })

program.parse(process.argv)
```

## 使用`inquirer`和`handlebars`采集处理用户数据

命令行交互:

```js
// 某模板仓库 package.json da-a
{
  "name": "{{ name }}",
  "version": "1.0.0",
  "description": "{{ description }}",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "{{ author }}",
  "license": "ISC",
  "bin": {
    "itcast": "index.js"
  },
  "dependencies": {
    "commander": "^2.17.1",
    "download-git-repo": "^1.1.0"
  }
}
```

`npm i handlebars` 模板引擎

```js
// index.js
const program = require('commander')
const download = require('download-git-repo')
const handlebars = require('handlebars')

program
  .command('init <template> <project>')
  .description('初始化项目模板')
  // .option('-e, --exec_mode [mode]', 'Which exec mode to use', 'fast')
  .action(function(templateName, projectName){
    // console.log(templateName, projectName)
    // 根据模板名下载对应的模板到本地
    console.log(templates[templateName])
    // itcast init da-a abc 
    const { downloadUrl } = templates[templateName]
    download(downloadUrl, projectName, { clone: true }, (err) => {
      if (err) {
        return console.log('下载失败')
      }

      // 把项目下的 package.json 文件读取出来
      // 使用向导的方式采集用户输入的值 
      // 使用模板引擎把用户输入的数据解析到 package.json 文件中
      // 解析完毕后，把解析之后的结果重新写入 package.json 文件中
    })
  })

...
```

### 命令行交互

安装：`npm install inquirer`

```js
var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

```

命令行交互功能可以在用户执行 `init`命令后，向用户提出问题，接收用户的输入并作出相应的处理。这里使用 `inquirer.js` 来实现。

```js
const inquirer = require('inquirer')

inquirer.prompt([{
  type: 'input',
  name: 'author',
  message: '请输入作者名称'
}]).then((answers) => {
  console.log(answers.author)
})
```

- 问题就放在 `prompt()` 中
- 问题的类型为 `input` 就是输入类型
- `name`就是作为答案对象中的 `key`
- `message` 就是问题了
- 用户输入的答案就在 `answers` 中

```js
// index.js
const program = require('commander')
const download = require('download-git-repo')
const handlebars = require('handlebars')
const inquirer = require('inquirer')
const fs = require('fs')

program
  .command('init <template> <project>')
  .description('初始化项目模板')
  // .option('-e, --exec_mode [mode]', 'Which exec mode to use', 'fast')
  .action(function(templateName, projectName){
    // console.log(templateName, projectName)
    // 根据模板名下载对应的模板到本地
    console.log(templates[templateName])
    // itcast init da-a abc 
    const { downloadUrl } = templates[templateName]
    download(downloadUrl, projectName, { clone: true }, (err) => {
      if (err) {
        return console.log('下载失败')
      }

      // 把项目下的 package.json 文件读取出来
      // 使用向导的方式采集用户输入的值 
      // 使用模板引擎把用户输入的数据解析到 package.json 文件中
      // 解析完毕后，把解析之后的结果重新写入 package.json 文件中
      inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: '请输入项目名称'
      },{
        type: 'input',
        name: 'description',
        message: '请输入项目简介'
      },{
        type: 'input',
        name: 'author',
        message: '请输入作者名称'
      }]).then((answers) => {
        console.log(answers.author)

        // 把采集到的用户输入的数据解析替换到package.json文件中
        const packagePath = `${projectName}/package.json`
        const packageContent = fs.readFileSync(packagePath, 'utf8') 
        // handlebars进行解析
        const packageResult = handlebars.compile(packageContent)(answers)
        fs.writeFileSync(packagePath, packageResult)
        console.log(packageResult)
      })

    })
  })

...
```

## 使用ora增加下载中loading效果

### 视觉美化

在用户输入答案之后，开始下载模板，这时候使用`ora`来提示用户正在下载中。

安装：

```js
npm install ora
```

```js
const ora = require('ora');
// 开始下载
const spinner = ora('正在下载模板...');
spinner.start();

// 下载失败调用
spinner.fail();
// 下载成功调用
spinner.succeed();
```

然后通过 `chalk` 来打印信息加上样式，比如成功信息为绿色，失败信息为红色，这样子会让用户更加容易分辨，同时也让终端的显示更加的好看。






