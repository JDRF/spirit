const gulp = require('esds-build');
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const svgSprite = require('gulp-svg-sprite');
const svgBrushSourceFiles = 'brushes/*.svg';

gulp.task('compile-script-to-es5', () =>
  gulp.src('_site/latest/scripts/spirit.js')
    .pipe(babel({presets: ['env']}))
    .pipe(rename("spirit.es5.js"))
    .pipe(gulp.dest('_site/latest/scripts'))
);

// Hook into an ESDS lifecycle point and execute the custom task
gulp.task('esds-hook:post:scripts:build:jdrfhq-spirit', gulp.series('compile-script-to-es5'));

gulp.task('generate-svg-brushes-sprite', gulp.series('compile-svg-brushes-sprite', 'move-svg-brushes-sprite-to-dist'));

gulp.task('compile-svg-brushes-sprite', function() {
  return gulp.src(svgBrushSourceFiles)
    .pipe(svgSprite({
        shape: {
            transform: []
        },
        mode: {
            symbol: {
                dest: '.',
                sprite: 'spirit-brushes.svg',
                example: false
            }
        }
    }))
    .pipe(gulp.dest('_site/latest/brushes'));
});

gulp.task('move-svg-brushes-sprite-to-dist', function() {
  return gulp.src('_site/latest/brushes/*')
    .pipe(gulp.dest('dist'));
});

// Set up a watcher on the /brushes directory so changes there will trigger recompilation
gulp.task('watch:brushes:generate-brushes-sprite', function() {
  return gulp.watch([svgBrushSourceFiles], gulp.parallel('generate-svg-brushes-sprite'));
});

// Hook into an ESDS lifecycle point and execute the custom task, run gulp --tasks in the console to see all available tasks that you can assign pre/post hooks to
gulp.task('esds-hook:post:icons:build:jdrfhq-spirit', gulp.series('generate-svg-brushes-sprite'));
