window.addEventListener("DOMContentLoaded", function() {
  var sede = document.getElementById("sede");
  var sedeValue = sede.querySelector(".value");
  var sedeTimestamp = sede.querySelector(".timestamp");
  var first = true;

  var ws = WS("ws://bits.poul.org:8080",function(data) {
    if(first) {
      first = false;
    } else {
      var now = new Date();
      sedeValue.setAttribute("class",data+" value");
      sedeTimestamp.innerHTML = now.strftime("%Y-%m-%d %H:%M:%S");
    }
  });

  if(ws !== null) {
    console.log("Your browser doesn't support WS!");
  }
});
