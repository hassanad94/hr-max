import { useQuery } from "@tanstack/react-query";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { getEmployeesQueryOptions } from "@/requests/employee";
import { Route } from "@/routes/_auth/dashboard";
import type { EmployeeDto } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { getEducationLabel, getSexLabel } from "@/utils/labels";

export const DataTable = () => {
	const dashboardSearchParams = Route.useSearch();

	const {
		data: queryData,
		isLoading,
		error,
	} = useQuery(getEmployeesQueryOptions(dashboardSearchParams));

	const columns = useMemo<ColumnDef<EmployeeDto>[]>(() => {
		return [
			{
				accessorKey: "id",
				header: "ID",
				cell: ({ row }) => (
					<div className="font-medium text-gray-900">#{row.getValue("id")}</div>
				),
			},
			{
				accessorKey: "firstName",
				header: "Employee",
				cell: ({ row }) => {
					const firstName = row.original.firstName;
					const lastName = row.original.lastName;
					const email = row.original.email;
					return (
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-semibold text-white">
								{firstName?.charAt(0)}
								{lastName?.charAt(0)}
							</div>
							<div className="flex flex-col">
								<div className="font-medium text-gray-900">
									{firstName} {lastName}
								</div>
								<div className="text-sm text-gray-500">{email}</div>
							</div>
						</div>
					);
				},
			},
			{
				accessorKey: "phone",
				header: "Phone",
				cell: ({ row }) => (
					<div className="text-sm text-gray-700">
						{row.getValue("phone") || "—"}
					</div>
				),
			},
			{
				accessorKey: "sex",
				header: "Sex",
				cell: ({ row }) => {
					const sex = row.getValue("sex") as number | null;
					return (
						<div className="text-sm text-gray-700">
							{sex !== null ? getSexLabel(sex) : "—"}
						</div>
					);
				},
			},
			{
				accessorKey: "education",
				header: "Education",
				cell: ({ row }) => {
					const education = row.getValue("education") as number | null;
					return (
						<div className="text-sm text-gray-700">
							{education !== null ? getEducationLabel(education) : "—"}
						</div>
					);
				},
			},
			{
				accessorKey: "salary",
				header: "Salary",
				cell: ({ row }) => {
					const salary = row.getValue("salary") as number | null;
					return (
						<div className="font-semibold text-gray-900">
							{salary ? `${salary.toLocaleString("hu-HU")} HUF` : "—"}
						</div>
					);
				},
			},
			{
				accessorKey: "dateOfBirth",
				header: "Created At",
				cell: ({ row }) => {
					const dateOfBirth = row.getValue("dateOfBirth") as string | null;
					return (
						<div className="text-sm text-gray-700">
							{dateOfBirth ? formatDate(dateOfBirth) : "—"}
						</div>
					);
				},
			},
			{
				id: "actions",
				header: "",
				cell: ({ row }) => (
					<div className="flex items-center justify-end gap-1">
						<button
							type="button"
							onClick={() => console.log("Edit", row.original)}
							className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
							title="Edit employee"
						>
							<Pencil className="h-4 w-4" />
						</button>
						<button
							type="button"
							onClick={() => console.log("Delete", row.original)}
							className="rounded-md p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
							title="Delete employee"
						>
							<Trash2 className="h-4 w-4" />
						</button>
						<button
							type="button"
							className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
							title="More options"
						>
							<MoreVertical className="h-4 w-4" />
						</button>
					</div>
				),
			},
		];
	}, []);

	const table = useReactTable({
		data: queryData?.data ?? [],
		columns,
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
									colSpan={columns.length}
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
