import { NimbyStatus } from "./types";
export declare const currentStatus: NimbyStatus;
export declare function setNimbyStatus(newStatus: Partial<NimbyStatus>): Promise<void>;
export declare function getBladeStatus(): Promise<import("axios").AxiosResponse<any, any>>;
export declare function startNimby(): Promise<void>;
