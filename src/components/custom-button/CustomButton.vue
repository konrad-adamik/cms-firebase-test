<template functional>
	<button class="custom-button" type="button" v-on="listeners">
		{{ props.buttonText }}
	</button>
</template>
<style lang="scss" scoped>
.custom-button {
	background-color: #05063e;
	border: 1px solid #05063e;
	border-radius: 10px;
	color: #ffffff;
	height: 40px;
	width: 100px;
}

.custom-button:focus {
	outline: none;
}

.custom-button:active {
	background-color: #0f1168;
}
</style>
