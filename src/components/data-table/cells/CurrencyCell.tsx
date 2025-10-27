type CurrencyCellProps = {
	amount: number | null | undefined;
	currency?: string;
	locale?: string;
};

export const CurrencyCell = ({
	amount,
	currency = "HUF",
	locale = "hu-HU",
}: CurrencyCellProps) => {
	return (
		<div className="font-semibold text-gray-900">
			{amount ? `${amount.toLocaleString(locale)} ${currency}` : "—"}
		</div>
	);
};
