(function(global) {

var innerGlobal = this;

/* DOM Selecting initialization */
window.addEventListener("DOMContentLoaded", function() {
  innerGlobal.sede = document.getElementById("sede");
  innerGlobal.sedeValue = sede.querySelector(".value");
  innerGlobal.sedeTimestamp = sede.querySelector(".timestamp");
  innerGlobal.sedeModifiedBy = sede.querySelector(".modified_by");

  innerGlobal.temp = document.getElementById("temp");

  innerGlobal.msg = document.querySelector("#last.msg");
  innerGlobal.msgUser = msg.querySelector(".user");
  innerGlobal.msgTimestamp = msg.querySelector(".timestamp");
  innerGlobal.msgValue = msg.querySelector(".value");
  innerGlobal.first = true;
});
/* Pivot */

/* Handler functions definition */
function statusHandler(status) {
  var value = status.value == "open" ? "open" : "close";
  sedeValue.setAttribute("class",value+" value");
  sedeTimestamp.innerHTML = status.timestamp;
  sedeModifiedBy.innerHTML = status.modifiedby;
}

function msgHandler(msg) {
  /* pass
  msgUser.innerHTML = msg.user;
  msgTimestamp.innerHTML = msg.timestamp;
  msgValue.innerHTML = msg.value;
  */
}

function tempIntHandler(tempInt) {
  temp.innerHTML = tempInt.value.round(1);
  temp.setAttribute("class", tempInt.value > 20 ? "high" : "low" );
}

function hide(elem) {
  elem.setAttribute("style", "display: none");
}

function jsonHandler(json) {
  if(json.status !== undefined) {
    statusHandler(json.status)
  } else if(first) {
    hide(sede);
  }

  if(json.msg !== undefined) {
    msgHandler(json.msg);
  } else if(first) {
    hide(msg);
  }
  
  if(json.tempint !== undefined) {
    tempIntHandler(json.tempint);
  } else if(first) {
    hide(temp);
  }

  if(first) first = false;
}

function dataHandler(data) {
  jsonHandler(JSON.parse(data));
}

function wsMessageHandler(event) {
  dataHandler(event.data.escapeHTML());
}

global.wsMessageHandler = wsMessageHandler;

})(this)

/* You have to read the code bottom-up */
