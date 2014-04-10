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
        this.listenTo(this.model, 'destroy', this.remove);
        this.model.bind("change", this.render, this);

        var imageConnection = window.peer.connect(this.model.get('id'), {
          label: 'image', reliable: true
        });

        var videoConnection = window.peer.connect(this.model.get('id'), {
          label: 'video', reliable: true
        });

        var that = this;
        imageConnection.on('open', function() {
          that.model.set({image: true});
          alertify.success('Conectado');

          this.on('data', function(data){
            console.log(data);
            if (data.constructor === ArrayBuffer) {
              var dataView = new Uint8Array(data);
              var dataBlob = new Blob([dataView]);
              var url = window.URL.createObjectURL(dataBlob);
              $('#image').attr('src', url);
              $('#logs').append('<div>' +
                  imageConnection.peer + ' has sent you an <a target="_blank" href="' + url + '">image</a>.</div>');
            }
          });

          this.on('close', function() {
            alertify.error(imageConnection.peer + ' has left the chat.');
          });

          this.on('error', function(err) { alert(err); });
        });

        videoConnection.on('open', function() {
          that.model.set({video: true});
          alertify.success('Conectado');

          this.on('data', function(data){
            console.log(data);
            if (data.constructor === ArrayBuffer) {
              var dataView = new Uint8Array(data);
              var dataBlob = new Blob([dataView]);
              var url = window.URL.createObjectURL(dataBlob);
              $('#video').attr('src', url);
              $('#logs').append('<div>' +
                  videoConnection.peer + ' has sent you a <a target="_blank" href="' + url + '">video</a>.</div>');
            }
          });

          this.on('close', function() {
            alertify.error(videoConnection.peer + ' has left the chat.');
          });

          this.on('error', function(err) { alert(err); });
        });
      },
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));

        return this;
      }
    });

    return PeerView;
});
