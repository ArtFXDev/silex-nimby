import { logger } from "./logger";
import CONFIG from "./config.json";

import { NimbyMode } from "./modes/nimbyMode"
import { manualMode } from "./modes/manualMode";
import { autoMode } from "./modes/autoMode";

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

  const shouldGoAuto =
    hour >= CONFIG.nimby.autoMode.startHour ||
    hour <= CONFIG.nimby.autoMode.endHour;

  if (selectedMode !== autoMode && shouldGoAuto) {
    logger.debug(`[NIMBY] Auto mode activation because of ${hour}h`);
    await setNimbyMode(autoMode);
  }
}

export function initNimbyLoop() {
  setInterval(checkAutoMode, CONFIG.nimby.autoMode.switchCheckInterval * 1000)
}
