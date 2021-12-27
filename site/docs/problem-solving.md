# 问题解答(problem-solving)

1. 完美解决 `fatal: unable to access 'https://github.com/.../.git': Could not resolve host: github.com`

只需要在命令行中执行

```js
git config --global --unset http.proxy

git config --global --unset https.proxy
```






