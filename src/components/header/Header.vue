<template>
	<div class="header">
		<img src="@/assets/cms-logo.png" />
		<span v-show="userEmail.length > 0">
			<i class="fa fa-user" aria-hidden="true"></i>
			{{ userEmail }}
		</span>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Header extends Vue {
	get userEmail(): string {
		return this.$store.state?.appState?.userEmail;
	}
}
</script>
<style lang="scss" scoped>
.header {
	align-items: center;
	background-color: #05063e;
	box-shadow: 0px 5px 5px 0px rgba(5, 6, 62, 0.4);
	color: #ffffff;
	display: flex;
	font-size: 18px;
	justify-content: space-between;
	height: 40px;
	padding-left: 12px;
	padding-right: 12px;
	text-transform: uppercase;
}
</style>
