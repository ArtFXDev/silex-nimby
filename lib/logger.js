"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const homedir = os_1.default.homedir();
const silexLogDir = path_1.default.join(homedir, "silex");
// Creates the log dir if doesn't exist
// Runs only once because node caches requires
if (!fs_1.default.existsSync(silexLogDir)) {
    fs_1.default.mkdirSync(silexLogDir, { recursive: true });
}
// Setting the log level (debug if we are in development mode)
const devMode = process.env.NODE_ENV === "development";
const pinoOptions = {
    prettyPrint: {
        colorize: devMode,
        translateTime: "mm/dd/yyyy - HH:MM:ss",
        ignore: "pid,hostname",
        messageFormat: "[silex-desktop] {msg}",
    },
};
exports.logger = (0, pino_1.default)(...(devMode ? [pinoOptions] : [pinoOptions, fs_1.default.createWriteStream(path_1.default.join(silexLogDir, ".silex_desktop_log"))]));
