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

global.addEvent = function(obj,event,callback) {
  if(obj.addEventListener !== undefined) {
    obj.addEventListener(event,callback);
  } else if (obj.attachEvent !== undefined) {
    obj.attachEvent(event,callback);
  }
}

if(document.attachEvent !== undefined)
  document.addEventListener = document.attachEvent;

global.WebSocket = global.WebSocket || global.MozWebSocket || fakeWs;
global.fakeWs = fakeWs;

})(this);
