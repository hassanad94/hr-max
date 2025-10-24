import axios from "axios";
import {
	type CreateUserRequest,
	type GetUsersParams,
	UserPaginationSchema,
	UserSchema,
} from "@/types";
import { API_BASE_URL, requestHandler } from "@/utils";

/**
 * Get all users
 * GET /api/users
 * @throws {Error} When API request fails or validation fails
 */
export const getUsersRequest = async (params?: GetUsersParams) => {
	const getUsers = requestHandler<
		GetUsersParams | undefined,
		unknown
	>(() => {
		return axios.get(`${API_BASE_URL}/api/users`, { params });
	});

	const result = await getUsers(params);

	if (!result.status) {
		throw new Error(result.error?.message || "Failed to fetch users");
	}

	const validate = UserPaginationSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);
		throw new Error("Failed to validate users response");
	}

	return validate.data;
};

/**
 * Get user by ID
 * GET /api/users/{id}
 * @throws {Error} When API request fails or validation fails
 */
export const getUserRequest = async (id: number) => {
	const getUser = requestHandler<undefined, unknown>(() => {
		return axios.get(`${API_BASE_URL}/api/users/${id}`);
	});

	const result = await getUser();

	if (!result.status) {
		throw new Error(result.error?.message || "Failed to fetch user");
	}

	const validate = UserSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);
		throw new Error("Failed to validate user response");
	}

	return validate.data;
};

/**
 * Create user
 * POST /api/users
 * @throws {Error} When API request fails or validation fails
 */
export const createUserRequest = async (props: CreateUserRequest) => {
	const createUser = requestHandler<CreateUserRequest, unknown>(
		() => {
			return axios.post(`${API_BASE_URL}/api/users`, props);
		},
	);

	const result = await createUser(props);

	if (!result.status) {
		throw new Error(result.error?.message || "Failed to create user");
	}

	const validate = UserSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);
		throw new Error("Failed to validate user response");
	}

	return validate.data;
};

/**
 * Update user
 * PUT /api/users/{id}
 * @throws {Error} When API request fails or validation fails
 */
export const updateUserRequest = async (
	id: number,
	props: CreateUserRequest,
) => {
	const updateUser = requestHandler<CreateUserRequest, unknown>(() => {
		return axios.put(`${API_BASE_URL}/api/users/${id}`, props);
	});

	const result = await updateUser(props);

	if (!result.status) {
		throw new Error(result.error?.message || "Failed to update user");
	}

	const validate = UserSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);
		throw new Error("Failed to validate user response");
	}

	return validate.data;
};

/**
 * Delete user
 * DELETE /api/users/{id}
 * @throws {Error} When API request fails or validation fails
 */
export const deleteUserRequest = async (id: number) => {
	const deleteUser = requestHandler<undefined, unknown>(() => {
		return axios.delete(`${API_BASE_URL}/api/users/${id}`);
	});

	const result = await deleteUser();

	if (!result.status) {
		throw new Error(result.error?.message || "Failed to delete user");
	}

	const validate = UserSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);
		throw new Error("Failed to validate user response");
	}

	return validate.data;
};
