var gulp = require('gulp');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');

var jade = require('gulp-jade');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-cssnano');

var nodeDir = 'node_modules';
var bowerDir = 'bower_components';


gulp.task('templates', function() {
  return gulp.src('templates/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('public/'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src([

      bowerDir + '/jquery/dist/jquery.min.js',
      bowerDir + '/isMobile/isMobile.min.js',

      //bowerDir + '/bootstrap/js/affix.js',
      bowerDir + '/bootstrap/js/dist/util.js',
      bowerDir + '/bootstrap/js/dist/collapse.js',
      bowerDir + '/bootstrap/js/dist/scrollspy.js',
      //bowerDir + '/bootstrap/js/transition.js',

      //bowerDir + '/moment/min/moment.min.js', While bootstrap-sortable depends on moment, it can do fine without it, as can we.
      bowerDir + '/bootstrap-sortable/Scripts/bootstrap-sortable.js',

      'js/**/*.js'
    ])
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  return gulp.src('scss/app.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(connect.reload());
});

gulp.task('fonts', function() {
  return gulp.src(bowerDir + '/font-awesome/fonts/*')
    .pipe(gulp.dest('public/assets/fonts'));
});


gulp.task('minify:scripts', ['scripts'], function() {
  return gulp.src('public/assets/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('minify:styles', ['styles'], function() {
  return gulp.src('public/assets/css/app.css')
    .pipe(minifyCss())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('public/assets/css'));
});


gulp.task('watch', ['connect'], function() {
  gulp.watch('templates/**/*.jade', ['templates']);
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('connect', function() {
  connect.server({
    port: 8888,
    root: 'public',
    livereload: true
  });
});


gulp.task('build', ['templates', 'minify:scripts', 'minify:styles', 'fonts']);
gulp.task('default', ['build', 'watch']);
