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
      console.log(socket.id);

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
      console.log(peerUsers);

      socket.broadcast.emit('newPeer', data);
    })

    socket.on('getPeers', function (){
      var peers = _.pluck(peerUsers, 'id');
      console.log(peers);
      socket.emit('peers', peers);
    })
    //!

    var initiatorChannel = '';
    if (!io.isConnected) {
      io.isConnected = true;
    }

    socket.on('new-channel', function (data) {
      console.log('nuevo canal');
      if (!channels[data.channel]) {
        initiatorChannel = data.channel;
      }

      channels[data.channel] = data.channel;
      onNewNamespace(data.channel, data.sender);
    });

    socket.on('presence', function (channel) {
      var isChannelPresent = !! channels[channel];
      socket.emit('presence', isChannelPresent);
    });


  });

function onNewNamespace(channel, sender) {
  io.of('/' + channel).on('connection', function (socket) {
    if (io.isConnected) {
      io.isConnected = false;
      socket.emit('connect', true);
    }

    socket.on('message', function (data) {
      if (data.sender == sender)
        socket.broadcast.emit('message', data.data);
    });
  });
}
};
