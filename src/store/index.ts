import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		appState: {
			firebaseConfigPresent: false,
			userLoggedIn: false,
			userNickname: ""
		}
	},
	mutations: {
		setFirebaseConfigPresent(state, payload) {
			state.appState.firebaseConfigPresent = payload;
		},
		setUserLoggedIn(state, payload) {
			state.appState.userLoggedIn = payload;
		},
		setUserNickname(state, payload) {
			state.appState.userNickname = payload;
		}
	},
	actions: {},
	modules: {}
});
