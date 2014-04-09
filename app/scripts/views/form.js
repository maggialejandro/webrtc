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

        if(!file) return alertify.error('Seleccione una imagen');
        this.loadImage(file);

        App.collections.peers.each(function(peer){
          var conns = window.peer.connections[peer.get('id')];
          for (var i = 0, ii = conns.length; i < ii; i += 1) {
            var conn = conns[i];
            conn.send(file);
          }
        })
      },
      loadImage: function(file){
        var reader = new FileReader();

        var imgtag = document.getElementById("image");
        imgtag.title = file.name;

        reader.onload = function(event) {
          imgtag.src = event.target.result;
        };

        reader.readAsDataURL(file);
      }
    });

    return FormView;
});
