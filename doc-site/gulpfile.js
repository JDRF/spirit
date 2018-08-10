const gulp = require('esds-build');
const fs = require('fs-extra');
const path = require('path');
const tap = require('gulp-tap');
const slash = require('slash');
const spiritProjectData = require(`${process.cwd()}/node_modules/@jdrfhq/spirit/package.json`);

gulp.task('write-spirit-project-data-to-json', function(done){
  fs.mkdirpSync('data');
  fs.writeFileSync('data/spirit_project_data.json', JSON.stringify(spiritProjectData));
  done();
});

gulp.task('esds-hook:pre:build:all', gulp.series('write-spirit-project-data-to-json'));


gulp.task('build-release', gulp.series('move-versioned-docs-outside-webroot', 'build:all', 'relativize-webroot-paths', 'build-versioned-docs', 'move-versioned-docs-inside-webroot'));

// Move the /v folder outside of webroot so it doesn't get deleted when the project gets rebuilt
gulp.task('move-versioned-docs-outside-webroot', function(done){
  if (fs.existsSync('../docs/v')) {
    fs.moveSync('../docs/v', '../v', {mkdirp: true});
  }
  done();
});

// copy all the files in /docs to /v/[spirit-version-number]
gulp.task('build-versioned-docs', function(done) {
  fs.copySync('../docs/', `../v/${spiritProjectData.version}/`, {mkdirp: true});
  done();
});

// Move the /v folder back inside the webroot so they're accessible from github pages
gulp.task('move-versioned-docs-inside-webroot', function(done){
  if (fs.existsSync('../v')) {
    fs.moveSync('../v', '../docs/v', {mkdirp: true});
  }
  done();
});


function compute (from, to) {
  return (slash(path.relative(path.dirname(from), to)) || '.') + '/';
}

function relativizeCSS (source, relativeRoot) {
  return source.replace(/(url\(['"]?)\/(?!\/)/g, "$1" + relativeRoot);
}

function relativizeHTML (source, relativeRoot) {
  return source
    .replace(/(href=["'])\/(?!\/)/g, '$1' + relativeRoot)
    .replace(/(poster=["'])\/(?!\/)/g, '$1' + relativeRoot)
    .replace(/(src=["'])\/(?!\/)/g, '$1' + relativeRoot)
    .replace(/(srcset=["'])\/(?!\/)/g, '$1' + relativeRoot)
    .replace(/(assetpath=["'])\/(?!\/)/g, '$1' + relativeRoot)
    .replace(/(url=["'])\/(?!\/)/g, '$1' + relativeRoot)
    .replace(/(url\(['"]?)\/(?!\/)/g, "$1" + relativeRoot)
    .replace(/(content=["']0;url=)\/(?!\/)/g, "$1" + relativeRoot);
}

gulp.task('relativize-webroot-paths', function(){
  return gulp.src([`../docs/**/*.css`, `../docs/**/*.html`])
  .pipe(tap(function(file, t){
    var filepath = file.path + '';
          var relativeRoot = compute(filepath, '../docs'),
              extension = path.extname(filepath),
              filter, contents;

      switch (extension) {
        case '.css': filter = relativizeCSS; break;
        case '.html': filter = relativizeHTML; break;
      }

      contents = fs.readFileSync(filepath, 'UTF-8');
      contents = filter(contents, relativeRoot);
      fs.writeFileSync(filepath, contents);
      console.log(`Relativized ${filepath}`);
  }));
});
