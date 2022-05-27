"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AutoMode = void 0;
const nimbyMode_1 = __importDefault(require("./nimbyMode"));
const config_json_1 = __importDefault(require("../config.json"));
const nimby_1 = require("../nimby");
const usageTest = __importStar(require("../usage"));
const DAYMODE_CHECKS = [
    usageTest.testIdle,
    usageTest.testCPUUsage,
    usageTest.testRunningProcesses,
];
const NIGHTMODE_CHECKS = [
    usageTest.testIdle,
    usageTest.testCPUUsage,
];
class AutoMode extends nimbyMode_1.default {
    constructor() {
        super(...arguments);
        this.name = "auto";
        this.interval = "auto";
        this.checkList = DAYMODE_CHECKS;
        this.intervals = [];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkMode();
            this.intervals.push(setInterval(this.checkMode, config_json_1.default.nimby.autoMode.usageCheckInterval * 10000));
            yield this.checkStatus();
            this.intervals.push(setInterval(this.checkStatus, config_json_1.default.nimby.autoMode.usageCheckInterval * 10000));
        });
    }
    ;
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.intervals.forEach(interval => {
                clearInterval(interval);
            });
        });
    }
    ;
    checkMode() {
        return __awaiter(this, void 0, void 0, function* () {
            const hour = new Date().getHours();
            const timeRange = hour >= config_json_1.default.nimby.daynight.startHour ||
                hour <= config_json_1.default.nimby.daynight.endHour;
            this.checkList = timeRange ? DAYMODE_CHECKS : NIGHTMODE_CHECKS;
        });
    }
    checkStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const check of this.checkList) {
                const result = yield check();
                if (result.value) {
                    (0, nimby_1.setNimbyStatus)(Object.assign({}, result));
                }
            }
        });
    }
}
exports.AutoMode = AutoMode;
exports.default = new AutoMode();
