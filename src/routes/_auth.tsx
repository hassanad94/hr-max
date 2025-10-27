import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getCurrentUserRequest } from "@/requests/auth";
import { AuthLayout } from "@/components/layout";

export const Route = createFileRoute("/_auth")({
	beforeLoad: async () => {
		const isAuthenticated = await getCurrentUserRequest();

		if (isAuthenticated) {
			return;
		}

		throw redirect({
			to: "/login",
			search: {
				/* This is not a complete solution what if he has search params... IT will be a good feature request */
				returnUrl: location.pathname,
			},
		});
	},
	component: () => (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	),
});
