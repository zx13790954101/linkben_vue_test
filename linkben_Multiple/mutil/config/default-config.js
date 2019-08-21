/*
 * @desc lvshou 的单独配置文件 用于开发环境 和 生产环境
 * */

module.exports = {
  title: "名字",
  name: "user",
  description: "",
  keywords: "",
  tongji: "<script></script>",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=0",
  entryRoot: "src/pages",
  assetsPublicPath: "", // cdn 的URL地址 eq: //static.lvshou.com/
  assetsSubDirectory: process.argv[2], // 局部编辑
  //assetsRoot: "../../dev1.0", // 打包文件所在目录
  selfAdaption: true, // 自适应配置 为 true 表示自适应 (默认状态) false 取消自适应
  assetsRoot: "H:\\code\\company\\hxsapp-fe2-online" //迁移进上线目录hxsapp-fe2-online
};
