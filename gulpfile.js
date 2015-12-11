var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


// All bower dependecies become vendor.min.js
gulp.task('minify-vendor-js', function() {
  return gulp.src(bowerFiles())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('js'))
    .pipe(uglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('js'));
});