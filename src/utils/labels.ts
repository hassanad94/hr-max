/**
 * Get human-readable label for sex enum
 * @param sex - 0=Female, 1=Male, 2=Unknown
 * @returns Label for sex
 */
export const getSexLabel = (sex: number): string => {
	switch (sex) {
		case 0:
			return "Female";
		case 1:
			return "Male";
		case 2:
			return "Unknown";
		default:
			return "Unknown";
	}
};

/**
 * Get human-readable label for education enum
 * @param education - Education level enum value
 * @returns Label for education level
 */
export const getEducationLabel = (education: number): string => {
	switch (education) {
		case 0:
			return "Elementary";
		case 1:
			return "Vocational School";
		case 2:
			return "Apprenticeship School";
		case 3:
			return "Vocational Secondary School";
		case 4:
			return "High School";
		case 5:
			return "College";
		case 6:
			return "University";
		case 7:
			return "Other";
		default:
			return "Unknown";
	}
};

/**
 * Get human-readable label for payment method enum
 * @param paymentMethod - 0=Transfer, 1=Cash, 2=Dispatch
 * @returns Label for payment method
 */
export const getPaymentMethodLabel = (paymentMethod: number): string => {
	switch (paymentMethod) {
		case 0:
			return "Transfer";
		case 1:
			return "Cash";
		case 2:
			return "Dispatch";
		default:
			return "Unknown";
	}
};
