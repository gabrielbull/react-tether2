'use strict';

var fs = require('fs');
var gulp = require('gulp');
var git = require('gulp-git');
var rimraf = require('rimraf');
var Promise = require('bluebird');
var replace = require('gulp-replace');

var cloneReactTether2 = function () {
  return new Promise((resolve) => {
    git.clone('https://github.com/gabrielbull/react-tether2.git', function (err) {
      resolve();
    });
  });
};

var removeReactTether2 = function () {
  return new Promise((resolve) => {
    rimraf.sync('react-tether2');
    resolve();
  });
};

var removeExamples = function () {
  return new Promise((resolve) => {
    rimraf.sync('examples');
    resolve();
  });
};

var removePlayground = function () {
  return new Promise((resolve) => {
    rimraf.sync('playground');
    resolve();
  });
};

var copyExamples = function () {
  return new Promise((resolve) => {
    gulp.src('./react-tether2/examples/**/*')
      .pipe(gulp.dest('./examples/'))
      .on('end', resolve);
  });
};

var copyPlayground = function () {
  return new Promise((resolve) => {
    gulp.src('./react-tether2/playground/**/*')
      .pipe(gulp.dest('./playground/'))
      .on('end', resolve);
  });
};

gulp.task('copy-playground', function (cb) {
  removeReactTether2()
    .then(removeExamples)
    .then(removePlayground)
    .then(cloneReactTether2)
    .then(copyExamples)
    .then(copyPlayground)
    .then(removeReactTether2)
    .then(cb);
});
