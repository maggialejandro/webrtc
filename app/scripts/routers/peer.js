define(function (require, exports, module) {

  "use strict";

  var $          = require("jquery"),
      Backbone   = require("backbone"),
      io         = require("socket.io"),
      _          = require("underscore");

  var PanelView  = require("views/panel"),
      FormView   = require("views/form"),
      PeerModel  = require("models/peer");

  var PeerRouter = Backbone.Router.extend( {
      initialize: function() {
        window.socket = io.connect('http://192.168.0.2:9001');
        this.uuid = (Math.round(Math.random() * 999999999) + 999999999);
        window.peer = new Peer(this.uuid, {
          key: 'mut74vbg60vk7qfr',
          debug: 3
        });

        peer.on('open', function(id){
          $('#me').html('My Peer ID: <strong>'+id+'</strong>');
        });

        var that = this;

        $('#panel').html(new PanelView().render().el);
        $('#form').html(new FormView().render().el);

        window.socket.emit('getPeers');

        window.socket.on('peers', function(peers){
          _.each(peers, function(id){
            var peerModel = new PeerModel();
            peerModel.set({id: id});
            App.collections.peers.add(peerModel);
          });

          window.socket.emit('newPeer', {id: that.uuid});
        });

        window.socket.on('newPeer', function(data){
          if(data.id == that.uuid) return;

          var peerModel = new PeerModel();
          peerModel.set({id: data.id});
          App.collections.peers.add(peerModel);
        });

        window.socket.on('peerLeft', function(data){
          var model = App.collections.peers.findWhere({id: data.id});
          App.collections.peers.remove(model);
        })

      },
      routes: {
        "" : "home",
      },
      home: function() {
        var that = this;

        require(["views/home"], function (HomeView) {

        });
      }

  });

  return PeerRouter;

});
