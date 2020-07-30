<template functional>
	<div class="divider-wrapper">
		<span class="divider-label">{{ props.label }}</span>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Divider extends Vue {
	// Satisfy vetur
}
</script>
<style lang="scss" scoped>
.divider-wrapper {
	border-bottom: 1px solid #05063e;
	margin-left: 20px;
	margin-right: 20px;
	margin-bottom: 15px;
}

.divider-label {
	color: #05063e;
	display: flex;
	font-size: 18px;
	font-weight: bold;
	justify-content: flex-start;
	padding-bottom: 5px;
}
</style>
