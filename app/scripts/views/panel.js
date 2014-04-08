define([
  "backbone",
  "underscore",
  "text!templates/panel.html",
  "collections/peers"
  ], function(Backbone, _, panelTemplate, PeerList) {

    var PanelView = Backbone.View.extend({
      initialize: function(){
        this.template = _.template(panelTemplate);
        App.collections.peers = new PeerList();

        this.listenTo(App.collections.peers, 'add', this.addPeer);
        this.listenTo(App.collections.peers, 'remove', this.removePeer);

        return this;
      },
      render: function(){
        this.$el.html(this.template({
          peers: App.collections.peers.toJSON()
        }))

        return this;
      },
      addPeer: function(model){
        var that = this;
        require(["views/peer"], function (PeerView) {
          var view = new PeerView({model : model});
          that.$('#users').append(view.render().el);
        });
      },
      removePeer: function(model){
        model.trigger('destroy', model, model.collection);
      }
    });

    return PanelView;
})
;
