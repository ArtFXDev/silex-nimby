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
exports.initAutoSwitch = exports.toggleNimbyMode = exports.setNimbyMode = exports.selectedMode = void 0;
const logger_1 = require("./logger");
const config_json_1 = __importDefault(require("./config.json"));
const manualMode_1 = __importDefault(require("./modes/manualMode"));
const autoMode_1 = __importDefault(require("./modes/autoMode"));
const nimby_1 = require("./nimby");
exports.selectedMode = autoMode_1.default;
function setNimbyMode(mode) {
    return __awaiter(this, void 0, void 0, function* () {
        if (exports.selectedMode === mode) {
            return;
        }
        yield exports.selectedMode.close();
        exports.selectedMode = mode;
        yield exports.selectedMode.init();
    });
}
exports.setNimbyMode = setNimbyMode;
function toggleNimbyMode() {
    return __awaiter(this, void 0, void 0, function* () {
        if (exports.selectedMode === autoMode_1.default) {
            yield setNimbyMode(manualMode_1.default);
        }
        else {
            yield setNimbyMode(autoMode_1.default);
        }
    });
}
exports.toggleNimbyMode = toggleNimbyMode;
// Nimby will force the auto mode every night
function checkAutoMode() {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.logger.debug("[NIMBY] Checking for auto mode...");
        const hour = new Date().getHours();
        const timeRange = hour >= config_json_1.default.nimby.daynight.startHour ||
            hour <= config_json_1.default.nimby.daynight.endHour;
        if (exports.selectedMode !== autoMode_1.default && timeRange && !nimby_1.currentStatus.logged) {
            logger_1.logger.debug(`[NIMBY] Auto mode activation because of ${hour}h`);
            yield setNimbyMode(autoMode_1.default);
        }
    });
}
function initAutoSwitch() {
    setInterval(checkAutoMode, config_json_1.default.nimby.autoMode.switchCheckInterval * 1000);
}
exports.initAutoSwitch = initAutoSwitch;
