var fs = require('fs');
var _ = require('lodash');

module.exports = function(grunt) {
  
  var config = {
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*-test.js']
      }
    }
  };

  grunt.initConfig(config);
  
  var npmTasks = [
  'grunt-contrib-jasmine', 
  'grunt-contrib-clean', 
  'grunt-mocha-test', 
  'grunt-jsbeautifier'];

  for (var i = 0; i < npmTasks.length; i++) {
    t = npmTasks[i];
    grunt.loadNpmTasks(t);
  }
  
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['test']);
};