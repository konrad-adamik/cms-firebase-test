import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Login from "@/views/Login.vue";
import Menu from "@/views/Menu.vue";

import CreateArticle from "@/views/CreateArticle.vue";

import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "*",
		redirect: () => {
			return store.state.appState.userLoggedIn ? "/menu" : "/login";
		}
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
		beforeEnter: (to, from, next) => {
			if (store.state.appState.userLoggedIn) {
				next("/menu");
			} else {
				next();
			}
		}
	},
	{
		path: "/menu",
		name: "Menu",
		component: Menu,
		beforeEnter: (to, from, next) => {
			if (!store.state.appState.userLoggedIn) {
				next("/login");
			} else {
				next();
			}
		}
	},
	{
		path: "/create-article",
		name: "CreateArticle",
		component: CreateArticle,
		beforeEnter: (to, from, next) => {
			if (!store.state.appState.userLoggedIn) {
				next("/login");
			} else {
				next();
			}
		}
	}
];

const router = new VueRouter({
	routes
});

export default router;
