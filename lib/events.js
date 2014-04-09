'use strict';
var _ = require("lodash");

/**
 * Application Events
 */
 module.exports = function(app, io) {
  var peerUsers = [];

  io.sockets.on('connection', function (socket) {
    console.log('connection!');
    //PeerJS Server
    socket.on('disconnect', function () {
      console.log('disconnect!');

      for (var i = 0; i < peerUsers.length; i++) {
        if(peerUsers[i] && peerUsers[i].socket_id == socket.id){
          var id = peerUsers[i].id;
          peerUsers.splice(i, 1);
          socket.broadcast.emit('peerLeft', {id: id})
          continue;
        }
      }
    });

    socket.on('newPeer', function (data){
      var peer = {
        id: data.id,
        socket_id: socket.id
      }

      peerUsers.push(peer);
      socket.broadcast.emit('newPeer', data);
    })

    socket.on('getPeers', function (){
      var peers = _.pluck(peerUsers, 'id');
      socket.emit('peers', peers);
    })
  });

};
