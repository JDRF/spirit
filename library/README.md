# Spirit Design System - Library

## Install global dependencies
To run this project locally:
* [Install Node](https://nodejs.org/en/) version 8 or higher (Download and install)
* Uninstall any globally installed version of gulp `npm uninstall gulp -g` - you can run this from the command line anywhere
* Install gulp-cli globally `npm install gulp-cli -g` - you can run this from the command line anywhere

## Install project dependencies
* Clone this repository: `git clone git@github.com:JDRF/spirit.git` OR `git clone https://github.com/JDRF/spirit.git`
* Navigate to the `library` directory `cd /path/to/where/you/cloned/spirit/library`
* From `/library` run `npm install`

## Running the local environment
* From `/library` run `gulp`

### Browsersync options
A browser window should pop open with the main page of the `/library` project running. The local environment runs on [Browsersync](https://www.browsersync.io) and offers configuration options on a separate port from the environment. If the local environment launches at: `http://localhost:3000`, then the Browsersync config will be available at `http://localhost:3001`

## Stopping the local environment
Hold `ctrl + C` at the same time from the command line to stop the local environment. Run `gulp` to start it up again. 

## Creating a new component
With the environment stopped, run `gulp generate:new-component` and follow the prompts to generate basic template files for building a new component's markup, styles, javascript, and test page.

## Additional Resources
* Component markup and test pages are built using [Nunjucks templates](https://mozilla.github.io/nunjucks/templating.html)
* Styles are built with [SCSS](https://sass-lang.com)
* The build environment is called [ESDS-Build](https://github.com/EightShapes/esds-build#project-structure). There is some light documentation available at that project's README that outlines what each top-level directory is for.
