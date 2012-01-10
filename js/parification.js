(function(global) {

// Implements a WS XHR fallback replacement
function fakeWs() {
  var self = this;
  var fakeUrl = "http://bits.poul.org/data.json";
  var xhr = new XMLHttpRequest;
  xhr.open("GET",fakeUrl,true);
  xhr.onreadystatechange = function() {
    self["onmessage"]({data: xhr.responseText});
  }
  xhr.send();
}

if(document.attachEvent !== undefined)
  document.addEventListener = document.attachEvent;

global.WebSocket = global.WebSocket || global.MozWebSocket || fakeWs;

})(this);
