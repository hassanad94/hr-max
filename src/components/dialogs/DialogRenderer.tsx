import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
	type DialogWithProps,
	useDialogActions,
	useDialogs,
} from "@/store/dialog";
import { HandleEmployeeDialog } from "./HandleEmployeeDialog";

const DialogRenderer = (dialog: DialogWithProps) => {
	switch (dialog.name) {
		case "HandleEmployeeDialog":
			return <HandleEmployeeDialog {...dialog.props} />;
		default:
			return null;
	}
};

export const Dialogs = () => {
	const dialogs = useDialogs();
	const { closeLastDialog } = useDialogActions();

	if (dialogs.length === 0) {
		return null;
	}

	return (
		<>
			{dialogs.map((dialog: DialogWithProps, index: number) => {
				return (
					<Dialog
						key={`${dialog.name}-${index}`}
						open={true}
						onOpenChange={(open) => {
							if (!open) {
								closeLastDialog();
							}
						}}
					>
						<DialogContent>{DialogRenderer(dialog)}</DialogContent>
					</Dialog>
				);
			})}
		</>
	);
};
