import { MoreVertical, Pencil, Trash2 } from "lucide-react";
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
		<div className="flex items-center justify-end gap-1">
			<button
				type="button"
				onClick={() => onEdit?.(employee)}
				className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
				title="Edit employee"
			>
				<Pencil className="h-4 w-4" />
			</button>
			<button
				type="button"
				onClick={() => onDelete?.(employee)}
				className="rounded-md p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
				title="Delete employee"
			>
				<Trash2 className="h-4 w-4" />
			</button>
			<button
				type="button"
				onClick={() => onMore?.(employee)}
				className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
				title="More options"
			>
				<MoreVertical className="h-4 w-4" />
			</button>
		</div>
	);
};
