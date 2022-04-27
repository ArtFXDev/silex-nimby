import { logger } from "./logger";
import axios from "axios";
import CONFIG from "./config.json";

interface NimbyStatus {
  value: boolean
  mode: string
  reason: string
}

const currentStatus: NimbyStatus = {
  value: true,
  mode: "auto",
  reason: "Default status",
}

export async function setNimbyStatus(newStatus: Partial<NimbyStatus>) {
  logger.info(`[NIMBY] Setting Nimby value to ${newStatus}`);
  Object.assign(currentStatus, newStatus)

  await axios.get(
    `${CONFIG.nimby.bladeURL}/blade/ctrl?nimby=${currentStatus.value ? 1 : 0}`
  );
}

export async function getBladeStatus() {
  let response = await axios.get(`${CONFIG.nimby.bladeURL}/blade/status`);
  response.data.nimbyON = response.data.nimby !== "None";
  return response;
}
