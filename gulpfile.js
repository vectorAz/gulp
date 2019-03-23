const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
const less = require('gulp-less');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect')
const open = require("open");
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({
  browsers: ["cover 99.5%", "not dead"]
});
const htmlmin = require('gulp-htmlmin');

gulp.task('eslint', () => { //查错
  return gulp.src(['src/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(livereload());
})
gulp.task('babel', () => { //语法转换
  return gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(livereload());
});
gulp.task('browserify', function () {
  // Single entry point to browserify
  return gulp.src('./build/js/app.js')
    .pipe(browserify()) //commjs转es5
    .pipe(rename("./build.js")) //重命名
    .pipe(gulp.dest('./build/js'))
    .pipe(livereload());

});
gulp.task('uglify', function () {
  return gulp.src('./build/js/build.js')
    .pipe(uglify())
    .pipe(rename('dist.min.js'))
    .pipe(gulp.dest('./dist/js'))
});
gulp.task('less', () => {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});


gulp.task('css', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less({
      plugins: [autoprefix] //自动扩展样式的兼容性前缀
    }))  //将less文件转换成css文件
    .pipe(concat('dist.min.css'))  //合并css文件
    .pipe(cleanCSS({compatibility: 'ie8'}))  //压缩css文件
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('html', function() {
  return gulp.src('./build/index.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'))
});



gulp.task('watch', function () {
  livereload.listen();
  connect.server({
    name: 'dddddd',
    root: ['build'], //提供服务的根路径
    livereload: true, //是否实时刷新
    port: 8000 //开启端口号
  });
  // 自动开启链接
  open('http://localhost:8000');

  gulp.watch('src/less/*.less', gulp.series('less'));
  gulp.watch('src/js/*.js', gulp.series('jsgo'));


});

// gulp.task('default',gulp.series('eslint','babel','browserify','less'))

-
gulp.task('jsgo', gulp.series('eslint', 'babel', 'browserify')); //顺序执行

-
gulp.task('rungo', gulp.parallel('jsgo', 'less')); //并行执行
-

gulp.task('jsmin', gulp.series('jsgo', 'uglify')); //顺序执行




gulp.task('start', gulp.parallel('rungo', 'watch'));
-
gulp.task('webgo', gulp.parallel('html','less','css', 'jsmin'));