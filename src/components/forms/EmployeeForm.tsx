import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCreateEmployee } from "@/requests/employee";
import { useDialogActions } from "@/store";
import {
	BaseEmployeeSchema,
	type CreateEmployeeRequest,
	type EmployeeDto,
} from "@/types";

/**
 * Form-specific validation schema
 * Extends BaseEmployeeSchema with required field validations
 */
const CreateEmployeeFormSchema = BaseEmployeeSchema.extend({
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	education: z
		.number({
			required_error: "Please select an education level",
			invalid_type_error: "Please select an education level",
		})
		.int()
		.min(0, "Please select an education level")
		.max(7, "Please select an education level"),
	salary: z
		.number({
			required_error: "Salary is required",
			invalid_type_error: "Salary is required",
		})
		.int("Salary must be a whole number"),
});

type CreateEmployeeFormData = z.infer<typeof CreateEmployeeFormSchema>;

export type EmployeeFormProps =
	| {
			mode: "create";
			employee?: CreateEmployeeRequest;
	  }
	| {
			mode: "edit";
			employee: EmployeeDto;
	  };

export const EmployeeForm = (props: EmployeeFormProps) => {
	const { mode, employee: defaultValues } = props;

	const { closeLastDialog } = useDialogActions();
	const createEmployeeMutation = useCreateEmployee();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<CreateEmployeeFormData>({
		resolver: zodResolver(CreateEmployeeFormSchema),
		shouldFocusError: true,
		defaultValues: {
			email: defaultValues?.email ?? "",
			firstName: defaultValues?.firstName ?? "",
			lastName: defaultValues?.lastName ?? "",
			dateOfBirth: defaultValues?.dateOfBirth ?? null,
			placeOfBirth: defaultValues?.placeOfBirth ?? null,
			mothersFirstName: defaultValues?.mothersFirstName ?? null,
			mothersLastName: defaultValues?.mothersLastName ?? null,
			phone: defaultValues?.phone ?? null,
			sex: defaultValues?.sex ?? null,
			education: defaultValues?.education ?? undefined,
			country: defaultValues?.country ?? null,
			zipCode: defaultValues?.zipCode ?? null,
			city: defaultValues?.city ?? null,
			parcelNumber: defaultValues?.parcelNumber ?? null,
			administrativeArea: defaultValues?.administrativeArea ?? null,
			administrativeAreaType: defaultValues?.administrativeAreaType ?? null,
			houseNumber: defaultValues?.houseNumber ?? null,
			building: defaultValues?.building ?? null,
			staircase: defaultValues?.staircase ?? null,
			floor: defaultValues?.floor ?? null,
			door: defaultValues?.door ?? null,
			paymentMethod: defaultValues?.paymentMethod ?? null,
			salary: defaultValues?.salary ?? undefined,
			bankAccountNumber: defaultValues?.bankAccountNumber ?? null,
			cashPaymentDay: defaultValues?.cashPaymentDay ?? null,
			moneyDispatchAddress: defaultValues?.moneyDispatchAddress ?? null,
		},
	});

	const paymentMethod = watch("paymentMethod");

	const onSubmit = (data: CreateEmployeeFormData) => {
		const mutationData =
			mode === "create"
				? {
						mode: "create" as const,
						employee: data as CreateEmployeeRequest,
					}
				: {
						mode: "edit" as const,
						employee: data as EmployeeDto,
						id: defaultValues.id,
					};

		console.log({ mutationData });

		createEmployeeMutation.mutate(mutationData, {
			onSuccess: () => {
				closeLastDialog();
			},
			onError: (error) => {
				console.error("Failed to create employee:", error);
				// TODO: Show error toast/notification
			},
		});
	};

	const submitButtonText =
		mode === "create" ? "Create Employee" : "Update Employee";

	return (
		<div className="relative">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* Personal Information Section */}
				<FieldSet>
					<FieldLegend variant="legend">Personal Information</FieldLegend>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<FieldContent>
								<Input id="email" type="email" {...register("email")} />
								<FieldError>{errors.email?.message}</FieldError>
							</FieldContent>
						</Field>

						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="firstName">First Name</FieldLabel>
								<FieldContent>
									<Input id="firstName" {...register("firstName")} />
									<FieldError>{errors.firstName?.message}</FieldError>
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="lastName">Last Name</FieldLabel>
								<FieldContent>
									<Input id="lastName" {...register("lastName")} />
									<FieldError>{errors.lastName?.message}</FieldError>
								</FieldContent>
							</Field>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="dateOfBirth">Date of Birth</FieldLabel>
								<FieldContent>
									<Input
										id="dateOfBirth"
										type="date"
										{...register("dateOfBirth")}
									/>
									<FieldError>{errors.dateOfBirth?.message}</FieldError>
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="placeOfBirth">Place of Birth</FieldLabel>
								<FieldContent>
									<Input id="placeOfBirth" {...register("placeOfBirth")} />
									<FieldError>{errors.placeOfBirth?.message}</FieldError>
								</FieldContent>
							</Field>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="mothersFirstName">
									Mother's First Name
								</FieldLabel>
								<FieldContent>
									<Input
										id="mothersFirstName"
										{...register("mothersFirstName")}
									/>
									<FieldError>{errors.mothersFirstName?.message}</FieldError>
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="mothersLastName">
									Mother's Last Name
								</FieldLabel>
								<FieldContent>
									<Input
										id="mothersLastName"
										{...register("mothersLastName")}
									/>
									<FieldError>{errors.mothersLastName?.message}</FieldError>
								</FieldContent>
							</Field>
						</div>

						<Field>
							<FieldLabel htmlFor="phone">Phone</FieldLabel>
							<FieldContent>
								<Input id="phone" type="tel" {...register("phone")} />
								<FieldError>{errors.phone?.message}</FieldError>
							</FieldContent>
						</Field>

						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="sex">Sex</FieldLabel>
								<FieldContent>
									<Select
										value={watch("sex")?.toString() ?? ""}
										onValueChange={(value) =>
											setValue("sex", Number.parseInt(value) as 0 | 1 | 2)
										}
									>
										<SelectTrigger id="sex">
											<SelectValue placeholder="Select sex" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="0">Female</SelectItem>
											<SelectItem value="1">Male</SelectItem>
											<SelectItem value="2">Unknown</SelectItem>
										</SelectContent>
									</Select>
									<FieldError>{errors.sex?.message}</FieldError>
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="education">Education</FieldLabel>
								<FieldContent>
									<Select
										value={watch("education")?.toString() ?? ""}
										onValueChange={(value) =>
											setValue(
												"education",
												Number.parseInt(value) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
											)
										}
									>
										<SelectTrigger id="education">
											<SelectValue placeholder="Select education" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="0">Elementary</SelectItem>
											<SelectItem value="1">Vocational School</SelectItem>
											<SelectItem value="2">Apprenticeship School</SelectItem>
											<SelectItem value="3">
												Vocational Secondary School
											</SelectItem>
											<SelectItem value="4">High School</SelectItem>
											<SelectItem value="5">College</SelectItem>
											<SelectItem value="6">University</SelectItem>
											<SelectItem value="7">Other</SelectItem>
										</SelectContent>
									</Select>
									<FieldError>{errors.education?.message}</FieldError>
								</FieldContent>
							</Field>
						</div>
					</FieldGroup>
				</FieldSet>

				<FieldSeparator />

				{/* Address Section */}
				<FieldSet>
					<FieldLegend variant="legend">Address</FieldLegend>
					<FieldGroup>
						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="country">Country</FieldLabel>
								<FieldContent>
									<Input id="country" {...register("country")} />
									<FieldError>{errors.country?.message}</FieldError>
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="zipCode">Zip Code</FieldLabel>
								<FieldContent>
									<Input id="zipCode" {...register("zipCode")} />
									<FieldError>{errors.zipCode?.message}</FieldError>
								</FieldContent>
							</Field>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="city">City</FieldLabel>
								<FieldContent>
									<Input id="city" {...register("city")} />
									<FieldError>{errors.city?.message}</FieldError>
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="parcelNumber">Parcel Number</FieldLabel>
								<FieldContent>
									<Input id="parcelNumber" {...register("parcelNumber")} />
									<FieldError>{errors.parcelNumber?.message}</FieldError>
								</FieldContent>
							</Field>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="administrativeArea">
									Administrative Area
								</FieldLabel>
								<FieldContent>
									<Input
										id="administrativeArea"
										{...register("administrativeArea")}
									/>
									<FieldError>{errors.administrativeArea?.message}</FieldError>
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="administrativeAreaType">
									Administrative Area Type
								</FieldLabel>
								<FieldContent>
									<Input
										id="administrativeAreaType"
										{...register("administrativeAreaType")}
									/>
									<FieldError>
										{errors.administrativeAreaType?.message}
									</FieldError>
								</FieldContent>
							</Field>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="houseNumber">House Number</FieldLabel>
								<FieldContent>
									<Input id="houseNumber" {...register("houseNumber")} />
									<FieldError>{errors.houseNumber?.message}</FieldError>
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="building">Building</FieldLabel>
								<FieldContent>
									<Input id="building" {...register("building")} />
									<FieldError>{errors.building?.message}</FieldError>
								</FieldContent>
							</Field>
						</div>

						<div className="grid grid-cols-3 gap-4">
							<Field>
								<FieldLabel htmlFor="staircase">Staircase</FieldLabel>
								<FieldContent>
									<Input id="staircase" {...register("staircase")} />
									<FieldError>{errors.staircase?.message}</FieldError>
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="floor">Floor</FieldLabel>
								<FieldContent>
									<Input id="floor" {...register("floor")} />
									<FieldError>{errors.floor?.message}</FieldError>
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="door">Door</FieldLabel>
								<FieldContent>
									<Input id="door" {...register("door")} />
									<FieldError>{errors.door?.message}</FieldError>
								</FieldContent>
							</Field>
						</div>
					</FieldGroup>
				</FieldSet>

				<FieldSeparator />

				{/* Payment Section */}
				<FieldSet>
					<FieldLegend variant="legend">Payment Information</FieldLegend>
					<FieldGroup>
						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="salary">Salary (HUF)</FieldLabel>
								<FieldContent>
									<Input
										id="salary"
										type="number"
										{...register("salary", { valueAsNumber: true })}
									/>
									<FieldError>{errors.salary?.message}</FieldError>
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="paymentMethod">Payment Method</FieldLabel>
								<FieldContent>
									<Select
										value={watch("paymentMethod")?.toString() ?? ""}
										onValueChange={(value) =>
											setValue(
												"paymentMethod",
												Number.parseInt(value) as 0 | 1 | 2,
											)
										}
									>
										<SelectTrigger id="paymentMethod">
											<SelectValue placeholder="Select payment method" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="0">Transfer</SelectItem>
											<SelectItem value="1">Cash</SelectItem>
											<SelectItem value="2">Dispatch</SelectItem>
										</SelectContent>
									</Select>
									<FieldError>{errors.paymentMethod?.message}</FieldError>
								</FieldContent>
							</Field>
						</div>

						{/* Conditional Payment Fields */}
						{paymentMethod === 0 && (
							<Field>
								<FieldLabel htmlFor="bankAccountNumber">
									Bank Account Number
								</FieldLabel>
								<FieldContent>
									<Input
										id="bankAccountNumber"
										{...register("bankAccountNumber")}
									/>
									<FieldError>{errors.bankAccountNumber?.message}</FieldError>
								</FieldContent>
							</Field>
						)}

						{paymentMethod === 1 && (
							<Field>
								<FieldLabel htmlFor="cashPaymentDay">
									Cash Payment Day
								</FieldLabel>
								<FieldContent>
									<Input
										id="cashPaymentDay"
										type="number"
										{...register("cashPaymentDay", { valueAsNumber: true })}
									/>
									<FieldError>{errors.cashPaymentDay?.message}</FieldError>
								</FieldContent>
							</Field>
						)}

						{paymentMethod === 2 && (
							<Field>
								<FieldLabel htmlFor="moneyDispatchAddress">
									Money Dispatch Address
								</FieldLabel>
								<FieldContent>
									<Input
										id="moneyDispatchAddress"
										{...register("moneyDispatchAddress")}
									/>
									<FieldError>
										{errors.moneyDispatchAddress?.message}
									</FieldError>
								</FieldContent>
							</Field>
						)}
					</FieldGroup>
				</FieldSet>

				{/* Bottom padding to prevent content from being hidden behind fixed button */}
				<div className="h-20" />
			</form>

			{/* Fixed submit button */}
			<div className="sticky bottom-0 left-0 right-0 z-10 border-t border-gray-200 bg-white px-6 py-4 shadow-lg">
				<div className="flex justify-end">
					<Button
						type="submit"
						disabled={createEmployeeMutation.isPending}
						onClick={handleSubmit(onSubmit)}
					>
						{createEmployeeMutation.isPending
							? "Submitting..."
							: submitButtonText}
					</Button>
				</div>
			</div>
		</div>
	);
};
