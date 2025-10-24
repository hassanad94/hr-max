import { z } from "zod";
import { UserGroupSchema } from "@/types";

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
