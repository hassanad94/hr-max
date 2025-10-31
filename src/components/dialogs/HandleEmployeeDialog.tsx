import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type HandleEmployeeDialogProps = {
	text?: string;
};

export const HandleEmployeeDialog = ({
	text = "Employee action completed successfully.",
}: HandleEmployeeDialogProps) => {
	return (
		<>
			<DialogHeader>
				<DialogTitle>Employee Action</DialogTitle>
			</DialogHeader>
			<div className="py-4">
				<p className="text-sm text-muted-foreground">{text}</p>
			</div>
		</>
	);
};
