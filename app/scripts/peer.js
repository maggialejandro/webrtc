//Load common code that includes config, then load the app logic for this page.
require(['common'], function (common) {
    require(['routers/peer'], function(PeerRouter){
      window.router = new PeerRouter();
    });
});
