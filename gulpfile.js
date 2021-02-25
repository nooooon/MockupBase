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


// js
function jsCompile() {
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
};

// minJs
function minJsCompile() {
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
};


// css
function sassCompile() {
  return gulp.src('src/sass/*.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}))
    .pipe(postcss([ autoprefixer({
      grid: 'autoplace',
      cascade: false
    }) ]))
    .pipe(cleanCss())
    .pipe(gulp.dest(`${htdocsDir}/css`));
};

// html
function htmlCopy() {
  return gulp.src('src/**/*.html', {base: 'src'})
  .pipe(gulp.dest(htdocsDir));
};

// copy
function fileCopy() {
  return gulp.src('src/**/*.{png,jpg,gif,ico,svg,json}', {base: 'src'})
  .pipe(gulp.dest(htdocsDir));
};


// browser sync
function browserSyncStart(done) {
  browserSync.init({
    server: {
      baseDir: htdocsDir
    }
  });
  done();
};

// reload all browser
function browserSyncReload(done) {
  browserSync.reload();
  done();
};


function watchFiles(){
  console.log('task watch');
  gulp.watch([
    htdocsDir + '**/*.html',
    htdocsDir + '**/*.js',
    htdocsDir + '**/*.css'
  ], gulp.series(browserSyncReload));

  gulp.watch('./src/**/*.js', gulp.series(jsCompile));
  gulp.watch('./src/**/*.scss', gulp.series(sassCompile));
  gulp.watch('./src/**/*.html', gulp.series(htmlCopy));
};

function setup(done) {
  if(env === "production" || env === "dev"){
    htdocsDir = "./dist/";
  }
  done();
}
exports.setup = setup;

const local = gulp.series(
  setup, 
  gulp.parallel(browserSyncStart, fileCopy), 
  htmlCopy, 
  jsCompile, 
  sassCompile, 
  watchFiles, 
  browserSyncReload, 
  function(done) {
    console.log('task default');
  }
);
exports.local = local;

const devBuild = gulp.series(
  setup, 
  fileCopy, 
  htmlCopy, 
  jsCompile, 
  sassCompile, 
  function(done) {
    console.log('task devBuild');
    done();
  }
);
exports.devBuild = devBuild;


const productionBuild = gulp.series(
  setup, 
  fileCopy, 
  htmlCopy, 
  minJsCompile, 
  sassCompile, 
  function(done) {
    console.log('task productionBuild');
    done();
  }
);
exports.productionBuild = productionBuild;
