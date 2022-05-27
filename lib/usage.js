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
exports.testRunningProcesses = exports.testCPUUsage = exports.testIdle = void 0;
const config_json_1 = __importDefault(require("./config.json"));
const os_utils_1 = __importDefault(require("os-utils"));
const find_process_1 = __importDefault(require("find-process"));
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const testIdle = () => __awaiter(void 0, void 0, void 0, function* () {
    const idleTime = electron_1.powerMonitor.getSystemIdleTime();
    return {
        value: idleTime < config_json_1.default.nimby.autoMode.maxUserIdleTime,
        usage: { type: "no-idle", details: `Idle time: ${idleTime}` }
    };
});
exports.testIdle = testIdle;
const testCPUUsage = () => __awaiter(void 0, void 0, void 0, function* () {
    const cpuUsage = yield new Promise(resolve => {
        os_utils_1.default.cpuUsage(cpu => resolve(Math.round(cpu * 100)));
    });
    return {
        value: cpuUsage > config_json_1.default.nimby.autoMode.maxCPUUsage,
        usage: { type: "high-cpu", details: `CPU usage: ${cpuUsage}` }
    };
});
exports.testCPUUsage = testCPUUsage;
const testRunningProcesses = () => __awaiter(void 0, void 0, void 0, function* () {
    const processes = yield (0, find_process_1.default)("name", "");
    for (const process of processes) {
        const processName = path_1.default.parse(process.name).name;
        if (config_json_1.default.nimby.autoMode.softwares.includes(processName)) {
            return { value: true, usage: { type: "dcc-running", details: `DCC name: ${processName}` } };
        }
    }
    return { value: false, usage: { type: "dcc-running", details: `No dcc running` } };
});
exports.testRunningProcesses = testRunningProcesses;
