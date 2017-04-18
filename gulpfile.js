var gulp = require('gulp')
var gulpif = require('gulp-if')
var source = require('vinyl-source-stream')
var browserify = require('browserify')
var watchify = require('watchify')
var buffer = require('vinyl-buffer')
var gutil = require('gulp-util')
var argv = require('minimist')(process.argv.slice(2));
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var plumber = require('gulp-plumber')
var autoprefixer = require('gulp-autoprefixer')
var browser = require('browser-sync')
var uglify = require("gulp-uglify")
var sourcemaps = require("gulp-sourcemaps")
var cssNano = require('gulp-cssnano')

var path = {
  assets: './assets/',
  dist: './dist/',
}

var enabled = {
  // 引数`--production`があるときにsource mapsを出力しない
  maps: !argv.production,
  // 引数`--production`があるときにエラーでわざとタスクを失敗させる
  failStyleTask: argv.production,
};

gulp.task('bs-reload', function () {
  browser.reload()
})

gulp.task("sass", function () {
  gulp.src(path.assets + "styles/style.scss")
    .pipe(
      gulpif(!enabled.failStyleTask, plumber())
    )
    .pipe(
      gulpif(enabled.maps, sourcemaps.init())
    )
    .pipe(sass({
      outputStyle: 'nested'
    }))
    .pipe(autoprefixer())
    .pipe(cssNano(), {
      safe: true
    })
    .pipe(
      gulpif(enabled.maps, sourcemaps.write('.'))
    )
    .pipe(gulp.dest(path.dist + "styles"))
})

gulp.task("styles", function () {
  gulp.src(path.dist + "styles/style.css")
    .pipe(
      gulpif(!enabled.failStyleTask, plumber())
    )
    .pipe(browser.reload({stream: true}))
})

var b = browserify({
  entries : [path.assets + 'js/index.js'],
  transform : ['babelify'],
  cache : {},
  plugin : [watchify]
})
.on('update', bundle)
.on('log', gutil.log)

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.dist))
}

gulp.task('script', bundle)

gulp.task('clean', require('del').bind(null, [path.dist]))

gulp.task("watch", function () {
  gulp.watch(path.assets + "styles/**/*.scss", ["sass"])
  gulp.watch(path.assets + "fonts/**/*", ["fonts"])
  gulp.watch("./**/*.php", ['bs-reload'])
  gulp.watch(path.assets + "js/*.js", ['bs-reload'])
  gulp.watch(path.dist + "styles/style.css", ["styles"])
})

gulp.task("default", ['clean'], function () {
  gulp.start('sass')
  gulp.start('script')
})
