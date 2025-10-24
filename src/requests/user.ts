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
 */
export const getUsersRequest = async (params?: GetUsersParams) => {
	const getUsers = requestHandler<GetUsersParams | undefined, unknown>(() => {
		return axios.get(`${API_BASE_URL}/api/users`, { params });
	});

	const result = await getUsers(params);

	if (!result.status) {
		return null;
	}

	const validate = UserPaginationSchema.safeParse(result.data.Result);

	if (!validate.success) {
		console.error(validate.error);

		return null;
	}

	return validate.data;
};

/**
 * Get user by ID
 * GET /api/users/{id}
 */
export const getUserRequest = async (id: number) => {
	const getUser = requestHandler<undefined, unknown>(() => {
		return axios.get(`${API_BASE_URL}/api/users/${id}`);
	});

	const result = await getUser();

	if (!result.status) {
		return null;
	}

	const validate = UserSchema.safeParse(result.data.Result);

	if (!validate.success) {
		console.error(validate.error);

		return null;
	}

	return validate.data;
};

/**
 * Create user
 * POST /api/users
 */
export const createUserRequest = async (props: CreateUserRequest) => {
	const createUser = requestHandler<CreateUserRequest, unknown>(() => {
		return axios.post(`${API_BASE_URL}/api/users`, props);
	});

	const result = await createUser(props);

	if (!result.status) {
		return null;
	}

	const validate = UserSchema.safeParse(result.data.Result);

	if (!validate.success) {
		console.error(validate.error);

		return null;
	}

	return validate.data;
};

/**
 * Update user
 * PUT /api/users/{id}
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
		return null;
	}

	const validate = UserSchema.safeParse(result.data.Result);

	if (!validate.success) {
		console.error(validate.error);

		return null;
	}

	return validate.data;
};

/**
 * Delete user
 * DELETE /api/users/{id}
 */
export const deleteUserRequest = async (id: number) => {
	const deleteUser = requestHandler<undefined, unknown>(() => {
		return axios.delete(`${API_BASE_URL}/api/users/${id}`);
	});

	const result = await deleteUser();

	if (!result.status) {
		return null;
	}

	const validate = UserSchema.safeParse(result.data.Result);

	if (!validate.success) {
		console.error(validate.error);

		return null;
	}

	return validate.data;
};
