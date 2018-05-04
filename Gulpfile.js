var gulp = require('gulp');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var rev = require('gulp-rev');
var runSequence = require('run-sequence'); // note: will no longer be necessary with gulp 4

var pug = require('gulp-pug');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

var nodeDir = 'node_modules';
var production = false;


function failBuild(err) {
  console.log(err);
  return process.exit(2);
}


gulp.task('templates', function() {
  var pugTask;

  if (production) {
    pugTask = pug({
      pretty: true,
      locals: {
        rev: require('./public/assets/rev-manifest.json')
      }
    });

    pugTask.on('error', failBuild);
  } else {
    pugTask = pug({
      pretty: true,
      locals: {
        rev: []
      }
    });

    pugTask.on('error', function(err) {
      console.log(err);
      pugTask.end();
    });
  }

  return gulp.src('templates/**/[!_]*.pug')
    .pipe(pugTask)
    .pipe(gulp.dest('public/'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src([

      nodeDir + '/jquery/dist/jquery.min.js',
      nodeDir + '/ismobilejs/isMobile.min.js',

      nodeDir + '/bootstrap/js/dist/util.js',
      nodeDir + '/bootstrap/js/dist/collapse.js',

      nodeDir + '/bootstrap-sortable/Scripts/bootstrap-sortable.js',

      'js/**/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  return gulp.src('scss/app.scss')
    .pipe(sass().on('error', production ? failBuild : sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(connect.reload());
});

gulp.task('fonts', function() {
  return gulp.src(nodeDir + '/@fortawesome/fontawesome-free-webfonts/webfonts/*')
    .pipe(gulp.dest('public/assets/fonts'));
});


gulp.task('scripts:minify', ['scripts'], function() {
  return gulp.src('public/assets/js/app.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('public/assets/js'))
    .pipe(rev.manifest('public/assets/rev-manifest.json', {
      merge: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('styles:minify', ['styles'], function() {
  return gulp.src('public/assets/css/app.css')
    .pipe(cssnano())
    .pipe(rev())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(rev.manifest('public/assets/rev-manifest.json', {
      merge: true
    }))
    .pipe(gulp.dest('./'));
});


gulp.task('watch', function() {
  gulp.watch('templates/**/*.pug', ['templates']);
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('server', ['watch'], function() {
  connect.server({
    port: 8888,
    root: 'public',
    livereload: true
  });
});

gulp.task('deploy', function(callback) {
  production = true;
  runSequence('scripts:minify', 'styles:minify', 'fonts', 'templates', function (err) {
    return err ? failBuild(err) : callback();
  });
});

gulp.task('build', ['scripts', 'styles', 'fonts', 'templates']);


gulp.task('default', ['build', 'server']);
