import { useQuery } from "@tanstack/react-query";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { getEmployeesQueryOptions } from "@/requests/employee";
import { Route } from "@/routes/_auth/dashboard";
import type { EmployeeDto } from "@/types";

export const DataTable = () => {
	const dashboardSearchParams = Route.useSearch();

	const {
		data: queryData,
		isLoading,
		error,
	} = useQuery(getEmployeesQueryOptions(dashboardSearchParams));

	const columns = useMemo<ColumnDef<EmployeeDto>[]>(() => {
		if (!queryData?.data || queryData.data.length === 0) {
			return [];
		}

		// Get the first employee to extract all keys
		const firstEmployee = queryData.data[0];
		const keys = Object.keys(firstEmployee) as (keyof EmployeeDto)[];

		return keys.map((key) => ({
			accessorKey: key,
			header: () => {
				// Convert camelCase to Title Case with better formatting
				const formatted = key
					.replace(/([A-Z])/g, " $1") // Add space before capital letters
					.replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
					.trim(); // Remove extra spaces
				return <span className="text-xs uppercase">{formatted}</span>;
			},
			cell: (info) => {
				const value = info.getValue();
				// Handle null/undefined values
				if (value === null || value === undefined) {
					return "-";
				}
				// Format dates
				if (
					typeof value === "string" &&
					(key.toLowerCase().includes("date") ||
						key.toLowerCase().includes("birth"))
				) {
					try {
						return new Date(value).toLocaleDateString();
					} catch {
						return value;
					}
				}
				return String(value);
			},
		}));
	}, [queryData?.data]);

	const table = useReactTable({
		data: queryData?.data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (isLoading) {
		/*Skeleton loading for */
		return "loading...";
	}

	if (error) {
		return error.message;
	}

	return (
		<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						{table.getHeaderGroups().map((hg) => (
							<tr key={hg.id} className="border-b border-gray-200">
								{hg.headers.map((header) => (
									<th
										key={header.id}
										className="px-6 py-4 text-left text-sm font-medium text-gray-600"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="divide-y divide-gray-200">
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="transition-colors hover:bg-gray-50"
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-6 py-4 text-sm text-gray-900">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
