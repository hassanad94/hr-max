import { format, parseISO } from "date-fns";

/**
 * Format a date string using date-fns
 * @param dateString - ISO date string to format
 * @param formatPattern - Format pattern (default: 'yyyy. MM. dd.')
 * @returns Formatted date string
 */
export const formatDate = (
	dateString: string,
	formatPattern: string = "yyyy. MM. dd.",
): string => {
	try {
		const date = parseISO(dateString);
		return format(date, formatPattern);
	} catch (error) {
		return dateString;
	}
};
