import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "primeflex/primeflex.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primevue/resources/primevue.min.css"; /* Deprecated */
import "primeicons/primeicons.css";

import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/css/index.css";
import "@dimsog/vue-modal/dist/style.css";

import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import StyleClass from "primevue/styleclass";
import Ripple from "primevue/ripple";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

import Calendar from "primevue/calendar";
// import Editor from "primevue/editor";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import MultiSelect from "primevue/multiselect";
import Knob from "primevue/knob";
import ProgressBar from "primevue/progressbar";
import RadioButton from "primevue/radiobutton";
import Sidebar from "primevue/sidebar";

//in main.js
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import Vue3FormWizard from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App)
	.use(pinia)
	.use(router)
	.use(LoadingPlugin)
	.use(PrimeVue)
	.use(bootstrap)
	.use(Vue3FormWizard)
	.use(PrimeVue, { ripple: true })

	.directive("tooltip", Tooltip)
	.directive("ripple", Ripple)
	.directive("styleclass", StyleClass)

	.component("Loading", Loading)
	.component("DataTable", DataTable)
	.component("TabView", TabView)
	.component("TabPanel", TabPanel)
	.component("Calendar", Calendar)
	.component("Column", Column)
	.component("Button", Button)
	.component("Dropdown", Dropdown)
	.component("Sidebar", Sidebar)
	.component("Avatar", Avatar)
	// .component("Editor", Editor)
	.component("Knob", Knob)
	.component("MultiSelect", MultiSelect)
	.component("ProgressBar", ProgressBar)
	.component("RadioButton", RadioButton)
	.component("Dialog", Dialog)
	.mount("#app");
