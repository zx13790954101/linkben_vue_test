var gulp = require('gulp');
var sftp = require('gulp-sftp');

const sftpOption = {
host: '47.93.198.213', // FTP主机地址
user:"root",
pass:"jE5JKBNnjy",
port:21,
remotePath: '/www/wwwroot/linkben.com/linkben_test/public', // FTP需要上传的位置
}

gulp.task('upload', function () {
     gulp.src('dist/**')
        .pipe(sftp(sftpOption));
});