import { z } from "zod";

/**
 * Sex enum
 * 0 = Female
 * 1 = Male
 * 2 = Unknown
 */
export const SexSchema = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export type Sex = z.infer<typeof SexSchema>;

/**
 * Education enum
 * 0 = Elementary
 * 1 = VocationalSchool
 * 2 = ApprenticeshipSchool
 * 3 = VocationalSecondarySchool
 * 4 = HighSchool
 * 5 = College
 * 6 = University
 * 7 = Other
 */
export const EducationSchema = z.union([
	z.literal(0),
	z.literal(1),
	z.literal(2),
	z.literal(3),
	z.literal(4),
	z.literal(5),
	z.literal(6),
	z.literal(7),
]);

export type Education = z.infer<typeof EducationSchema>;

/**
 * PaymentMethod enum
 * 0 = Transfer
 * 1 = Cash
 * 2 = Dispatch
 */
export const PaymentMethodSchema = z.union([
	z.literal(0),
	z.literal(1),
	z.literal(2),
]);

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

/**
 * UserGroup enum
 * 0 = Group0
 * 1 = Group1
 */
export const UserGroupSchema = z.union([z.literal(0), z.literal(1)]);

export type UserGroup = z.infer<typeof UserGroupSchema>;
