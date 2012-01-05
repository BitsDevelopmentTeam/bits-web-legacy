(function(exports) {

var global = this;

/* DOM Selecting initialization */
window.addEventListener("DOMContentLoaded", function() {
  global.sede = document.getElementById("sede");
  global.sedeValue = sede.querySelector(".value");
  global.sedeTimestamp = sede.querySelector(".timestamp");
  global.sedeModifiedBy = sede.querySelector(".modified_by");

  global.temp = document.getElementById("temp");

  global.msg = document.querySelector("#last.msg");
  global.msgUser = msg.querySelector(".user");
  global.msgTimestamp = msg.querySelector(".timestamp");
  global.msgValue = msg.querySelector(".value");
});
/* Pivot */

/* Handler functions definition */
function statusHandler(status,first) {
  if(first) show(sede);
  var value = status.value == "open" ? "open" : "close";
  sedeValue.setAttribute("class",value+" value");
  sedeTimestamp.innerHTML = status.timestamp;
  sedeModifiedBy.innerHTML = status.modifiedby;
}

function msgHandler(msg,first) {
  /* pass
  if(first) show(msg);
  msgUser.innerHTML = msg.user;
  msgTimestamp.innerHTML = msg.timestamp;
  msgValue.innerHTML = msg.value;
  */
}

function tempIntHandler(tempInt,first) {
  if(first) show(temp);
  temp.innerHTML = round(tempInt.value,1);
  temp.setAttribute("class", tempInt.value > 20 ? "high" : "low" );
}

function show(elem) {
  elem.setAttribute("style", "display: block");
}

function round(num, dec) {
	return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
}

exports.browserHandler = {
  status: statusHandler,
  msg: msgHandler,
  tempInt: tempIntHandler
}

})(this)
