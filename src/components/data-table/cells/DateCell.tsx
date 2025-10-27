import { formatDate } from "@/utils/formatDate";

type DateCellProps = {
	date: string | null | undefined;
};

export const DateCell = ({ date }: DateCellProps) => {
	return (
		<div className="text-sm text-gray-700">
			{date ? formatDate(date) : "—"}
		</div>
	);
};
