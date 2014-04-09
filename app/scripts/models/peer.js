define(["backbone"], function(Backbone) {

    var PeerModel = Backbone.Model.extend({
      initialize: function(){

      },
      defaults: {
        image: false,
        video: false
      }
    });

    return PeerModel;
});
