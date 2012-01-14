(function (exports) {
    "use strict";
    var sede, sedeValue, sedeTimestamp, sedeModifiedBy,
        temp, tempValue, tempTrend,
        msg, msgTimestamp, msgUser, msgValue,
        head, title, favicon, trend;

    /* HELPERS */

    // Show a DOM hidden element
    function show(elem) {
        elem.setAttribute("style", "display: block");
    }

    // Return a new string capitalized
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Round a number (num) at the first nth decimal (dec)
    function round(num, dec) {
        return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    }

    // Change the favicon icon of the site.
    function changeIcon(status) {
        var link = exports.document.createElement("link");
        head.removeChild(favicon);
        link.href = "img/" + status + ".ico";
        link.rel = "shortcut icon";
        head.appendChild(link);
        favicon = link;
    }

    // the Trend object contains an old state off the value defined
    //  - newValue
    //      add a new state to the _oldValue_  state and 
    //      assign the difference between the new state and the
    //      old value to the _diff_ state.
    //
    //  - toString
    //      Respond to the toString message, transorm the object in an intelligible form.
    //      In this case the trend arcs.
    function Trend() {
        this.oldValue = undefined;
        this.diff = 0;
    }

    Trend.prototype.newValue = function (value) {
        if (this.oldValue !== undefined) {
            this.diff = value - this.oldValue;
        }
        this.oldValue = value;

        return this;
    };

    Trend.prototype.toString = function () {
        if (this.diff === 0) {
            return "→";
        } else if (this.diff > 0) {
            return "↗";
        } else {
            return "↘";
        }
    };

    /* END HELPERS */


    /* DOM Selecting initialization */
    exports.addEvent(exports.window, "load", function () {
        sede = exports.document.getElementById("sede");
        sedeValue = sede.querySelector(".value");
        sedeTimestamp = sede.querySelector(".timestamp");
        sedeModifiedBy = sede.querySelector(".modified_by");
        temp = exports.document.getElementById("temp");
        tempValue = temp.querySelector(".value");
        tempTrend = temp.querySelector(".trend");
        msg = exports.document.querySelector("#last.msg");
        msgUser = msg.querySelector(".user");
        msgTimestamp = msg.querySelector(".timestamp");
        msgValue = msg.querySelector(".value");
        title = exports.document.title;
        favicon = exports.document.querySelector('[rel="icon"]');
        head = exports.document.head || exports.document.getElementsByTagName('head')[0];
        trend = new Trend();
    });

    /* Handler functions definition */
    // Handle BITS status change.
    function statusHandler(status, first) {
        if (first) {
            show(sede);
        }
        var value = status.value === "open" ? "open" : "close";
        changeIcon(value);
        title = capitalize(value) + " " + title;
        sedeValue.setAttribute("class", value + " value");
        sedeTimestamp.innerHTML = status.timestamp;
        sedeModifiedBy.innerHTML = status.modifiedby;
    }

    // Handle MSGs arrival (somewhere in the future)
    function msgHandler(msg, first) {
        /* pass
        if(first) show(msg);
        msgUser.innerHTML = msg.user;
        msgTimestamp.innerHTML = msg.timestamp;
        msgValue.innerHTML = msg.value;
        */
    }

    // Handle tempInt arrival
    function tempIntHandler(tempInt, first) {
        if (first) {
            show(temp);
        }
        tempValue.innerHTML = round(tempInt.value, 1) + "°C";
        tempTrend.innerHTML = trend.newValue(tempInt);
        temp.setAttribute("class", tempInt.value > 20 ? "high" : "low");
    }

    // Exports only the browserHandler object in the global scope
    exports.browserHandler = {
        status: statusHandler,
        msg: msgHandler,
        tempInt: tempIntHandler
    };
}(this));
