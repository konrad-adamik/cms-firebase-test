<template>
	<div class="custom-input-wrapper">
		<span class="custom-input-label">{{ label }}</span>
		<input
			v-bind="$attrs"
			class="custom-input"
			:type="type"
			:value="value"
			@input="$emit('input', $event.target.value)"
		/>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class CustomInput extends Vue {
	@Prop({ default: "" })
	value!: string;

	@Prop({ default: "" })
	readonly label!: string;

	@Prop({ default: "text" })
	readonly type!: string;
}
</script>
<style lang="scss" scoped>
.custom-input-wrapper {
	position: relative;
	height: 60px;
}

.custom-input-label {
	color: #05063e;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	top: 0px;
	left: 0px;
	height: 20px;
}

.custom-input {
	border: 1px solid #05063e;
	border-radius: 5px;
	box-sizing: border-box;
	height: 30px;
	left: 0px;
	position: absolute;
	top: 20px;
	width: 100%;

	> input:focus {
		outline: none;
	}
}
</style>
