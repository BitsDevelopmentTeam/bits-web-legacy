window.addEventListener("DOMContentLoaded", function() {
  var ws = new WebSocket("ws://bits.poul.org:8080");
  ws.onmessage = wsMessageHandler;
});
