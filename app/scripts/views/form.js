define([
  "backbone",
  "underscore",
  "text!templates/form.html",
  "alertify"
  ], function(Backbone, _, formTemplate, alertify) {

    var FormView = Backbone.View.extend({
      events: {
        'submit form' : 'enviar'
      },
      initialize: function(){
        this.template = _.template(formTemplate);

        return this;
      },
      render: function(){
        this.$el.html(this.template());

        return this;
      },
      enviar: function(e){
        e.preventDefault();
        var file = this.$('input[type="file"]')[0].files[0];

        if(!file) return alertify.error('Seleccione una imagen o video');
        var type = file.type.split("/")[0];
        var format = file.type.split("/")[1];
        console.log(format);

        if(type == 'image'){
          //chequear formato
          this.loadImage(file);
        }else if(type == 'video'){
          if(format != 'mp4' && format != 'ogg' && format != 'webm')
            return alertify.error('Wrong format (use: mp4, ogg or webm)');

          this.loadVideo(file);
        }else{
          return alertify.error('Wrong file type')
        }

        App.collections.peers.each(function(peer){
          var conns = window.peer.connections[peer.get('id')];
          for (var i = 0, ii = conns.length; i < ii; i += 1) {
            var conn = conns[i];
            if (conn.label === type)
              conn.send(file);
          }
        })
      },
      loadImage: function(file){
        var reader = new FileReader();

        var imageTag = document.getElementById("image");
        imageTag.title = file.name;

        reader.onload = function(event) {
          imageTag.src = event.target.result;
        };

        reader.readAsDataURL(file);
      },
      loadVideo: function(file){
        var reader = new FileReader();

        var videoTag = document.getElementById("video");
        videoTag.title = file.name;

        reader.onload = function(event) {
          videoTag.src = event.target.result;
        };

        reader.readAsDataURL(file);
      }
    });

    return FormView;
});
