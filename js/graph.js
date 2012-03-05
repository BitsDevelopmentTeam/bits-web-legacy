/**
 * @overview this is a module that exports a simplified interface to Bluff graph library 
 *
 * @author Andrea Brancaleoni
 * @version 2012/03/04
 * 
 */

module("graph", function(require, exports) {
    "use strict";

    var bluff = require("Bluff"),
        util  = require("util"),
        debug = require("debug");

    function dataFromHash(hash) {
        return hash["value"];
    }

    function labelFromHash(hash) {
        return hash["timestamp"];
    }

    function dataFromArray(ary, convertFunc) {
        var i, len, nary = [];

        for (i = 0, len = ary.length; i < len; i += 1) {
            nary[i] = convertFunc(ary[i]);
        }

        return nary;
    }

    function Temp(element, initial_data) {
        debug.log("Temp graph object created with data", initial_data);
        bluff.Line.call(this, element);

        this._temp_data = dataFromArray(initial_data, dataFromHash);
        this._temp_label = dataFromArray(initial_data, labelFromHash);

        this.theme_odeo();

        this.update();
    }
    util.inherits(Graph, Bluff.Line);
    exports.Temp = Temp;

    Temp.prototype.addTemp = function(temp) {
        debug.log("Graph, new temperature added", temp);
        this._temp_label.push(labelFromHash(temp));
        this._temp_data.push(dataFromHash(temp));
        this.update();
    };

    Temp.prototype.update = function() {
        debug.log("Graph, updating Temp graph");
        this.data("temp", this._temp_data);
        this.labels = this._temp_data;
        this.draw();
    };

    function Stub() {
        debug.log("Stub graph object created");
    }
    exports.Stub = Stub;

    Stub.prototype.addTemp = function() {
        debug.log.apply(this, arguments);
    };
});
