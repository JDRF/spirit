# Spirit Design System
This repository contains two projects:
* [library](https://github.com/JDRF/spirit/tree/master/library) - the UI components that are distributed as an NPM package, and the test pages for each component
* [doc-site](https://github.com/JDRF/spirit/tree/master/doc-site) - the public-facing documentation site 

Refer to the README for each project for information on how to run the projects locally.

## Install Project Dependencies
Clone the Spirit repo git clone git@github.com:JDRF/spirit.git

### Library
To run the library run the following.

At the top level of the spirit, go into the `spirit/library` folder and run the following commands: 
```sh
npm install
gulp          # to run the local environment
```

### Doc-site
To run the doc-site run the following.

At the top level of the spirit, go into `spirit/doc-site` folder and run the following commands: 
```sh
npm run unlink-local-library
npm run link-local-library
gulp                          # to run the local environment
