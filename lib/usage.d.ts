import { NimbyStatus } from "./types";
export declare type UsageCheck = () => Promise<Partial<NimbyStatus>>;
export declare const testIdle: UsageCheck;
export declare const testCPUUsage: UsageCheck;
export declare const testRunningProcesses: UsageCheck;
