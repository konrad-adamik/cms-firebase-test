<template>
	<div class="header">
		<img src="@/assets/cms-logo.png" />
		<span v-show="userNickname.length > 0">
			<i class="fa fa-user" aria-hidden="true"></i>
			{{ userNickname }}
		</span>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Header extends Vue {
	get userNickname(): string {
		return this.$store.state?.appState?.userNickname;
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
