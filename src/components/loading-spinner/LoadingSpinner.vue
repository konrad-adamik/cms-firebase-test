<template>
	<div v-show="showLoadingSpinner" class="spinner-container">
		<div class="lds-dual-ring">
			<span class="spinner-text">{{ loadingSpinnerText }}</span>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class LoadingSpinner extends Vue {
	get showLoadingSpinner(): boolean {
		return this.$store.state?.loadingSpinner?.show;
	}
	get loadingSpinnerText(): string {
		return this.$store.state?.loadingSpinner?.text;
	}
}
</script>
<style lang="scss" scoped>
.spinner-container {
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
	left: 0;
	top: 0;
	display: flex;
	height: 100%;
	width: 100%;
	overflow: auto;
	position: fixed;
	z-index: 10;
}

.spinner-text {
	color: #05063e;
	font-size: 18px;
	position: relative;
	top: 190px;
}

// https://loading.io/css/
.lds-dual-ring {
	display: inline-block;
	width: 160px;
	height: 180px;
	position: relative;
	margin: auto;
}
.lds-dual-ring:after {
	content: " ";
	display: block;
	width: 128px;
	height: 128px;
	margin: 8px;
	border-radius: 50%;
	border: 8px solid #05063e;
	border-color: #05063e transparent #05063e transparent;
	animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
