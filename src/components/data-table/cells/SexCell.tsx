import { getSexLabel } from "@/utils/labels";

type SexCellProps = {
	sex: number | null | undefined;
};

export const SexCell = ({ sex }: SexCellProps) => {
	return (
		<div className="text-sm text-gray-700">
			{sex !== null && sex !== undefined ? getSexLabel(sex) : "—"}
		</div>
	);
};
