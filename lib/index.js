"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initNimby = void 0;
const routes_1 = require("./routes");
const mode_1 = require("./mode");
function initNimby() {
    (0, mode_1.initAutoSwitch)();
    (0, routes_1.initAPI)();
}
exports.initNimby = initNimby;
