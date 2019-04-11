var htdocsDir = "./htdocs/";

var gulp = require('gulp');
var babel = require("gulp-babel");
var babelify = require('babelify');
var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var uglify      = require('gulp-uglify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var browserSync = require('browser-sync');
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
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
    .pipe(pleeease({
      autoprefixer: {
        browsers: ['last 4 versions']
      },
      "minifier": env === "production" ? true : false,
    }))
    .pipe(gulp.dest(`${htdocsDir}/css`));
});

// html
gulp.task('html', function(){
  return gulp.src('src/**/*.html', {base: 'src'})
  .pipe(gulp.dest(htdocsDir));
});

// icon font
gulp.task('iconfont', function(){
  return gulp.src(['src/assets/iconfont/*.svg'])
  .pipe(iconfont({
    startUnicode: 0xF001,
    fontName: 'iconfont',
    formats: ['ttf', 'eot', 'woff', 'svg'],
    appendCodepoints: false,
    normalize: true,
    fontHeight: 1000,
    descent: 1000/4,
    timestamp: runTimestamp
  })).on('glyphs', function(glyphs) {
    gulp.src('src/assets/iconfont/template/_icons.scss')
    .pipe(consolidate('lodash', {
      glyphs: glyphs.map(function(glyph) {
        return { fileName: glyph.name, codePoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() };
      }),
      fontName: 'iconfont',
      fontPath: '../fonts/',
      cssClass: 'iconfont'
    }))
    .pipe(gulp.dest('src/assets/sass/foundation'));
  }).pipe(gulp.dest(`${htdocsDir}assets/fonts`));
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
    runSequence('copy', 'iconfont', 'html', 'min-js', 'sass');
  }else if(env === "dev"){
    // development
    htdocsDir = "./dist/";
    runSequence('copy', 'iconfont', 'html', 'js', 'sass');
  }else{
    // local
    runSequence(['browser-sync', 'copy', 'iconfont'], 'html', 'js', 'sass', 'watch', 'bs-reload');
  }
});
