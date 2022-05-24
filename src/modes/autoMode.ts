import NimbyMode from "./nimbyMode";
import CONFIG from "../config.json";
import { setNimbyStatus } from "../nimby";
import * as usageTest from "../usage"

const DAYMODE_CHECKS = [
  usageTest.testIdle,
  usageTest.testCPUUsage,
  usageTest.testRunningProcesses,
]

const NIGHTMODE_CHECKS = [
  usageTest.testIdle,
  usageTest.testCPUUsage,
]


export class AutoMode extends NimbyMode {
  name: string = "auto"
  interval: string = "auto"
  checkList: usageTest.UsageCheck[] = DAYMODE_CHECKS
  intervals: NodeJS.Timer[] = []

  async init() {
    await this.checkMode()
    this.intervals.push(setInterval(this.checkMode, CONFIG.nimby.autoMode.usageCheckInterval * 10000));
    await this.checkStatus()
    this.intervals.push(setInterval(this.checkStatus, CONFIG.nimby.autoMode.usageCheckInterval * 10000));
  };
  async close() {
    this.intervals.forEach(interval => {
      clearInterval(interval)
    })
  };

  async checkMode() {
    const hour = new Date().getHours();

    const timeRange =
      hour >= CONFIG.nimby.daynight.startHour ||
      hour <= CONFIG.nimby.daynight.endHour;
  
    this.checkList = timeRange ? DAYMODE_CHECKS : NIGHTMODE_CHECKS
  }

  async checkStatus() {
    for(const check of this.checkList) {
      const result = await check()
      if(result.value) {
        setNimbyStatus({...result})
      }
    }
  }
}

export default new AutoMode()
