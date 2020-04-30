import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
  
// Importamos libreria UI
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

// Importamos libreria que nos ayudara a validar los formularios
import "./vee-validate";


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
