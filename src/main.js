import { createApp } from "vue";
// window.$ = window.jQuery = import('jquery');
// import $ from 'jquery'
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// import AdminlteVue from 'adminlte-vue'
// Vue.use(AdminlteVue)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(router).mount("#app");
