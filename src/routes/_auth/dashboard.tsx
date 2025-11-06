import { createFileRoute } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ActionsRow, DataTable, SearchRow } from "@/components/data-table";

const dashBoardSearchParamsSchema = z.object({
	Search: fallback(z.string(), "").default(""),
	OrderBy: fallback(z.string(), "").default(""),
	Limit: fallback(z.number(), 10).default(10),
	Offset: fallback(z.number(), 0).default(0),
});

export const Route = createFileRoute("/_auth/dashboard")({
	validateSearch: zodValidator(dashBoardSearchParamsSchema),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="@container/main flex flex-1 flex-col gap-4">
			<ActionsRow />
			<SearchRow />
			<DataTable />
		</div>
	);
}
