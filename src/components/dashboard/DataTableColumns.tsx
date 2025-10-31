import type { ColumnDef } from "@tanstack/react-table";
import type { EmployeeDto } from "@/types";
import {
	ActionsCell,
	CurrencyCell,
	DateCell,
	EducationCell,
	EmployeeCell,
	PhoneCell,
	SexCell,
	TextCell,
} from "../data-table/cells";

export const employeeColumns: ColumnDef<EmployeeDto>[] = [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => (
			<TextCell
				value={row.getValue("id")}
				className="font-medium text-gray-900"
				prefix="#"
			/>
		),
	},
	{
		accessorKey: "firstName",
		header: "Employee",
		cell: ({ row }) => (
			<EmployeeCell
				firstName={row.original.firstName}
				lastName={row.original.lastName}
				email={row.original.email}
			/>
		),
	},
	{
		accessorKey: "phone",
		header: "Phone",
		cell: ({ row }) => <PhoneCell phone={row.getValue("phone")} />,
	},
	{
		accessorKey: "sex",
		header: "Sex",
		cell: ({ row }) => <SexCell sex={row.getValue("sex")} />,
	},
	{
		accessorKey: "education",
		header: "Education",
		cell: ({ row }) => <EducationCell education={row.getValue("education")} />,
	},
	{
		accessorKey: "salary",
		header: "Salary",
		cell: ({ row }) => <CurrencyCell amount={row.getValue("salary")} />,
	},
	{
		accessorKey: "dateOfBirth",
		header: "Created At",
		cell: ({ row }) => <DateCell date={row.getValue("dateOfBirth")} />,
	},
	{
		id: "actions",
		header: "",
		cell: ({ row }) => <ActionsCell employee={row.original} />,
	},
];
