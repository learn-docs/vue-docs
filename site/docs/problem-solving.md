# 问题解答(problem-solving)

1. 完美解决 `fatal: unable to access 'https://github.com/.../.git': Could not resolve host: github.com`

只需要在命令行中执行

```js
git config --global --unset http.proxy

git config --global --unset https.proxy
```

2. git错误：`OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443`

取消代理

```js
git config --global --unset http.proxy
git config --global --unset https.proxy
```

取消SSL校验

```js
env GIT_SSL_NO_VERIFY=true
```

```js
GET_SSL_NO_VERIFY=false
```

```js
git config --global --unset http.proxy
git config --global http.sslVerify false
```

zsh: permission denied问题的解决办法

1. 问题原因:

```js
用户没有权限，所以才出现了这个错误，所以只需要用chmod修改一下权限就可以了
```

2. 解决方法

```js
chmod u+x *.sh
```

3. 说明

```js
chmod是权限管理命令change the permissions mode of a file的缩写。
u代表所有者。x代表执行权限。’+’ 表示增加权限。
chmod u+x file.sh 就表示对当前目录下的file.sh文件的所有者增加可执行权限。
```