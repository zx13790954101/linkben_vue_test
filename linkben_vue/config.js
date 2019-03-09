module.exports = {
  devTest: { //部署到测试服务器上
      remotePath: '/root/app/', // 仅仅是结尾多了一个”/“，部署到服务器的路径
      host: 'xx.xxx.xxx.xx', //ip地址
      user: 'root', //帐号
      pass: "******", //密码
      port: 22 //端口
  },
  devDist: { //部署正式服务器上
      remotePath: '/www/wwwroot/linkben.com/linkben_test/public/', // 仅仅是结尾多了一个”/“，部署到服务器的路径
      host: '47.93.198.213', //ip地址
      user: 'linkben', //帐号
      pass: "C7PaiFkfid", //密码
      port: 21 //端口
  },
  publicPath: '/dist/' //程序编译好路径
}
