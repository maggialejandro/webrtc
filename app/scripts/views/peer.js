define([
  "backbone",
  "underscore",
  "text!templates/peer.html",
  "alertify"
  ], function(Backbone, _, peerTemplate, alertify) {

    var PeerView = Backbone.View.extend({
      tagName: 'tr',
      initialize: function(){
        this.template = _.template(peerTemplate);

        var connection = window.peer.connect(this.model.get('id'), {
          label: 'file', reliable: true
        });

        var that = this;
        connection.on('open', function() {
          console.log('open');
          that.model.set({connected: true});
          alertify.success('Conectado');
        });

        connection.on('close', function() {
          alertify.error(connection.peer + ' has left the chat.');
        });

        connection.on('error', function(err) { alert(err); });

        connection.on('data', function(data){
          console.log(data);
          if (data.constructor === ArrayBuffer) {
            console.log('data');
            var dataView = new Uint8Array(data);
            console.log(dataView);
            var dataBlob = new Blob([dataView]);
            var url = window.URL.createObjectURL(dataBlob);
            $('#image').attr('src', url);
            $('#logs').append('<div>' +
                connection.peer + ' has sent you a <a target="_blank" href="' + url + '">file</a>.</div>');
          }
        })

        this.listenTo(this.model, 'destroy', this.remove);
      },
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));

        return this;
      }
    });

    return PeerView;
});
