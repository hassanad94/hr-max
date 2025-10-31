import { Button } from "@/components/ui/button";
import { AddEmployee } from "./actions/AddEmployee";

interface ActionsRowProps {
	onAddEmployee?: () => void;
}

export const ActionsRow = ({ onAddEmployee }: ActionsRowProps) => {
	return (
		<div className="flex flex-col md:flex-row items-center justify-between gap-4">
			<div className="flex flex-1 justify-start w-full flex-col gap-1">
				<h2 className="text-2xl font-semibold tracking-tight text-gray-900">
					Employees List
				</h2>
				<p className="text-sm text-gray-600">
					Manage your employees and track their information.
				</p>
			</div>
			<div className="flex items-center gap-3 ml-auto">
				<Button variant="outline" onClick={() => {}}>
					Export
				</Button>

				<AddEmployee />
			</div>
		</div>
	);
};
