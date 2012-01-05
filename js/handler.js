(function(exports) {

function Handler(diffHandler) {
  this.data = "";
  this.diffHandler = diffHandler;
  this.firstHandle = true;
}

Handler.prototype.webSocket = function(event) {
  this.data = Handler.escapeHTML(event.data);
  this.handle();
}

Handler.prototype.handle = function() {
  this.jsonHandler();
}

Handler.prototype.jsonHandler = function() {
  var json = JSON.parse(this.data);
  if(json.status !== undefined) {
    this.diffHandler.status(json.status, this.firstHandle);
  }

  if(json.msg !== undefined) {
    this.diffHandler.msg(json.msg, this.firstHandle);
  }
  
  if(json.tempint !== undefined) {
    this.diffHandler.tempInt(json.tempint, this.firstHandle);
  }

  if(this.firstHandle) this.firstHandle = false;
}

Handler.escapeHTML = function(string) {
  return string.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

exports.Handler = Handler;

})(this)

/* You have to read the code bottom-up */
