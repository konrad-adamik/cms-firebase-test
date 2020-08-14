<template>
	<el-dialog
		:title="dialogProps.title"
		:visible="isVisible"
		:destroy-on-close="true"
		:width="dialogProps.width ? dialogProps.width : '50%'"
		:before-close="handleBeforeClose"
	>
		<component
			v-if="dialogProps.component"
			:is="dialogProps.component"
			:componentProps="dialogProps.componentProps"
		/>
		<p class="dialog-message" v-else>{{ dialogProps.message }}</p>
		<div class="button-container" slot="footer">
			<el-button
				:key="index"
				v-for="(item, index) in dialogProps.buttonList"
				@click="item.click"
				:type="item.type ? item.type : ''"
			>
				{{ item.name }}
			</el-button>
		</div>
	</el-dialog>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheDialogProps from "@/interfaces/TheDialogProps";
import { DIALOG_EVENTS } from "@/enums/DialogEvents";
@Component
export default class TheDialog extends Vue {
	private isVisible = false;

	private dialogProps: TheDialogProps = {
		title: "",
		component: null,
		componentProps: {},
		message: "",
		buttonList: []
	};

	beforeMount(): void {
		document.addEventListener(
			DIALOG_EVENTS.SHOW_DIALOG_WITH_MESSAGE,
			event => this.showDialogWithMessage(event)
		);
		document.addEventListener(
			DIALOG_EVENTS.SHOW_DIALOG_WITH_COMPONENT,
			event => this.showDialogWithComponent(event)
		);
		document.addEventListener(DIALOG_EVENTS.HIDE_DIALOG, () =>
			this.hideDialog()
		);
	}

	beforeDestroy(): void {
		document.removeEventListener(
			DIALOG_EVENTS.SHOW_DIALOG_WITH_MESSAGE,
			event => this.showDialogWithMessage(event)
		);
		document.removeEventListener(
			DIALOG_EVENTS.SHOW_DIALOG_WITH_COMPONENT,
			event => this.showDialogWithComponent(event)
		);
		document.removeEventListener(DIALOG_EVENTS.HIDE_DIALOG, () =>
			this.hideDialog()
		);
	}

	private handleBeforeClose() {
		this.isVisible = false;
	}

	private showDialogWithMessage(event: Event): void {
		const ev = event as CustomEvent;
		this.dialogProps.message = ev.detail.dialogProps.message;
		this.showDialog(ev);
	}

	private showDialogWithComponent(event: Event): void {
		const ev = event as CustomEvent;
		this.dialogProps.component = ev.detail.dialogProps.component;
		this.dialogProps.componentProps = ev.detail.dialogProps.componentProps;
		this.showDialog(ev);
	}

	private showDialog(event: CustomEvent) {
		this.dialogProps.title = event.detail.dialogProps.title;
		this.dialogProps.width = event.detail.dialogProps.width;
		this.dialogProps.buttonList = event.detail.dialogProps.buttonList;
		this.isVisible = true;
	}

	private hideDialog() {
		this.isVisible = false;
	}
}
</script>
<style lang="scss" scoped>
.dialog-message {
	font-size: 18px;
}

.button-container {
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}
</style>
