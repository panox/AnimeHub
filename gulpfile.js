var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

// sass
gulp.task('sass', function() {
  return gulp.src('src/scss/style.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('css'));
});

// jshint
gulp.task('jshint', function() {
  return gulp.src(['src/js/app.js', 'src/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

// concat js into one min file javascript.min.js
gulp.task('js-min', function() {
  return gulp.src(['src/js/app.js', 'src/js/**/*.js'])
    .pipe(concat('javascript.js'))
    .pipe(gulp.dest('js'))
    .pipe(uglify())
    .pipe(rename('javascript.min.js'))
    .pipe(gulp.dest('js'));
});

// Only Concat files javascript.js
gulp.task('js-concat', function() {
  return gulp.src(['src/js/app.js', 'src/js/**/*.js'])
    .pipe(concat('javascript.js'))
    .pipe(gulp.dest('js'))
});

// All bower dependecies become vendor.min.js
gulp.task('vendor-min', function() {
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
  gulp.watch(['src/**/*','src/**/**/*', 'index.html', 'partials/*'], 
    [ 
      'sass',
      'jshint',
      'js-concat',
      function() { livereload.reload('index.html'); }
    ]
  );
});

gulp.task('build', ['jshint', 'vendor-min', 'js-concat'])