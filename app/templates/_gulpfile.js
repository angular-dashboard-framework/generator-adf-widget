var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var jsReporter = require('jshint-stylish');
var pkg = require('./package.json');

var templateOptions = {
  root: '{widgetsPath}/<%= widgetName %>/src',
  module: 'adf.widget.<%= widgetName %>'
};

gulp.task('csslint', function(){
  gulp.src('src/*.css')
      .pipe($.csslint())
      .pipe($.csslint.reporter());
});

gulp.task('jslint', function(){
  gulp.src('src/*.js')
      .pipe($.jshint())
      .pipe($.jshint.reporter(jsReporter));
});

gulp.task('lint', ['csslint', 'jslint']);

gulp.task('clean', function(cb){
  rimraf('dist', cb);
});

gulp.task('css', function(){
  gulp.src('src/*.css')
      .pipe($.concat(pkg.name + '.min.css'))
      .pipe($.minifyCss())
      .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
  gulp.src(['src/*.js', 'src/*.html'])
      .pipe($.if('*.html', $.minifyHtml()))
      .pipe($.if('*.html', $.angularTemplatecache(pkg.name + '.tpl.js', templateOptions)))
      .pipe($.ngAnnotate())
      .pipe($.concat(pkg.name + '.min.js'))
      // https://github.com/olov/ng-annotate/issues/133
      //.pipe($.uglify())
      .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['css', 'js']);
