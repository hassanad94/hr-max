import axios from "axios";
import { type LoginRequest, type User, UserSchema } from "@/types";
import { API_BASE_URL, requestHandler } from "@/utils";

/**
 * Login request
 * POST /api/auth/login
 */
export const loginRequest = async (props: LoginRequest) => {
	const login = requestHandler<LoginRequest, unknown>(() => {
		return axios.post(`${API_BASE_URL}/api/auth/login`, props);
	});

	const result = await login(props);

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
 * Logout request
 * POST /api/auth/logout
 */
export const logoutRequest = async () => {
	const logout = requestHandler<undefined, User>(() => {
		return axios.post(`${API_BASE_URL}/api/auth/logout`);
	});

	const result = await logout();

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
 * Get current user request
 * GET /api/auth/me
 */
export const getCurrentUserRequest = async () => {
	const getMe = requestHandler<undefined, User>(() => {
		return axios.get(`${API_BASE_URL}/api/auth/me`);
	});

	const result = await getMe();

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
