import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type LoginRequest, LoginRequestSchema } from "@/types";

export const LoginForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<LoginRequest>({
		resolver: zodResolver(LoginRequestSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
		try {
			console.log("Form data:", data);
			// TODO: Implement login API call with data as LoginRequest
			// const loginData: LoginRequest = {
			// 	username: data.username,
			// 	password: data.password,
			// };
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<div className="w-full max-w-md">
			<form onSubmit={handleSubmit(onSubmit)}>
				<FieldSet>
					<FieldLegend>Sign in to your account</FieldLegend>
					<FieldDescription>
						Enter your credentials to access your account
					</FieldDescription>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="username">Username</FieldLabel>
							<Input
								id="username"
								type="text"
								{...register("username")}
								aria-invalid={errors.username ? "true" : "false"}
							/>
							{errors.username && (
								<p className="mt-1 text-sm text-red-600">
									{errors.username.message}
								</p>
							)}
						</Field>
						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Input
								id="password"
								type="password"
								{...register("password")}
								aria-invalid={errors.password ? "true" : "false"}
							/>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</Field>
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
						>
							{isSubmitting ? "Signing in..." : "Sign in"}
						</button>
					</FieldGroup>
				</FieldSet>
			</form>
		</div>
	);
};
