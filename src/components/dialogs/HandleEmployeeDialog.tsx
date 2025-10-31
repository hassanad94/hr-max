import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { EmployeeDto } from "@/types";

export type HandleEmployeeDialogProps = {
	employee?: EmployeeDto;
};

export const HandleEmployeeDialog = ({
	employee,
}: HandleEmployeeDialogProps) => {
	return (
		<>
			<DialogHeader>
				<DialogTitle>
					{employee ? "Edit Employee" : "Create New Employee"}
				</DialogTitle>
			</DialogHeader>

			{/* TODO: Separet edit and createa into 2 different form just resuse component*/}

			{employee ? (
				<EmployeeForm mode={"edit"} employee={employee} />
			) : (
				<EmployeeForm mode={"create"} />
			)}
		</>
	);
};
