import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layout";
import { getCurrentUserRequest } from "@/requests/auth";

function AuthRouteComponent() {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
}

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
	shouldReload: false, // Don't re-run beforeLoad on search param changes
	component: AuthRouteComponent,
});
