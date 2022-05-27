"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startNimby = exports.getBladeStatus = exports.setNimbyStatus = exports.currentStatus = void 0;
const logger_1 = require("./logger");
const axios_1 = __importDefault(require("axios"));
const config_json_1 = __importDefault(require("./config.json"));
exports.currentStatus = {
    value: true,
    mode: "auto",
    logged: false,
    usage: { type: "none" },
};
function setNimbyStatus(newStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.logger.info(`[NIMBY] Setting Nimby value to ${newStatus}`);
        Object.assign(exports.currentStatus, newStatus);
        yield axios_1.default.get(`${config_json_1.default.nimby.bladeURL}/blade/ctrl?nimby=${exports.currentStatus.value ? 1 : 0}`);
    });
}
exports.setNimbyStatus = setNimbyStatus;
function getBladeStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield axios_1.default.get(`${config_json_1.default.nimby.bladeURL}/blade/status`);
        response.data.nimbyON = response.data.nimby !== "None";
        return response;
    });
}
exports.getBladeStatus = getBladeStatus;
function startNimby() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.startNimby = startNimby;
