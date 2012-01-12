addEvent(window,"load",function() {
  var ws = new WebSocket("ws://bits.poul.org:3389");
  // Handle Safari && old chromium madness
  ws.onclose = function() { 
    ws = new fakeWs();
  }
  var handler = new Handler(browserHandler);
  ws.onmessage = function(event) { handler.webSocket(event); };
});
