'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config');

/**
 * Express configuration
 */
module.exports = function(app) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    //app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.errorHandler());
  });

  app.use(express.static(path.join(config.root, 'app')));
  app.set('views', config.root + '/app/views');

  app.configure(function(){
    app.set('port', config.port);
    app.set('view engine', 'ejs');
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());

    app.use(express.cookieParser());
    //app.use(express.cookieSession());

    app.use(app.router);
  });
};
