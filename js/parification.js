(function(global) {

String.prototype.escapeHTML = function() {
  return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

Number.prototype.round = function(dec) {
	return Math.round(this*Math.pow(10,dec))/Math.pow(10,dec);
}

function fakeWs() {
  var self = this;
  var fakeUrl = "http://bits.poul.org:8080";
  var xhr = new XMLHttpRequest;
  xhr.open("GET",fakeUrl,true);
  xhr.onreadystatechange = function() {
    self.onmessage({data: xhr.responseText});
  }
  xhr.send();
}

var callbacks = [];

function fakeAddEventListener(event, callback) {
  if(event == "DOMContentLoaded")
    if(document.onload == undefined) {
      callbacks << callback;
      return document.onload = function(event) {
        for(var i = 0; i<callbacks.length; i++)
          callbacks[i]();
      }
    }

  return document.attachEvent(event,callback);
}

document.addEventListener = document.addEventListener || fakeAddEventListener;

global.WebSocket = global.WebSocket || global.MozWebSocket || fakeWs;
})(this);
