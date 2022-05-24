import { logger } from "./logger";
import CONFIG from "./config.json";

import NimbyMode from "./modes/nimbyMode"
import manualMode from "./modes/manualMode";
import autoMode from "./modes/autoMode";
import { currentStatus } from "./nimby"

export let selectedMode: NimbyMode = autoMode;

export async function setNimbyMode(mode: NimbyMode) {
  if(selectedMode === mode) { return; }
  await selectedMode.close()
  selectedMode = mode;
  await selectedMode.init()
}

export async function toggleNimbyMode() {
  if(selectedMode === autoMode) {
    await setNimbyMode(manualMode)
  } else {
    await setNimbyMode(autoMode)
  }
}

// Nimby will force the auto mode every night
async function checkAutoMode() {
  logger.debug("[NIMBY] Checking for auto mode...");
  const hour = new Date().getHours();

  const timeRange =
    hour >= CONFIG.nimby.daynight.startHour ||
    hour <= CONFIG.nimby.daynight.endHour;

  if (selectedMode !== autoMode && timeRange && !currentStatus.logged) {
    logger.debug(`[NIMBY] Auto mode activation because of ${hour}h`);
    await setNimbyMode(autoMode);
  }
}

export function initNimby() {
  setInterval(checkAutoMode, CONFIG.nimby.autoMode.switchCheckInterval * 1000)
}
