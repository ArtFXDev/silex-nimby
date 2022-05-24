import CONFIG from "./config.json";
import osUtils from "os-utils";
import findProcess from "find-process"
import path from "path";
import { powerMonitor } from "electron";
import { NimbyStatus } from "./types"

export type UsageCheck = () => Promise<Partial<NimbyStatus>>;

export const testIdle: UsageCheck = async () => {
  const idleTime = powerMonitor.getSystemIdleTime();
  return {
    value: idleTime < CONFIG.nimby.autoMode.maxUserIdleTime,
    usage: { type: "no-idle", details: `Idle time: ${idleTime}` }
  }
}

export const testCPUUsage: UsageCheck = async () => {
  const cpuUsage = await new Promise<number>(resolve => {
    osUtils.cpuUsage(cpu => resolve(Math.round(cpu * 100)));
  });

  return {
    value: cpuUsage > CONFIG.nimby.autoMode.maxCPUUsage, 
    usage: { type: "high-cpu", details: `CPU usage: ${cpuUsage}` }
  }
}

export const testRunningProcesses: UsageCheck = async () => {
  const processes = await findProcess("name", "");
  for (const process of processes) {
    const processName = path.parse(process.name).name;

    if (CONFIG.nimby.autoMode.softwares.includes(processName)) {
      return {value: true, usage: { type: "dcc-running", details: `DCC name: ${processName}` }};
    }
  }
  return {value: false, usage: { type: "dcc-running", details: `No dcc running` }};
}
