(function(global) {

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

if(document.addEventListener === undefined)
  location.href = "http://nyan.cat/"

global.WebSocket = global.WebSocket || global.MozWebSocket || fakeWs;

})(this);
