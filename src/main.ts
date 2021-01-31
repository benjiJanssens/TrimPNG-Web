import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

// Buefy
import Buefy from "buefy";
import "./stylesheets/bulma.scss";
Vue.use(Buefy);

// Material Design Icons
import "@mdi/font/css/materialdesignicons.min.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
