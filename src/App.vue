<template>
	<div id="app">
		<Header id="header" />
		<router-view id="router-view" />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/header/Header.vue";

import CustomInput from "@/components/custom-input/CustomInput.vue";
import CustomButton from "@/components/custom-button/CustomButton.vue";

Vue.component("custom-input", CustomInput);
Vue.component("custom-button", CustomButton);

@Component({
	components: {
		Header
	}
})
export default class App extends Vue {}
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
	position: relative;
}

#header {
	position: relative;
	top: 0;
}

#router-view {
	position: absolute;
	top: 55px;
	width: 100%;
	height: calc(100% - 55px);
}
</style>
