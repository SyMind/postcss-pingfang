# postcss-pingfang

优化 PingFang SC 在安卓机型下的表现

## 动机

设计同学使用 PingFang SC 作为设计稿默认字体，这会带来以下的问题：
1. PingFang SC 并非安卓手机的内置字体，可以使用 font-weight 替换原设计稿中的字体，如 PingFangSC-Medium 替换为 500。
2. 但大部分安卓手机内置的字体仅对中文支持 3 种字重，此时如 font-weight 为 500 的字体实际上并不会被加粗。

而该插件将在 iOS 手机上使用 PingFangSC-Medium，在安卓手机上使用 font-weight: 700。

## 安装

```bash
npm install postcss-pingfang
```

## 使用

```javascript
// dependencies
const fs = require('fs')
const postcss = require('postcss')
const pingfang = require('postcss-pingfang')

// css to be processed
const css = fs.readFileSync('input.css', 'utf8')

// process css
const output = postcss()
  .use(pingfang())
  .process(css)
  .css
```
