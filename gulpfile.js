var gulp = require('gulp');
var shell = require('gulp-shell');
var fsExtra = require('fs-extra');

gulp.task('tsc', shell.task([
 'tsc'
]));

gulp.task('copy-templates', function (cb) {
  fsExtra.copy('src/templates', 'dist/templates', cb);
 });

gulp.task('default', gulp.series('copy-templates', 'tsc'));
