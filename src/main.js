import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueYoutube from 'vue-youtube';
import VueSocialSharing from 'vue-social-sharing';




Vue.config.productionTip = false;
Vue.use(VueYoutube);
Vue.use(VueSocialSharing);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
