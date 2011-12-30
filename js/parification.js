function WS(url, handler) {
  if (window.MozWebSocket !== undefined) {
    var WebSocket = MozWebSocket;
  }
  if(window.WebSocket !== undefined) {
    new WebSocket(url);
    ws.onmessage = function(event) {
      handler(event.data);
    }
    return ws;
  }
  return null;
}
