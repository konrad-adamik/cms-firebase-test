export default interface TheDialogProps {
	title: string;
	component?: Vue | null;
	componentProps?: object;
	message?: string;
	buttonList: Array<{
		name: string;
		click: Function;
		type?: string;
	}>;
	width?: string;
}
