(function (exports) {
    "use strict";
    // Implements a WS XHR fallback replacement
    var fakeWs = function () {
        var fakeUrl = "http://bits.poul.org/data.json",
            xhr = new exports.XMLHttpRequest(),
            i = 0,
            self = this;

        xhr.open("GET", fakeUrl, true);
        xhr.onreadystatechange = function handler() {
            if (self.onmessage !== undefined) {
                if (xhr.readyState === 4) {
                    self.onmessage({data: xhr.responseText});
                }
            } else {
                i += 1;
                setTimeout(function () {
                    handler();
                }, 100 * i);
            }
        };
        xhr.send();
    };

    function isChrome() {
        return exports.navigator.userAgent.indexOf("Chrome") !== -1;
    }

    function isSafari() {
        return exports.navigator.userAgent.indexOf("AppleWebKit") !== -1;
    }

    if (isSafari() && !isChrome()) {
        exports.WebSocket = fakeWs;
    }

    exports.WebSocket = exports.WebSocket || exports.MozWebSocket || fakeWs;
}(this));
