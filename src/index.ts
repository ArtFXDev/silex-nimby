import { initAPI } from "./routes";
import { initAutoSwitch } from "./mode";

export function initNimby() {
  initAutoSwitch()
  initAPI()
}
