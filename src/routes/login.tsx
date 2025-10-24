import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/auth";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container min-h-screen flex items-center">
			<div className="flex h-full w-full">
				<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm lg:w-96">
						<div>
							<img
								src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
								alt="Your Company"
								className="h-10 w-auto"
							/>
							<h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
								Sign in to your account
							</h2>
						</div>

						<LoginForm />
					</div>
				</div>
				<div className="hidden lg:block">
					<img
						src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
						alt=""
						className="inset-0 size-full object-cove w-full"
					/>
				</div>
			</div>
		</div>
	);
}
