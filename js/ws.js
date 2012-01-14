(function (exports) {
    "use strict";
    exports.addEventListener("DOMContentLoaded", function () {
        var ws = new exports.WebSocket("ws://bits.poul.org:3389"),
            handler = new exports.Handler(exports.browserHandler);
        ws.onmessage = function (event) {
            handler.webSocket(event);
        };
    });
}(this));
