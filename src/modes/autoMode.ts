import { NimbyMode } from "./nimbyMode";
import { getBladeStatus } from "../nimby";
import { logger } from "../logger";
import path from "path";
import CONFIG from "../config.json";
import osUtils from "os-utils";
import findProcess from "find-process"
import { setNimbyStatus } from "../nimby";

async function testRunningJobs() {
  logger.debug("[NIMBY] Check for running jobs ...");

  const bladeStatus = (await getBladeStatus()).data;
  const runningJobs = bladeStatus.pids;

  if (runningJobs.length > 0) {
    return {value: true, reason: ""};
  }

  return {value: false, reason: ""};
}

async function testUserActive() {
  const idleTime = powerMonitor.getSystemIdleTime();
  return idleTime < CONFIG.nimby.autoMode.maxUserIdleTime;
}

async function testCPUUsage() {
  logger.debug("[NIMBY] Check for CPU usage ...");

  const cpuUsage = await new Promise<number>(resolve => {
    osUtils.cpuUsage(cpu => resolve(Math.round(cpu * 100)));
  });

  return {value: cpuUsage > CONFIG.nimby.autoMode.maxCPUUsage, reason: ""}
}

async function testRunningProcesses() {
  logger.debug("[NIMBY] Check for running processes ...");

  const processes = await findProcess("name", "");
  for (const process of processes) {
    const processName = path.parse(process.name).name;

    if (CONFIG.nimby.autoMode.softwares.includes(processName)) {
      return {value: true, reason: ""};
    }
  }

  return {value: false, reason: ""};
}

async function testUsageDay() {
  logger.debug("[NIMBY] Day mode usage check ...");

  const checks = [
    testRunningJobs,
    testCPUUsage,
    testRunningProcesses,
  ]
  checks.forEach(async (check) => {
    const result = await check()
    if(result) {
      setNimbyStatus({...result})
    }
  })
}

export class AutoMode extends NimbyMode {
  name: string = "auto"
  interval: string = "auto"

  async init() {
    setInterval(() => {
      testUsageDay();
    }, CONFIG.nimby.autoMode.usageCheckInterval * 10000);
  };
  async close() {};
}
