define(["backbone"], function(Backbone) {

    var PeerModel = Backbone.Model.extend({
      initialize: function(){

      },
      defaults: {
        connected: false
      }
    });

    return PeerModel;
});
