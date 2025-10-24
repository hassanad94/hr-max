import type { z } from "zod";
import { BaseEmployeeSchema } from "./employee";

/**
 * CreateEmployeeRequest schema
 * Uses BaseEmployeeSchema - all fields are nullable as per API specification
 */
export const CreateEmployeeRequestSchema = BaseEmployeeSchema;

export type CreateEmployeeRequest = z.infer<typeof CreateEmployeeRequestSchema>;

/**
 * UpdateEmployeeRequest schema
 * Same as CreateEmployeeRequest - all fields are optional/nullable
 */
export const UpdateEmployeeRequestSchema = BaseEmployeeSchema;

export type UpdateEmployeeRequest = z.infer<typeof UpdateEmployeeRequestSchema>;
