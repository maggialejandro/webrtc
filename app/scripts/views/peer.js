define(["backbone", "underscore", "text!templates/peer.html"], function(Backbone, _, peerTemplate) {

    var PeerView = Backbone.View.extend({
      tagName: 'tr',
      initialize: function(){
        this.template = _.template(peerTemplate);

        this.listenTo(this.model, 'destroy', this.remove);
      },
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      }
    });

    return PeerView;
});
