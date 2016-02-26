var gulp = require('gulp');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

var jade = require('gulp-jade');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

var nodeDir = 'node_modules';
var bowerDir = 'bower_components';


gulp.task('templates', function() {
  var j = jade({
    pretty: true
  });
  j.on('error', function(e) {
    console.log(e);
    j.end();
  });
  return gulp.src('templates/**/[!_]*.jade')
    .pipe(j)
    .pipe(gulp.dest('public/'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src([

      bowerDir + '/jquery/dist/jquery.min.js',
      bowerDir + '/isMobile/isMobile.min.js',

      bowerDir + '/bootstrap/js/dist/util.js',
      bowerDir + '/bootstrap/js/dist/collapse.js',

      //bowerDir + '/moment/min/moment.min.js', While bootstrap-sortable depends on moment, it can do fine without it, as can we.
      bowerDir + '/bootstrap-sortable/Scripts/bootstrap-sortable.js',

      'js/**/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  return gulp.src('scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(connect.reload());
});

gulp.task('fonts', function() {
  return gulp.src(bowerDir + '/font-awesome/fonts/*')
    .pipe(gulp.dest('public/assets/fonts'));
});


gulp.task('scripts:minify', ['scripts'], function() {
  return gulp.src('public/assets/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('styles:minify', ['styles'], function() {
  return gulp.src('public/assets/css/app.css')
    .pipe(cssnano())
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


gulp.task('build', ['templates', 'scripts:minify', 'styles:minify', 'fonts']);
gulp.task('default', ['build', 'watch']);
