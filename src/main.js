import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import PrimeVue from 'primevue/config';
import Tooltip from "primevue/tooltip";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Calendar from "primevue/calendar";
// import Editor from "primevue/editor";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import MultiSelect from "primevue/multiselect";
import Knob from "primevue/knob";
import ProgressBar from "primevue/progressbar";
import RadioButton from "primevue/radiobutton";

//in main.js
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App)
    .use(pinia)
    .use(router)
    .use(LoadingPlugin)
    .use(PrimeVue)

    .directive("tooltip", Tooltip)
    .component("DataTable", DataTable)
    .component("Calendar", Calendar)
    .component("Column", Column)
    .component("Dropdown", Dropdown)
    // .component("Editor", Editor)
    .component("Knob", Knob)
    .component("MultiSelect", MultiSelect)
    .component("ProgressBar", ProgressBar)

    .component("RadioButton", RadioButton)
    .component("Dialog", Dialog)
.mount("#app");
