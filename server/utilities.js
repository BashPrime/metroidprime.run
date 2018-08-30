"use strict";
exports.__esModule = true;
var fs_extra_1 = require("fs-extra");
var path = require("path");
var Utilities = /** @class */ (function () {
    function Utilities() {
    }
    Utilities.generateConfig = function () {
        try {
            fs_extra_1.copySync(path.resolve(__dirname, './resources/example-config.js'), './config.js');
            console.log('Generated config.js in application root directory.');
        }
        catch (err) {
            console.error(err);
        }
    };
    return Utilities;
}());
exports.Utilities = Utilities;
