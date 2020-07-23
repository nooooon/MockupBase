var htdocsDir = "./htdocs/";

var gulp = require('gulp');
var babel = require("gulp-babel");
var babelify = require('babelify');
var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss'); //autoprefixerを使うのに必要
var autoprefixer = require('autoprefixer'); //prefixをつける
var cleanCss = require('gulp-clean-css'); //css圧縮
var browserSync = require('browser-sync');
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var runSequence = require('run-sequence');
var env = process.env.NODE_ENV;

var runTimestamp = Math.round(Date.now() / 1000);


// js
gulp.task("js", function() {
  return browserify('src/js/index.js', {
    debug: true,
  })
  .transform("babelify", {presets: ["@babel/preset-env"]})
  .bundle()
  .on("error", function (err) {
    console.log("Error: " + err.message);
    this.emit('end');
  })
  .pipe(source('index.js'))
  .pipe(gulp.dest(`${htdocsDir}js/`));
});

// min-js
gulp.task("min-js", function() {
  return browserify('src/js/index.js', {
    debug: false,
  })
  .transform("babelify", {presets: ["@babel/preset-env"]})
  .bundle()
  .on("error", function (err) {
    console.log("Error: " + err.message);
    this.emit('end');
  })
  .pipe(source('index.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest(`${htdocsDir}js/`));
});


// css
gulp.task("sass", function() {
  return gulp.src('src/sass/*.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}))
    .pipe(postcss([ autoprefixer({
      grid: 'autoplace',
      cascade: false
    }) ]))
    .pipe(cleanCss())
    .pipe(gulp.dest(`${htdocsDir}/css`));
});

// html
gulp.task('html', function(){
  return gulp.src('src/**/*.html', {base: 'src'})
  .pipe(gulp.dest(htdocsDir));
});

// copy
gulp.task('copy', function(){
  return gulp.src('src/**/*.{png,jpg,gif,ico,svg,json}', {base: 'src'})
  .pipe(gulp.dest(htdocsDir));
});


// browser sync
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: htdocsDir
    }
  });
});

// reload all browser
gulp.task('bs-reload', function(){
  browserSync.reload();
});


gulp.task('watch', function(){
  gulp.watch([
    htdocsDir + '**/*.html',
    htdocsDir + '**/*.js',
    htdocsDir + '**/*.css'
  ], ['bs-reload']);

  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.html', ['html']);
});


gulp.task('default', function(){
  if(env === "production"){
    // production
    htdocsDir = "./dist/";
    runSequence('copy', 'html', 'min-js', 'sass');
  }else if(env === "dev"){
    // development
    htdocsDir = "./dist/";
    runSequence('copy', 'html', 'js', 'sass');
  }else{
    // local
    runSequence(['browser-sync', 'copy'], 'html', 'js', 'sass', 'watch', 'bs-reload');
  }
});
