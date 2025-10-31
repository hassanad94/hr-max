import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDialogActions } from "@/store";

export const AddEmployee = () => {
	const { openDialog } = useDialogActions();

	const onAddEmployee = () => {
		openDialog({
			name: "HandleEmployeeDialog",
			props: {},
		});
	};

	return (
		<Button onClick={onAddEmployee}>
			<Plus className="h-4 w-4" />
			Add Employee
		</Button>
	);
};
