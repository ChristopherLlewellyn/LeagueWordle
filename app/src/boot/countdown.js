import { boot } from "quasar/wrappers";
import VueCountdown from "@chenfengyuan/vue-countdown";

export default boot(async ({ app }) => {
  app.component(VueCountdown.name, VueCountdown);
});
