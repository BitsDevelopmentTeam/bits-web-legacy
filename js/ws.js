addEvent(window,"load",function() {
  var ws = new WebSocket("ws://bits.poul.org:3389");
  var handler = new Handler(browserHandler);
  ws.onmessage = function(event) { handler.webSocket(event); };
});
