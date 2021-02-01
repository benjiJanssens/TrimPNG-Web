import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Update extends Vue {
  registration: ServiceWorkerRegistration | null = null;
  isRefreshing = false;

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
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        window.location.reload();
      }
    });
  }
}
