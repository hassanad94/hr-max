import { useQuery } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { getEmployeesQueryOptions } from "@/requests/employee";
import { Route } from "@/routes/_auth/dashboard";
import { employeeColumns } from "@/components/dashboard/DataTableColumns";

export const DataTable = () => {
	const dashboardSearchParams = Route.useSearch();

	const {
		data: queryData,
		isLoading,
		error,
	} = useQuery(getEmployeesQueryOptions(dashboardSearchParams));

	const table = useReactTable({
		data: queryData?.data ?? [],
		columns: employeeColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (isLoading) {
		return (
			<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
				<div className="flex h-96 items-center justify-center">
					<div className="flex flex-col items-center gap-3">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
						<p className="text-sm text-gray-500">Loading employees...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="overflow-hidden rounded-xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
				<p className="text-sm text-red-600">{error.message}</p>
			</div>
		);
	}

	return (
		<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="border-b border-gray-200 bg-gray-50">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{table.getRowModel().rows.length === 0 ? (
							<tr>
								<td
									colSpan={employeeColumns.length}
									className="px-6 py-16 text-center text-sm text-gray-500"
								>
									No employees found
								</td>
							</tr>
						) : (
							table.getRowModel().rows.map((row) => (
								<tr key={row.id} className="transition-colors hover:bg-gray-50">
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className="whitespace-nowrap px-6 py-4">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
