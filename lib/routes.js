"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAPI = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/nimby/status", (req, res) => {
    res.send("hello world");
});
app.post("/nimby/status", (req, res) => {
    res.send("hello world");
});
function initAPI(port = 3000) {
    app.listen(port);
}
exports.initAPI = initAPI;
;
