<template functional>
	<div class="custom-divider-wrapper">
		<span class="custom-divider-label">{{ props.label }}</span>
	</div>
</template>
<style lang="scss" scoped>
.custom-divider-wrapper {
	border-bottom: 1px solid #05063e;
	margin-left: 20px;
	margin-right: 20px;
	margin-bottom: 15px;
}

.custom-divider-label {
	color: #05063e;
	display: flex;
	font-size: 18px;
	font-weight: bold;
	justify-content: flex-start;
	padding-bottom: 5px;
}
</style>
