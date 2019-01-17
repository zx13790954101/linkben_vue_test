// 在这里面描述了开发和构建两种环境下的配置
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = { 
  dev: {
    // 环境变量
    env: require('./dev.env'),
    port: 8888,
    // 是否自动打开浏览器
    autoOpenBrowser: true,
    // 静态资源文件夹
    assetsSubDirectory: 'static',
    // 发布路径
    assetsPublicPath: '/',
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    proxyTable: {
      '/api': {
        target : 'https://dynamic.12306.cn',
        changeOrigin:true,
        pathRewrite:{
          '^/api' : ''
        }
      },
      '/zhihu': {
        target : 'https://news-at.zhihu.com',
        changeOrigin:true,
        pathRewrite:{
          '^/zhihu' : ''
        }
      },
     
      '/zhihuimg': {
        target : 'https://pic1.zhimg.com',
        changeOrigin:true,
        pathRewrite:{
          '^/zhihuimg' : ''
        }
      }
    },
    

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8888, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: true
  },
  // 构建生产环境使用的配置
  build: {
    // 环境变量
    env: require('./prod.env'),
    //env: require('./prod/env'),
    // html入口文件
    index: path.resolve(__dirname, '../dist/index.html'),
    // 上线文件的存放路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 二级目录，存放静态资源文件的目录，位于dist文件夹下
    assetsSubDirectory: 'static',// 编译输出的二级目录
    // 设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径
    assetsPublicPath: './',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    /**
     * Source Maps
     */
    // 是否使用source-map
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
