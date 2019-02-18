#### 项目介绍


#### 软件架构
软件架构说明
使用vue-cli脚手架搭建，引入vuex ，vue-router，Mint UI ，axios，配置webpack基本设置


#### 安装教程

克隆到本地 
git clone https://github.com/zx13790954101/linkben_project.git
安装依赖 
npm install
安装淘宝的npm
npm install cnpm -g --registry=https://registry.npm.taobao.org
安装依赖 
cnpm install
删除包的命令行
rm -rf node_modules 

开启本地服务器 
localhost:8888 
npm run dev

## 特别注意点

用这个开发框架时 一开始就要针对config 文件夹 下的lvshou-config.js 输入自己本地的开发配置如

entryRoot: 'src/pages', // 框架的入口文件

assetsSubDirectory: 'activityStatic', // 打包的静态文件夹名

isCopyDist: true, // 是否需要copy整个dist文件

distPath: '../dev1.0', // 打包后的文件夹名称 (这个可以自定义打包后的位置,, 这个路径是相对路径)

assetsRoot: '../../dev1.0', // 打包文件所在目录 (打包后存放的文件夹, 这个路径是相对路径)

testPath: 'H:\\code\\company\\hxsapp-act-fe', // 迁移进公司开发目录 用于发布到预发布环境 (这个是公司gitlab hxsapp-act-fe在你本地的地址 )

执行 npm run build 操作时 重点关注的地方

1, 会执行两次  npm run gulp 操作 (引入gulp 的sftp 插件性能不怎么好 文件过多的话, 容易造成文件丢失 只能执行多一次操作)

2, 如果图片过多的话 建议手动上传 避免图片上传不成功


# git 操作

1 bug修复可以直接在dev 分支修复 

2 新需求开发 新开分支开发  ( git branch 新分支   git checkout 新分支 )

3 开发完成 合并到dev ( git checkout dev   git merge 开发分支 )

4 删除 本地分支 ( git branch -d 分支名)

5 删除远程仓库分支 ( git push origin --delete 分支名 )

6 整个开发完成


# package.json 的功能包
"vant": "^1.4.2",
"fastclick": "^1.0.6",
"hammerjs": "^2.0.8",
"kim-vue-touch": "^1.1.4",
"lib-flexible": "^0.3.2",
"v-viewer": "^1.3.2",
"vcolorpicker": "^0.1.8"