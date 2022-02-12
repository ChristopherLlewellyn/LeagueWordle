import { Notify } from "quasar";

export function notify(message) {
  Notify.create({
    message: message,
    position: "center",
    timeout: 1000,
    color: "white",
    textColor: "black",
  });
}
