var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');

// jshint
gulp.task('jshint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
});

// All bower dependecies become vendor.min.js
gulp.task('minify-vendor-js', function() {
  return gulp.src(bowerFiles())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('js'))
    .pipe(uglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('js'));
});

// the default task
// checks all files and reloads index
gulp.task('default', function() {
  livereload.listen();
  gulp.watch(['src/**/*', 'index.html'], 
    [
      function() { livereload.reload('index.html'); }
    ]
  );
});