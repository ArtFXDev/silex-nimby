import pino from "pino";
import path from "path";
import fs from "fs";
import os from "os";

const homedir = os.homedir();
const silexLogDir = path.join(homedir, "silex");

// Creates the log dir if doesn't exist
// Runs only once because node caches requires
if (!fs.existsSync(silexLogDir)) {
  fs.mkdirSync(silexLogDir, { recursive: true });
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
}

export const logger = pino(...(devMode ? [pinoOptions] : [pinoOptions, fs.createWriteStream(path.join(silexLogDir, ".silex_desktop_log"))]));
