"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var miniCss = require('gulp-minify-css');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');

var path = {
  build: {
    css: 'build/css/',
    js: 'build/js/'
  },
  src: {
    style: 'src/style/style.scss',
    js: 'src/js/app.js'
  },
  clean: './build'
};

gulp.task('style:build', function () {
    gulp.src(path.src.style)
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(miniCss())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('js:build', function() {
  gulp.src(path.src.js)
  .pipe(babel({
    presets:['es2015','react']
  }))
  .pipe(browserify())
  .pipe(gulp.dest(path.build.js))
});

gulp.task('watcher', function() {
  gulp.watch('src/style/**/*.scss', ['style:build']);
  gulp.watch('src/js/**/*.js', ['js:build']);
});

gulp.task('default', function () {
  gulp.run('style:build','js:build','watcher');
});
