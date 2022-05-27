import NimbyMode from "./modes/nimbyMode";
export declare let selectedMode: NimbyMode;
export declare function setNimbyMode(mode: NimbyMode): Promise<void>;
export declare function toggleNimbyMode(): Promise<void>;
export declare function initAutoSwitch(): void;
