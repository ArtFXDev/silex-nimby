/// <reference types="node" />
import fs from "fs";
export declare const logger: import("pino").Logger<{
    prettyPrint: {
        colorize: boolean;
        translateTime: string;
        ignore: string;
        messageFormat: string;
    };
} | fs.WriteStream>;
