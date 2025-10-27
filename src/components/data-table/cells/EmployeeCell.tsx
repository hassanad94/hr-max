type EmployeeCellProps = {
	firstName: string | null | undefined;
	lastName: string | null | undefined;
	email: string | null | undefined;
};

export const EmployeeCell = ({
	firstName,
	lastName,
	email,
}: EmployeeCellProps) => {
	return (
		<div className="flex items-center gap-3">
			<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-sm font-semibold text-white">
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
};
