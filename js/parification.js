(function(global) {

// Implements a WS XHR fallback replacement
function fakeWs() {
  var self = this;
  var fakeUrl = "http://bits.poul.org/data.json";
  var xhr = new XMLHttpRequest;
  xhr.open("GET",fakeUrl,true);
  xhr.onreadystatechange = function() {
    if(self.onmessage != undefined) {
      if(xhr.readyStatus === 4) {
        self.onmessage({data: xhr.responseText});
      }
    } else {
      setTimeout(function() {xhr.onreadystatechange()},100);
    }
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

function isChrome() {
  if(var match = navigator.userAgent.match(/Chrome\/(\w+)/)) {
    this.version = new Number(match[1]);
    return this;
  }
}

function isSafari() {
  return navigator.userAgent.match(/Safari/);
}

if( isSafari() !== false ) {
  var chr = isChrome();
  if(chr !== false) {
    //is Chrome
    if(chr.version <= 13 && >= 4) {
      // && the version is between 13 and 4
      global.WebSocket = fakeWs;
    }
  } else {
    // is Safari
    global.WebSocket = fakeWs;
  }
}

global.WebSocket = global.WebSocket || global.MozWebSocket || fakeWs;

})(this);
