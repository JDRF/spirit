const gulp = require('esds-build');
const fs = require('fs-extra');

// TODO: Relativize root

gulp.task('build-release', gulp.series('move-versioned-docs-outside-webroot', 'build:all', 'build:versioned-docs', 'move-versioned-docs-inside-webroot'));

// Move the /v folder outside of webroot so it doesn't get deleted when the project gets rebuilt
gulp.task('move-versioned-docs-outside-webroot', function(done){
  if (fs.existsSync('../docs/v')) {
    fs.moveSync('../docs/v', '../v', {mkdirp: true});
  }
  done();
});

// copy all the files in /docs to /v/[library-version-number]
gulp.task('build:versioned-docs', function(done) {
  fs.copySync('../docs/', '../v/0.1.0/', {mkdirp: true});
  done();
});

// Move the /v folder back inside the webroot so they're accessible from github pages
gulp.task('move-versioned-docs-inside-webroot', function(done){
  if (fs.existsSync('../v')) {
    fs.moveSync('../v', '../docs/v', {mkdirp: true});
  }
  done();
});
