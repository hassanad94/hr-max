type TextCellProps = {
	value: string | number | null | undefined;
	className?: string;
	prefix?: string;
};

export const TextCell = ({ value, className = "", prefix }: TextCellProps) => {
	return (
		<div className={`text-sm text-gray-700 ${className}`}>
			{prefix}
			{value || "—"}
		</div>
	);
};
