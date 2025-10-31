import { z } from "zod";

/**
 * Sex enum
 * 0 = Female
 * 1 = Male
 * 2 = Unknown
 */
export const SexSchema = z.number().int().min(0).max(2);

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
export const EducationSchema = z.number().int().min(0).max(7);

export type Education = z.infer<typeof EducationSchema>;

/**
 * PaymentMethod enum
 * 0 = Transfer
 * 1 = Cash
 * 2 = Dispatch
 */
export const PaymentMethodSchema = z.number().int().min(0).max(2);

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

/**
 * UserGroup enum
 * 0 = Group0
 * 1 = Group1
 */
export const UserGroupSchema = z.number().int().min(0).max(1);

export type UserGroup = z.infer<typeof UserGroupSchema>;
