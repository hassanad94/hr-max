import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	beforeLoad: ({ location }) => {
		// Preserve all search params when redirecting
		throw redirect({
			to: "/dashboard",
			search: location.search as Record<string, unknown>,
		});
	},
});
