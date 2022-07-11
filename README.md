

# nuxt-simple-template

> 这是一个极简的 nuxt + element UI 的模板。它只包含了 Nuxt & Element & axios & iconfont & EsLint，这些搭建nuxt项目时必要的东西

## 部署流程

### 打包前配置

修改根目录下面的```config.js```配置文件，
其中```DEV_API_URL```是本地二次开发的时候需要配置的api请求域名，
```SSR_API_URL```是在生产环境开启ssr模式的时候需要配置的api请求域名

```bash
# 克隆项目
git clone https://github.com/mvpyb/nuxt-simple-template.git

# 进入项目目录
cd nuxt-simple-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev


```

浏览器访问 [http://localhost:9527](http://localhost:9527)

## 发布

```bash

# 构建SPA页面
npm run build:spa
生成```dist```目录，访问```index.html```即可


# 包含ssr的部署
npm run build
npm run start

or

npm run build:ssr

# 开启服务
用```pm2```之类的进程管理工具开启一个```node```服务
pm2 start npm --name "nuxt-simple-template" -- run start


# 生成静态项目
npm run generate

```

## 其它

```bash

# analyze
npm run analyze

# 代码格式检查
npm run lint -- --fix

```

有关如何工作的详细说明，请查看 [Nuxt.js docs](https://nuxtjs.org)



## 项目目录结构说明
```
|-- api                       api 存放目录以及对于请求数据的处理存放目录
| |-- request.js              api: 请求之前或者之后处理函数
|-- assets                    资源存放目录
| |-- css                     公共样式存放目录
| | |-- variable              公共样式变量目录
| | | |-- color.scss          styles: 颜色
| | | |-- mixin.scss          styles: mixin函数
| | |-- reset.scss            styles: 重置页面样式
| |-- svg-icons               svg存放目录
|-- components                页面公用的组件存放的目录
|-- directive                 指令存放的目录
| |-- permission.js           按钮鉴权指令
|-- dist                      构建之后生成的目录
|-- layouts                   网站布局文件存放目录
| |-- center_layout.vue       个人中心布局文件
| |-- custom_layout.vue       首页等双列布局文件
| |-- default.vue             默认布局文件
| |-- error_layout.vue        错误页等没有头部底部布局文件
|-- library                   存放一些第三方依赖库等
|-- middleware                存放应用的中间件
|-- mixin                     存放mixin文件
|-- pages                   
| |-- pages                   项目的开发目录
| |-- _.vue                   404页面
| |--index.vue                首页
|-- plugins                   插件存放目录
| |-- lang                    国际化设置目录（语言设置）
|-- static                    用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下
|-- utils                     常用函数存放目录
|-- store                     数据状态管理目录
| |-- modules
| |-- types
|-- .editorconfig             编辑器配置推荐
|-- .eslintrc.js              eslint 配置文件
|-- .gitignore                git 提交忽略文件
|-- config.js                 项目配置文件
|-- nuxt.config.js            用于组织 Nuxt.js 应用的个性化配置，以便覆盖默认配置
|-- package.json              用于描述应用的依赖关系和对外暴露的脚本接口
|-- README.md                 项目说明文件
```

## 依赖
1. [nuxt.js](https://nuxtjs.org/)：基于vue的开发框架
2. [vue](https://cn.vuejs.org/index.html)：JavaScript 渐进式框架
3. [vuex](https://vuex.vuejs.org/zh/)：状态管理
4. [vue-i18n](https://kazupon.github.io/vue-i18n/zh/)：国际化
5. [jsonapi-vuex](https://github.com/mrichar1/jsonapi-vuex)：允许通过 vuex store 访问 [JSON:API](https://jsonapi.org/) web 服务中的数据。
6. [nuxtjs-axios](http://www.axios-js.com/zh-cn/docs/nuxtjs-axios.html)：基于 promise 的 HTTP 库
7. [element-ui](https://element.eleme.cn/)：UI框架
8. [vue-cropper](https://www.npmjs.com/package/cropperjs)：图片裁剪插件
9. [v-viewer](https://github.com/mirari/v-viewer)：图片点击放大预览插件
10. [xss](https://www.npmjs.com/package/xss)：防xss注入插件
11. [dayjs](https://www.npmjs.com/package/dayjs)：处理时间和日期的 JavaScript 库
12. [babel-plugin-transform-remove-console](https://www.npmjs.com/package/babel-plugin-transform-remove-console)：用来移除项目中所有的 console 代码的插件



## Donate

如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励 

| 微信 | 支付宝 |
| ------ | ------- |
| [![](http://pic.yupoo.com/454539387/193bac45/70a463c6.png)](bitcoin:)<br /></center> |[![](http://pic.yupoo.com/454539387/42d4b71d/2cb80871.png)](bitcoin:)<br /></center> |
