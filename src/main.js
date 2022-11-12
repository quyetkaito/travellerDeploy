import { createApp } from 'vue'
import App from './App.vue'
// import Login from './views/login/LoginPage.vue'
//import router
import router from "./router";

//import store
import store from "./store/store";
//đa ngôn ngữ
import { createI18n } from 'vue-i18n-lite';
import vnMessage from './lang/vn.json'
import enMessage from './lang/en.json'
import lang from "@/lang/lang";

//import Enum
import Enum from "@/enum/enum";

//import tailwindcss
import './assets/tailwind.css'

//import tooltip
import FloatingVue from 'floating-vue'
// import {
//     // Directives
//     VTooltip,
//     VClosePopper,
//     // Components
//     Dropdown,
//     Tooltip,
//     Menu
// } from 'floating-vue'
// import 'floating-vue/dist/style.css'

//ckeditor
import CKEditor from '@ckeditor/ckeditor5-vue';

//multi vue 3
import vMultiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

//emit global
import mitt from 'mitt';
const emitter = mitt();

//import global component
import MInput from "@/components/m-input/MInput";
import MButton from "@/components/m-button/MButton";
import MLabel from "@/components/m-label/MLabel";
import MGrid from "@/components/m-grid/MGrid";
import MDialogContainer from "@/components/m-dialog/MDialogContainer";
import MLoading from "@/components/m-loading/MLoading";
import MLoader from "@/components/m-loading/MLoader";
import MMessage from "@/components/m-message/MMessage";
import MToast from "@/components/m-toast/MToast";
import MToolTip from "@/components/m-tooltip/MToolTip";
import MRadio from "@/components/m-radio/MRadio";
import MCheckbox from "@/components/m-checkbox/MCheckbox";
import MPagination from "@/components/m-pagination/MPagination";
import MSpin from "@/components/m-loading/MSpin";

//common function
import CommonFunc from './script/commonFunc.js';
//common config
import commonConfig from './config/commonConfig';

//messageBox
import MessageBox from './script/messageBox';

//cache
import Cache from './cache/cache.js';
import Session from './cache/session';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz8Bjcpn0Il62sS8qBdqRTaKcmfTsR_dM",
    authDomain: "traveller-df010.firebaseapp.com",
    projectId: "traveller-df010",
    storageBucket: "traveller-df010.appspot.com",
    messagingSenderId: "746894901226",
    appId: "1:746894901226:web:6a5b61d9468879ecde3c93",
    measurementId: "G-4YSGKBKC7W"
};


const app = createApp(App)
app.use(router);
app.use(store);
// app.use(FloatingVue);
app.use(CKEditor);
app.use(vMultiselect);
app.use(firebaseConfig);
// const analytics = getAnalytics(app);
//đa ngôn ngữ
const messages = {
    vn: vnMessage,
    en: enMessage,
}
const i18n = createI18n({
    locale: store.state.locale,
    messages,
    // fallbackLocale: 'en',
})
app.use(i18n);
//một số cấu hình mặc định cho toast khi show => có thể ghi đè
const toastOption = {
    transition: "Vue-Toastification__bounce", // các loại khác: thay chữ bound = fade, slideB1
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
    maxToasts: 20,
    newestOnTop: true,
}
app.use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    position: "top-center",
    newestOnTop: true,
    timeout: 3000,
});
// app.directive('tooltip', VTooltip)
// app.directive('close-popper', VClosePopper)
//component
// app.component('VDropdown', Dropdown)
// app.component('VTooltip', Tooltip)
// app.component('VMenu', Menu)
app.component("m-input", MInput)
app.component("m-button", MButton)
app.component("m-label", MLabel)
app.component("m-grid", MGrid)
app.component("m-dialog-container", MDialogContainer)
app.component("m-loading", MLoading)
app.component("m-loader", MLoader)
app.component("m-message", MMessage)
app.component("m-toast", MToast)
app.component("m-tooltip", MToolTip)
app.component("m-radio", MRadio)
app.component("m-checkbox", MCheckbox)
app.component("m-pagination", MPagination)
app.component("v-multiselect", vMultiselect)
app.component("m-spin", MSpin)
app.config.productionTip = false
    //global properties
app.config.globalProperties.$quyetkaito = 'hello';
app.config.globalProperties.$enum = Enum;
app.config.globalProperties.$eventBus = emitter;
app.config.globalProperties.$commonFunc = CommonFunc;
app.config.globalProperties.$commonConfig = commonConfig;
app.config.globalProperties.$cache = Cache;
app.config.globalProperties.$session = Session;
app.config.globalProperties.$mgsBox = MessageBox;
app.config.globalProperties.$i18n = i18n;
app.mount('#app');