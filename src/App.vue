<template>
	<div id="app">
		<TheDialog />
		<LoadingSpinner />
		<Header id="header" />
		<router-view id="router-view" />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/header/Header.vue";
import LoadingSpinner from "@/components/loading-spinner/LoadingSpinner.vue";
import TheDialog from "@/components/dialog/TheDialog.vue";

import Divider from "@/components/divider/Divider.vue";

Vue.component("divider", Divider);

@Component({
	components: {
		Header,
		LoadingSpinner,
		TheDialog
	}
})
export default class App extends Vue {
	//
}
</script>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	height: 100%;
	min-height: 300px;
	min-width: 300px;
}

#header {
	position: relative;
	top: 0;
}

#router-view {
	position: relative;
	top: 25px;
	width: 100%;
	height: calc(100% - 75px);
}
</style>
