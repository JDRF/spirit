const gulp = require('esds-build');
const babel = require('gulp-babel');
const rename = require("gulp-rename");

gulp.task('compile-script-to-es5');

gulp.task('compile-script-to-es5', () =>
  gulp.src('dist/spirit.js')
    .pipe(babel({presets: ['env']}))
    .pipe(rename("spirit.es5.js"))
    .pipe(gulp.dest('dist'))
);

gulp.task('copy-es5-script-to-webroot', () =>
  gulp.src('dist/spirit.es5.js')
    .pipe(gulp.dest('_site/latest/scripts'))
);

gulp.task('esds-hook:post:scripts:build:spirit', gulp.series('compile-script-to-es5', 'copy-es5-script-to-webroot'));
