<template>
	<div class="custom-select-wrapper">
		<span class="custom-select-label">{{ label }}</span>
		<select
			v-bind="$attrs"
			class="custom-select"
			:value="value"
			@input="$emit('input', $event.target.value)"
			@keyup.enter="keyupEnter"
		>
			<option
				v-for="(item, index) in selectOptions"
				:key="index"
				:value="item.value"
				>{{ item.label }}</option
			>
		</select>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Customselect extends Vue {
	@Prop({ default: "" })
	value!: string;

	@Prop({ default: "" })
	readonly label!: string;

	@Prop({ default: [] })
	readonly selectOptions!: [];

	@Prop()
	readonly keyupEnter!: Function;
}
</script>
<style lang="scss" scoped>
.custom-select-wrapper {
	position: relative;
	height: 80px;
}

.custom-select-label {
	color: #05063e;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	top: 0px;
	left: 0px;
	height: 20px;
}

.custom-select {
	border: 1px solid #05063e;
	border-radius: 5px;
	box-sizing: border-box;
	height: 50px;
	left: 0px;
	resize: none;
	position: absolute;
	top: 20px;
	width: 100%;
	white-space: normal;

	> select:focus {
		outline: none;
	}
}
</style>
