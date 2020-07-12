<template>
	<div class="custom-textarea-wrapper">
		<span class="custom-textarea-label">{{ label }}</span>
		<textarea
			v-bind="$attrs"
			class="custom-textarea"
			:value="value"
			@input="$emit('input', $event.target.value)"
			@keyup.enter="keyupEnter"
		/>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class CustomTextarea extends Vue {
	@Prop({ default: "" })
	value!: string;

	@Prop({ default: "" })
	readonly label!: string;

	@Prop()
	readonly keyupEnter!: Function;
}
</script>
<style lang="scss" scoped>
.custom-textarea-wrapper {
	position: relative;
	height: 130px;
}

.custom-textarea-label {
	color: #05063e;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	top: 0px;
	left: 0px;
	height: 20px;
}

.custom-textarea {
	border: 1px solid #05063e;
	border-radius: 5px;
	box-sizing: border-box;
	height: 110px;
	left: 0px;
	resize: none;
	position: absolute;
	top: 20px;
	width: 100%;

	> textarea:focus {
		outline: none;
	}
}
</style>
