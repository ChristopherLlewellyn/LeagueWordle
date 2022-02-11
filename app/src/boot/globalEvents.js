import { boot } from "quasar/wrappers";
import mitt from "mitt";

const emitter = mitt();

export default boot(async ({ app }) => {
  app.config.globalProperties.emitter = emitter;
});
