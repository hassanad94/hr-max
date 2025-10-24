import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { DataTable } from "@/components/dashboard";
import { GetEmployeesParamsSchema } from "@/types";

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
		<div className="@container/main flex flex-1 flex-col gap-2">
			<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				<DataTable />
			</div>
		</div>
	);
}
