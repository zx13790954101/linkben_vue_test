var gulp = require('gulp');
var sftp = require('gulp-sftp');
 
gulp.task('upload', function () {
    return gulp.src('dist/**')
        .pipe(sftp({
          host: '47.93.198.213', //ip地址
          user: 'linkben', //帐号
          pass: "C7PaiFkfid", //密码
          port: "21" ,
          protocol: "sftp",
          algorithms: {
              serverHostKey: ['ssh-rsa', 'ssh-dss']
            },
          remotePath: './', // 仅仅是结尾多了一个”/“，部署到服务器的路径
        }));
});