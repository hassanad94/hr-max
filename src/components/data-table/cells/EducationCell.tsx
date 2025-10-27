import { getEducationLabel } from "@/utils/labels";

type EducationCellProps = {
	education: number | null | undefined;
};

export const EducationCell = ({ education }: EducationCellProps) => {
	return (
		<div className="text-sm text-gray-700">
			{education !== null && education !== undefined
				? getEducationLabel(education)
				: "—"}
		</div>
	);
};
