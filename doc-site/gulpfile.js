const gulp = require('esds-build');
const fs = require('fs-extra');
const del = require('del');
const path = require('path');
const tap = require('gulp-tap');
const slash = require('slash');
const execSync = require('child_process').execSync;
const spiritProjectData = require(`${process.cwd()}/node_modules/@jdrfhq/spirit/package.json`);

gulp.task('deploy-to-gh-pages', function(done){
  // Remove the /tmp directory if it already exists
  if (fs.existsSync('../tmp')) {
    del.sync(['../tmp'], {force: true});
  }

  // Clone the gh-pages branch into the /tmp directory
  execSync('git clone --single-branch -b gh-pages git@github.com:JDRF/spirit.git ../tmp');

  // Build the latest release into the /docs directory
  execSync('gulp build-release');

  // Rsync /docs into /tmp
  execSync('rsync -a ../docs/ ../tmp/');

  // Commit the changes to the gh-pages repo in tmp
  execSync('cd ../tmp && git add --all && git commit -m "Deploy release to gh-pages branch" && git push');

  // Remove /tmp directory
  del.sync(['../tmp'], {force: true});
  done();
});

gulp.task('build-release', gulp.series('build:all', 'relativize-webroot-paths', 'build-versioned-docs'));

// copy all the files in /docs to /docs/v/[spirit-version-number]
gulp.task('build-versioned-docs', function(done) {
  fs.copySync('../docs/', `../docs/v/${spiritProjectData.version}/`, {mkdirp: true});
  done();
});

gulp.task('write-spirit-project-data-to-json', function(done){
  fs.mkdirpSync('data');
  fs.writeFileSync('data/spirit_project_data.json', JSON.stringify(spiritProjectData));
  done();
});

gulp.task('esds-hook:pre:build:all', gulp.series('write-spirit-project-data-to-json'));

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
