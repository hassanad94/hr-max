import { z } from "zod";
import { UserGroupSchema } from "./enums";

/**
 * Base User schema with all fields
 */
export const BaseUserSchema = z.object({
	id: z.number(),
	password: z.string().nullable(),
	username: z.string().nullable(),
	firstName: z.string().nullable(),
	lastName: z.string().nullable(),
	group: UserGroupSchema,
	lastActive: z.string().nullable(),
	created: z.string(),
});

/**
 * UserDto schema
 * Represents a user entity returned from the API
 * Omits password field for security
 */
export const UserSchema = BaseUserSchema.omit({ password: true });

export type User = z.infer<typeof UserSchema>;

/**
 * Get users query parameters schema
 */
export const GetUsersParamsSchema = z.object({
	Search: z.string().optional(),
	OrderBy: z.string().optional(),
	Limit: z.number().optional(),
	Offset: z.number().optional(),
});

export type GetUsersParams = z.infer<typeof GetUsersParamsSchema>;

/**
 * User pagination response schema
 */
export const UserPaginationSchema = z.object({
	data: z.array(UserSchema).nullable(),
	total: z.number(),
});

export type UserPagination = z.infer<typeof UserPaginationSchema>;
