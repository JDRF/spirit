const gulp = require('esds-build');
const babel = require('gulp-babel');
const svgSprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const svgBrushSourceFiles = 'brushes/*.svg';

gulp.task('clean-scripts', () =>
  gulp.src('_site/latest/scripts/*.min.js')
    .pipe(clean())
);

gulp.task('compile-script-to-es5', () =>
  gulp.src('_site/latest/scripts/spirit.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(rename('spirit.es5.js'))
    .pipe(gulp.dest('_site/latest/scripts'))
);

gulp.task('dependency-scripts', () =>
  gulp.src([
    '_site/latest/scripts/dependencies/svg4everybody.min.js',
    '_site/latest/scripts/dependencies/a11y-dialog.min.js',
    '_site/latest/scripts/dependencies/inputmask.dependencyLib.js',
    '_site/latest/scripts/dependencies/inputmask.js',
    '_site/latest/scripts/dependencies/inputmask.extensions.js',
    '_site/latest/scripts/dependencies/inputmask.numeric.extensions.js',
    '_site/latest/scripts/dependencies/inputmask.date.extensions.js',
  ])
    .pipe(concat('spirit.dependencies.js'))
    .pipe(gulp.dest('_site/latest/scripts'))
);

gulp.task('bundle-scripts', () =>
  gulp.src([
    '_site/latest/scripts/spirit.dependencies.js',
    '_site/latest/scripts/scriptscustom/index.js',
    '_site/latest/scripts/spirit.js'
  ])
    .pipe(concat('spirit.bundle.js'))
    .pipe(gulp.dest('_site/latest/scripts'))
);

gulp.task('minify-scripts', () =>
  gulp.src('_site/latest/scripts/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('_site/latest/scripts'))
);

// Hook into an ESDS lifecycle point and execute the custom task
gulp.task(
  'esds-hook:post:scripts:build:all',
  gulp.series(
    'clean-scripts',
    'compile-script-to-es5',
    'dependency-scripts',
    'bundle-scripts',
    'minify-scripts'
  )
);

gulp.task('generate-svg-brushes-sprite', gulp.series('compile-svg-brushes-sprite', 'move-svg-brushes-sprite-to-dist'));

gulp.task('compile-svg-brushes-sprite', function () {
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

gulp.task('move-svg-brushes-sprite-to-dist', function () {
  return gulp.src('_site/latest/brushes/*')
    .pipe(gulp.dest('dist'));
});

// Set up a watcher on the /brushes directory so changes there will trigger recompilation
gulp.task('watch:brushes:generate-brushes-sprite', function () {
  return gulp.watch([svgBrushSourceFiles], gulp.parallel('generate-svg-brushes-sprite'));
});

// Hook into an ESDS lifecycle point and execute the custom task, run gulp --tasks in the console to see all available tasks that you can assign pre/post hooks to
gulp.task('esds-hook:post:icons:build:jdrfhq-spirit', gulp.series('generate-svg-brushes-sprite'));

gulp.task('minify-styles', () =>
  gulp.src('_site/latest/styles/spirit.css')
    .pipe(cleanCSS())
    .pipe(rename('spirit.min.css'))
    .pipe(gulp.dest('_site/latest/styles'))
);

gulp.task('esds-hook:post:styles:build:all', gulp.series('minify-styles'));

gulp.task('watch:styles:minify', () => {
  return gulp.watch(['_site/latest/styles/spirit.css'], gulp.parallel('minify-styles'));
});
