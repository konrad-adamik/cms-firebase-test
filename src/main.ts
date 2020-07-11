import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FirebaseService from "./service/FirebaseService";

Vue.config.productionTip = false;

FirebaseService.initializeFirebase();

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
