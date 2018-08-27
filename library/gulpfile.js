const gulp = require('esds-build');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

gulp.task('compile-script-to-es5', () =>
  gulp.src('_site/latest/scripts/spirit.js')
    .pipe(babel({presets: ['env']}))
    .pipe(rename("spirit.es5.js"))
    .pipe(gulp.dest('_site/latest/scripts'))
);

gulp.task('esds-hook:post:scripts:build:all', gulp.series('compile-script-to-es5'));

gulp.task('minify-styles', () =>
  gulp.src('_site/latest/styles/spirit.css')
    .pipe(cleanCSS())
    .pipe(rename('spirit.min.css'))
    .pipe(gulp.dest('_site/latest/styles'))
);

gulp.task('esds-hook:post:styles:build:all', gulp.series('minify-styles'));
