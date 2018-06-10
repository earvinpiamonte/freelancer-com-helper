'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Gulp task to minify CSS files
gulp.task('minify_styles', function () {
  return gulp.src(
  		[
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
  		]
  	)
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(concat('styles.min.css'))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('../dist/styles/'))
});

// Gulp task to minify JavaScript files
gulp.task('minify_libraries', function() {
  return gulp.src(
      [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/autolinker/dist/Autolinker.min.js'
      ]
    )
    .pipe(concat('libraries.min.js'))
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('../dist/libraries/'))
});

// Gulp task to minify JavaScript files
gulp.task('minify_content_scripts', function() {
  return gulp.src(
      [
        'content_scripts/*.js'
      ]
    )
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('../dist/content_scripts/'))
});

// Gulp task to minify JavaScript files
gulp.task('minify_scripts', function() {
  return gulp.src(
      [
        'pages/*.js'
      ]
    )
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('../'))
});

// Gulp task to minify HTML files
gulp.task('minify_html', function() {
  return gulp.src(['pages/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('../'));
});


// Gulp task to minify all files
gulp.task('default', function () {
  runSequence(
    'minify_styles',
    'minify_libraries',
    'minify_content_scripts',
    'minify_scripts',
    'minify_html'
  );
});

gulp.task('watch', function(){
  gulp.watch('node_modules/*', ['minify_styles']);
  gulp.watch('node_modules/*', ['minify_libraries']);
  gulp.watch('content_scripts/*.js', ['minify_content_scripts']);
  gulp.watch('pages/*.js', ['minify_scripts']);
  gulp.watch('pages/*.html', ['minify_html']);
});