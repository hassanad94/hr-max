import { z } from "zod";
import { BaseEmployeeSchema, BaseUserSchema } from "@/types";

/**
 * LoginRequest schema
 * Both username and password are nullable strings as per API specification
 */
export const LoginRequestSchema = z.object({
	username: z.string().nullable(),
	password: z.string().nullable(),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

/**
 * CreateEmployeeRequest schema
 * Uses BaseEmployeeSchema - all fields are nullable as per API specification
 */
export const CreateEmployeeRequestSchema = BaseEmployeeSchema;

export type CreateEmployeeRequest = z.infer<typeof CreateEmployeeRequestSchema>;

/**
 * CreateUserRequest schema
 * Omits id, lastActive, and created fields (server-generated)
 */
export const CreateUserRequestSchema = BaseUserSchema.omit({
	id: true,
	lastActive: true,
	created: true,
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
