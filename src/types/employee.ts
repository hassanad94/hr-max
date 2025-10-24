import { z } from "zod";
import { EducationSchema, PaymentMethodSchema, SexSchema } from "@/types";

/**
 * Base Employee schema
 * Contains all common fields shared between EmployeeDto and request schemas
 */
export const BaseEmployeeSchema = z.object({
	email: z.string().nullable(),
	firstName: z.string().nullable(),
	lastName: z.string().nullable(),
	dateOfBirth: z.string().nullable(),
	placeOfBirth: z.string().nullable(),
	mothersFirstName: z.string().nullable(),
	mothersLastName: z.string().nullable(),
	country: z.string().nullable(),
	zipCode: z.string().nullable(),
	parcelNumber: z.string().nullable(),
	city: z.string().nullable(),
	administrativeArea: z.string().nullable(),
	administrativeAreaType: z.string().nullable(),
	houseNumber: z.string().nullable(),
	building: z.string().nullable(),
	staircase: z.string().nullable(),
	floor: z.string().nullable(),
	door: z.string().nullable(),
	phone: z.string().nullable(),
	sex: SexSchema.nullable().optional(),
	education: EducationSchema.nullable().optional(),
	paymentMethod: PaymentMethodSchema.nullable().optional(),
	bankAccountNumber: z.string().nullable(),
	moneyDispatchAddress: z.string().nullable(),
	cashPaymentDay: z.int().nullable(),
	salary: z.int().nullable(),
});

/**
 * EmployeeDto schema
 * Represents an employee entity returned from the API
 * Extends BaseEmployeeSchema with an 'id' field
 */
export const EmployeeDtoSchema = BaseEmployeeSchema.extend({
	id: z.int(),
});

export type EmployeeDto = z.infer<typeof EmployeeDtoSchema>;
