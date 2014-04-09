'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>',
        app: 'Firefox'
      }
    },
    express: {
      options: {
        port: process.env.PORT || 9001
      },
      dev: {
        options: {
          script: 'server.js',
          debug: true
        }
      }
    },
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
      },
      gruntfile: {
        files: [ 'Gruntfile.js'],
        options: {
          reload: true
        }
      },
      html: {
        files: [
          '<%= yeoman.app %>/{,*//*}*.{html,jade,ejs}',
          '<%= yeoman.app %>/styles/{,*//*}*.css',
          '<%= yeoman.app %>/scripts/{,*//*}*.js'
        ],
        options: {
          livereload: true
        }
      }
    },

  });

  grunt.registerTask('dev', [
    'express:dev',
    'open',
    'watch'
  ]);

};
