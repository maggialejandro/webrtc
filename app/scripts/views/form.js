define([
  "backbone",
  "underscore",
  "text!templates/form.html"
  ], function(Backbone, _, formTemplate) {

    var FormView = Backbone.View.extend({
      initialize: function(){
        this.template = _.template(formTemplate);

        return this;
      },
      render: function(){
        this.$el.html(this.template());

        return this;
      }
    });

    return FormView;
});
