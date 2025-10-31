import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { DataTable, ActionsRow } from "@/components/data-table";

/*Currently its an overkill but later maybe we need to extend*/
const dashBoardSearchParamsSchema = z.object({
	Limit: z.number().catch(10),
	Offset: z.number().catch(0),
});

export const Route = createFileRoute("/_auth/dashboard")({
	validateSearch: dashBoardSearchParamsSchema,
	component: RouteComponent,
});

function RouteComponent() {
	const handleAddEmployee = () => {
		// TODO: Implement add employee functionality
		console.log("Add employee clicked");
	};

	return (
		<div className="@container/main flex flex-1 flex-col gap-4">
			<ActionsRow onAddEmployee={handleAddEmployee} />
			<DataTable />
		</div>
	);
}
