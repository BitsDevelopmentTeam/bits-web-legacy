(function(exports) {

var global = this;

/* DOM Selecting initialization */
window.onload = function() {
  global.sede = document.getElementById("sede");
  //Commented line for gay browsers compatibility
  //global.sedeValue = sede.querySelector(".value");
  global.sedeValue = sede.firstChild;
  //global.sedeTimestamp = sede.querySelector(".timestamp");
  global.sedeTimestamp = sede.children[1];
  //global.sedeModifiedBy = sede.querySelector(".modified_by");
  global.sedeModifiedBy = sede.children[2];

  global.temp = document.getElementById("temp");
  //global.tempValue = temp.querySelector(".value");
  global.tempValue = temp.firstChild;
  //global.tempTrend = temp.querySelector(".trend");
  global.tempTrend = temp.children[1];

  //global.msg = document.querySelector("#last.msg");
  global.msg = document.getElementById("last");
  //global.msgUser = msg.querySelector(".user");
  global.msgUser = msg.firstChild;
  //global.msgTimestamp = msg.querySelector(".timestamp");
  global.msgTimestamp = msg.children[1];
  //global.msgValue = msg.querySelector(".value");
  global.msgValue = msg.children[2];

  global.title = document.title;
  //global.favicon = document.querySelector('[rel="icon"]');
  global.favicon = document.getElementById("favicon");
  global.head = document.head || document.getElementsByTagName('head')[0];
  global.trend = new Trend();
}
/* Pivot */

/* Handler functions definition */
function statusHandler(status,first) {
  if(first) show(sede);
  var value = status.value == "open" ? "open" : "close";
  changeIcon(value);
  document.title = capitalize(value)+" "+title;
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
  tempValue.innerHTML = round(tempInt.value,1)+"°C";
  tempTrend.innerHTML = trend.newValue(tempInt);
  temp.setAttribute("class", tempInt.value > 20 ? "high" : "low" );
}

/* HELPERS */

function show(elem) {
  elem.setAttribute("style", "display: block");
}

function capitalize(string) {
  return string.charAt(0).toUpperCase()+string.slice(1);
}

function round(num, dec) {
	return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
}

function changeIcon(status) {
  var link = document.createElement("link");
  head.removeChild(favicon);
  link.href = "img/" + status + ".ico";
  link.rel = "shortcut icon";
  head.appendChild(link);
  favicon = link;
}

function Trend() {
  this.oldValue = undefined;
  this.diff = 0;
}

Trend.prototype.newValue = function (value) {
  if(this.oldValue !== undefined) {
    this.diff = temp-this.oldValue;
  }
  this.oldValue = temp;

  return this;
}

Trend.prototype.toString = function() {
  if (this.diff == 0) {
    return "→";
  } else if (this.diff > 0) {
    return "↗";
  } else {
    return "↘";
  }
}

/* END HELPERS */

exports.browserHandler = {
  status: statusHandler,
  msg: msgHandler,
  tempInt: tempIntHandler
}

})(this)
