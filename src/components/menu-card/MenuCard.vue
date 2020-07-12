<template functional>
	<button
		:class="['menu-card', props.disabled ? 'disabled' : '']"
		@click="props.disabled ? null : props.menuClicked()"
	>
		<p>{{ props.title }}</p>
		<slot name="menu-card-icon" />
	</button>
</template>
<style lang="scss" scoped>
.menu-card {
	align-items: center;
	background-color: #ffffff;
	border: 2px solid #05063e;
	border-radius: 10px;
	color: #05063e;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	font-size: 18px;
	justify-content: space-evenly;
	height: 280px;
	width: 280px;
}

.menu-card:hover:not(.disabled) {
	background-color: #5d5fb3;
	transition: 0.15s;
}

.menu-card:active:not(.disabled) {
	background-color: #40429b;
	transition: 0.15s;
	outline: none;
}

.menu-card:focus {
	outline: none;
}

.disabled {
	background-color: rgba(100, 81, 81, 0.6);
	border-color: #3a3a5e;
	color: #3a3a5e;
	cursor: not-allowed;
}
</style>
