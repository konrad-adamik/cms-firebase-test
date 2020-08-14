import TheDialogProps from "@/interfaces/TheDialogProps";
import { DIALOG_EVENTS } from "@/enums/DialogEvents";

export default class TheDialogUtils {
	public showDialogWithMessage(dialogProps: TheDialogProps) {
		document.dispatchEvent(
			new CustomEvent(DIALOG_EVENTS.SHOW_DIALOG_WITH_MESSAGE, {
				detail: {
					dialogProps
				}
			})
		);
	}
	public showDialogWithComponent(dialogProps: TheDialogProps) {
		document.dispatchEvent(
			new CustomEvent(DIALOG_EVENTS.SHOW_DIALOG_WITH_COMPONENT, {
				detail: {
					dialogProps
				}
			})
		);
	}
	public hideDialog() {
		document.dispatchEvent(new CustomEvent(DIALOG_EVENTS.HIDE_DIALOG, {}));
	}
}
