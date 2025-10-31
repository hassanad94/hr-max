import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EmployeeDto } from "@/types";

type ActionsCellProps = {
	employee: EmployeeDto;
	onEdit?: (employee: EmployeeDto) => void;
	onDelete?: (employee: EmployeeDto) => void;
	onMore?: (employee: EmployeeDto) => void;
};

export const ActionsCell = ({
	employee,
	onEdit,
	onDelete,
	onMore,
}: ActionsCellProps) => {
	return (
		<div className="action-container flex items-center justify-end gap-1">
			<Button
				type="button"
				onClick={() => onEdit?.(employee)}
				variant="ghost"
				size="icon-sm"
				title="Edit employee"
			>
				<Pencil className="h-4 w-4" />
			</Button>
			<Button
				type="button"
				onClick={() => onDelete?.(employee)}
				variant="ghost"
				size="icon-sm"
				className="hover:bg-red-50 hover:text-red-600"
				title="Delete employee"
			>
				<Trash2 className="h-4 w-4" />
			</Button>
			<Button
				type="button"
				onClick={() => onMore?.(employee)}
				variant="ghost"
				size="icon-sm"
				title="More options"
			>
				<MoreVertical className="h-4 w-4" />
			</Button>
		</div>
	);
};
