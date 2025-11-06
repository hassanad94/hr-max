import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { type FC, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import { Route } from "@/routes/_auth/dashboard";

export const SearchRow: FC = () => {
	const navigate = useNavigate();
	const { Search: searchValue } = Route.useSearch();

	const [value, setValue] = useState(searchValue ?? "");
	const debouncedValue = useDebounce(value, 500);

	// Update URL search params when debounced value changes
	useEffect(() => {
		navigate({
			to: ".",
			search: (prev) => ({
				...prev,
				Search: debouncedValue || undefined,
				Offset: 0,
			}),
		});
	}, [debouncedValue, navigate]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleClearSearch = useCallback(() => {
		setValue("");
	}, []);

	return (
		<div className="flex items-center justify-end gap-3">
			<div className="relative flex-1 max-w-md">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
				<Input
					type="text"
					placeholder="Search employees..."
					value={value}
					onChange={handleInputChange}
					className="pl-10 pr-10"
				/>
				{value && (
					<Button
						variant="ghost"
						size="icon"
						onClick={handleClearSearch}
						className="absolute right-1 top-1/2 size-7 -translate-y-1/2 hover:bg-gray-100"
					>
						<X className="size-4 text-gray-400" />
					</Button>
				)}
			</div>
		</div>
	);
};
