//The build will inline common dependencies into this file.
requirejs.config({
  shim : {
    'underscore': {
      'exports': '_'
    },
    'backbone' : {
      'deps' : ['underscore', 'jquery'],
      'exports' : 'Backbone'
    },
    'bootstrap' : {
      'deps' : ['jquery']
    }
  },
  paths: {
    'jquery'     : '../bower_components/jquery/dist/jquery',
    'underscore' : '../bower_components/underscore/underscore',
    'backbone'   : '../bower_components/backbone/backbone',
    'bootstrap'  : '../bower_components/dist/js/bootstrap',
    'text'       : '../bower_components/requirejs-text/text',
    'socket.io'  : '../bower_components/socket.io-client/dist/socket.io',
    'alertify'   : '../bower_components/alertify/alertify'
  }
});
