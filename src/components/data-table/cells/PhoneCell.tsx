type PhoneCellProps = {
	phone: string | null | undefined;
};

export const PhoneCell = ({ phone }: PhoneCellProps) => {
	return <div className="text-sm text-gray-700">{phone || "—"}</div>;
};
