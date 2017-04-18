var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  autoprefixer = require('gulp-autoprefixer')

const path = {
  assets : './assets/',
  dist : './d/',
}

gulp.task('sass-transpile', () => {
  gulp.src(path.assets + 'styles/style.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'nested'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.dist + 'styles'))
})

gulp.task('watch', () => {
  gulp.watch(path.assets + 'styles/**/*.scss', ['sass-transpile'])
})

gulp.task('default', () => {
  gulp.start('sass-transpile')
  gulp.start('watch')
})
