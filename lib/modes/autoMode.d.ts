/// <reference types="node" />
import NimbyMode from "./nimbyMode";
import * as usageTest from "../usage";
export declare class AutoMode extends NimbyMode {
    name: string;
    interval: string;
    checkList: usageTest.UsageCheck[];
    intervals: NodeJS.Timer[];
    init(): Promise<void>;
    close(): Promise<void>;
    checkMode(): Promise<void>;
    checkStatus(): Promise<void>;
}
declare const _default: AutoMode;
export default _default;
