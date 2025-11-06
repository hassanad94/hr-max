import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as ShadPagination,
} from "@/components/ui/pagination";

type PaginationProps = {
	currentPage: number;
	totalItems: number;
	pageSize: number;
	onPageChange: (page: number) => void;
};

export const Pagination = ({
	currentPage,
	totalItems,
	pageSize,
	onPageChange,
}: PaginationProps) => {
	const totalPages = Math.ceil(totalItems / pageSize);
	const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalItems);

	// Generate page numbers to display
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisiblePages = 3;

		if (totalPages <= maxVisiblePages + 2) {
			// Show all pages if total pages is small
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
			return pages;
		}
		// Always show first page
		pages.push(1);

		if (currentPage > 3) {
			pages.push("...");
		}

		// Show current page and surrounding pages
		const start = Math.max(2, currentPage - 1);
		const end = Math.min(totalPages - 1, currentPage + 1);

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		if (currentPage < totalPages - 2) {
			pages.push("...");
		}

		// Always show last page
		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3">
			<div className="flex flex-1">
				<p className="text-sm text-gray-700">
					Showing <span className="font-medium">{startItem}</span> to{" "}
					<span className="font-medium">{endItem}</span> of{" "}
					<span className="font-medium">{totalItems}</span>
				</p>
			</div>
			{totalPages > 1 && (
				<ShadPagination className="w-auto">
					<PaginationContent className="ml-auto">
						<PaginationItem>
							<PaginationPrevious
								onClick={() => onPageChange(currentPage - 1)}
								disabled={currentPage === 1}
							/>
						</PaginationItem>

						{pageNumbers.map((page, index) => (
							<PaginationItem key={page === "..." ? `ellipsis-${index}` : page}>
								{page === "..." ? (
									<PaginationEllipsis />
								) : (
									<PaginationLink
										onClick={() => onPageChange(page as number)}
										isActive={currentPage === page}
									>
										{page}
									</PaginationLink>
								)}
							</PaginationItem>
						))}

						<PaginationItem>
							<PaginationNext
								onClick={() => onPageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
							/>
						</PaginationItem>
					</PaginationContent>
				</ShadPagination>
			)}
		</div>
	);
};
