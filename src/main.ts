import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

// Buefy
import Buefy from "buefy";
import "./stylesheets/bulma.scss";
Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
