import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Pagination from "vue-pagination-2";

Vue.config.productionTip = false;

Vue.component("pagination", Pagination);

Vue.filter("digits", digit => {
  return new Intl.NumberFormat().format(digit);
});

Vue.filter("dateFormat", date => {
  return new Intl.DateTimeFormat("RU").format(new Date(date));
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
