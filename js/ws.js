window.addEventListener("DOMContentLoaded", function() {
  var ws = new WebSocket("ws://bits.poul.org:8080");
  var handler = new Handler(browserHandler);
  ws.onmessage = function(event) { handler.webSocket(event); };
});
