<template>
	<div id="app">
		<LoadingSpinner />
		<Header id="header" />
		<router-view id="router-view" />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/header/Header.vue";
import LoadingSpinner from "@/components/loading-spinner/LoadingSpinner.vue";

import CustomInput from "@/components/custom-input/CustomInput.vue";
import CustomTextarea from "@/components/custom-textarea/CustomTextarea.vue";
import CustomSelect from "@/components/custom-select/CustomSelect.vue";
import CustomButton from "@/components/custom-button/CustomButton.vue";
import CustomDivider from "@/components/custom-divider/CustomDivider.vue";

Vue.component("custom-input", CustomInput);
Vue.component("custom-textarea", CustomTextarea);
Vue.component("custom-select", CustomSelect);
Vue.component("custom-button", CustomButton);
Vue.component("custom-divider", CustomDivider);

@Component({
	components: {
		Header,
		LoadingSpinner
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
