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

function setup(done) {
  if(env === "production" || env === "dev"){
    htdocsDir = "./dist/";
  }
  done();
}
exports.setup = setup;

gulp.task('default', gulp.series(setup, gulp.parallel('browser-sync', 'copy'), 'html', 'js', 'sass', 'watch', 'bs-reload', function(done) {
  console.log('task default');
  done();
}));

gulp.task('devBuild', gulp.series(setup, 'copy', 'html', 'js', 'sass', function(done) {
  console.log('task devBuild',htdocsDir);
  done();
}));

gulp.task('productionBuild', gulp.series('copy', 'html', 'min-js', 'sass', function(done) {
  console.log('task production');
  done();
}));