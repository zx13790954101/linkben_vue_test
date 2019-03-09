var gulp = require('gulp');
var sftp = require('gulp-sftp');

const sftpOption = {
  host: '47.93.198.213', // FTP主机地址
  user:"root",
  pass:"jE5JKBNnjy",
  port:21,
  protocol:"sftp",
  remotePath: '/www/wwwroot/', // FTP需要上传的位置
  }

gulp.task('upload', function () {
     gulp.src('G:/linzesen/linkben_project/linkben_vue/dist/**/**').pipe(sftp(Object.assign(sftpOption, {})));
});