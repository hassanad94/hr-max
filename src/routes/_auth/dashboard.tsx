import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { ActionsRow, DataTable } from "@/components/data-table";

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
	return (
		<div className="@container/main flex flex-1 flex-col gap-4">
			<ActionsRow />
			<DataTable />
		</div>
	);
}
