import { logger } from "./logger";
import CONFIG from "./config.json";
import { NimbyMode } from "./"

export const manualMode: NimbyMode = {
  init: () => {},
  close: () => {},
}
export let selectedMode: NimbyMode = autoMode;

export function setNimbyMode(mode: NimbyMode) {
  if(selectedMode === mode) { return; }
  selectedMode.close()
  selectedMode = mode;
  selectedMode.init()
}

export function toggleNimbyMode() {
  if(selectedMode === autoMode) {
    setNimbyMode(manualMode)
  } else {
    setNimbyMode(autoMode)
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
    setNimbyMode(autoMode);
  }
}

export function initNimbyLoop() {
  setInterval(checkAutoMode, CONFIG.nimby.autoMode.checkInterval * 1000)
}
