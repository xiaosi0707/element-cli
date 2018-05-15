var gulp = require('gulp')
var concat = require('gulp-concat')
var jshint = require('gulp-jshint')
var ugligy = require('gulp-uglify')
var sass = require('gulp-ruby-sass')
var webServer = require('gulp-webserver')

// 合并JS文件
gulp.task('jsTask', function () {
    gulp.src('./src/assets/js/*.js') // 原材料
        .pipe(jshint()) // 加工 - 语法检测
        .pipe(jshint.reporter("default")) // 若有错误，则调用myReporter进行提示
        .pipe(concat('all.js')) // 加工 - 合并
        .pipe(ugligy()) // 加工 - 压缩
        .pipe(gulp.dest('./dist/js')) // 加工完成 - 出厂
});

// sass
gulp.task('sassTask', function () {
    return sass('./src/assets/css/app.scss') // 原材料
        .on('error', sass.logError) // 加工 - 质检
        .pipe(gulp.dest('./dist/css')) // 加工完成 - 出厂
})
// html复制
gulp.task('copyHtml', function () {
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'))
})
// sass监听
gulp.task('sassWatch', function () {
    gulp.watch('./src/assets/css/**/*.scss', ['sassTask'])
    gulp.watch('./index.html', ['copyHtml'])
})

// 服务器配置
gulp.task('server', ['sassWatch'], function () {
    gulp.src('./dist') //
        .pipe(webServer({
            host: 'localhost',
            port: '8081',
            livereload: true,
            open: true
        }))
})
// 默认
// gulp.task('default')