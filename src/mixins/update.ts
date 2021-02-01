import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Update extends Vue {
  registration: ServiceWorkerRegistration | null = null;

  created() {
    document.addEventListener(
      "swUpdated",
      ((event: CustomEvent) =>
        (this.registration = event.detail)) as EventListener,
      {
        once: true
      }
    );

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  }
}
