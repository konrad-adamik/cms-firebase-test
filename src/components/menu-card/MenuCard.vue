<template functional>
	<div @click="props.disabled ? null : props.menuClicked()">
		<el-card
			:body-style="{
				height: 'calc(100% - 135px)',
				display: 'flex',
				'align-items': 'center',
				'justify-content': 'center'
			}"
			shadow="hover"
			:class="['box-card', 'menu-card', props.disabled ? 'disabled' : '']"
		>
			<p slot="header">{{ props.title }}</p>
			<div class="menu-card-body">
				<slot name="menu-card-icon" />
			</div>
		</el-card>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class MenuCard extends Vue {
	// Satisfy vetur
}
</script>
<style lang="scss" scoped>
.menu-card {
	align-items: center;
	border-radius: 10px;
	color: #05063e;
	cursor: pointer;
	font-size: 18px;
	height: 100%;
}

.disabled {
	background-color: rgba(100, 81, 81, 0.6);
	border-color: #3a3a5e;
	color: #3a3a5e;
	cursor: not-allowed;
}
</style>
