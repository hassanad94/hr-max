import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteEmployee } from "@/requests";
import { useDialogActions } from "@/store";
import type { EmployeeDto } from "@/types";

type ActionsCellProps = {
	employee: EmployeeDto;
};

export const ActionsCell = ({ employee }: ActionsCellProps) => {
	const { openDialog } = useDialogActions();

	const { mutate } = useDeleteEmployee();

	return (
		<div className="action-container flex items-center justify-end gap-1">
			<Button
				type="button"
				onClick={() =>
					openDialog({
						name: "HandleEmployeeDialog",
						props: { employee: employee },
					})
				}
				variant="ghost"
				size="icon-sm"
				title="Edit employee"
			>
				<Pencil className="h-4 w-4" />
			</Button>
			<Button
				type="button"
				onClick={() => {
					const result = confirm(
						`Are you sure you want to delete: ${employee.firstName} ${employee.lastName}`,
					);

					if (!result) {
						return;
					}

					mutate(employee.id);
				}}
				variant="ghost"
				size="icon-sm"
				className="hover:bg-red-50 hover:text-red-600"
				title="Delete employee"
			>
				<Trash2 className="h-4 w-4" />
			</Button>
			<Button
				type="button"
				onClick={() => console.log(employee)}
				variant="ghost"
				size="icon-sm"
				title="More options"
			>
				<MoreVertical className="h-4 w-4" />
			</Button>
		</div>
	);
};
