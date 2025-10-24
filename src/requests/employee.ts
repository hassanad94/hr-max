import axios from "axios";
import {
	type CreateEmployeeRequest,
	EmployeeDtoSchema,
	EmployeePaginationSchema,
	type GetEmployeesParams,
} from "@/types";
import { API_BASE_URL, requestHandler } from "@/utils";

/**
 * Get all employees
 * GET /api/employees
 */
export const getEmployeesRequest = async (params?: GetEmployeesParams) => {
	const getEmployees = requestHandler<GetEmployeesParams | undefined, unknown>(
		() => {
			return axios.get(`${API_BASE_URL}/api/employees`, { params });
		},
	);

	const result = await getEmployees(params);

	if (!result.status) {
		return null;
	}

	const validate = EmployeePaginationSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);

		return null;
	}

	return validate.data;
};

/**
 * Get employee by ID
 * GET /api/employees/{id}
 */
export const getEmployeeRequest = async (id: number) => {
	const getEmployee = requestHandler<undefined, unknown>(() => {
		return axios.get(`${API_BASE_URL}/api/employees/${id}`);
	});

	const result = await getEmployee();

	if (!result.status) {
		return null;
	}

	const validate = EmployeeDtoSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);

		return null;
	}

	return validate.data;
};

/**
 * Create employee
 * POST /api/employees
 */
export const createEmployeeRequest = async (props: CreateEmployeeRequest) => {
	const createEmployee = requestHandler<
		CreateEmployeeRequest,
		unknown
	>(() => {
		return axios.post(`${API_BASE_URL}/api/employees`, props);
	});

	const result = await createEmployee(props);

	if (!result.status) {
		return null;
	}

	const validate = EmployeeDtoSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);

		return null;
	}

	return validate.data;
};

/**
 * Update employee
 * PUT /api/employees/{id}
 */
export const updateEmployeeRequest = async (
	id: number,
	props: CreateEmployeeRequest,
) => {
	const updateEmployee = requestHandler<
		CreateEmployeeRequest,
		unknown
	>(() => {
		return axios.put(`${API_BASE_URL}/api/employees/${id}`, props);
	});

	const result = await updateEmployee(props);

	if (!result.status) {
		return null;
	}

	const validate = EmployeeDtoSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);

		return null;
	}

	return validate.data;
};

/**
 * Delete employee
 * DELETE /api/employees/{id}
 */
export const deleteEmployeeRequest = async (id: number) => {
	const deleteEmployee = requestHandler<undefined, unknown>(() => {
		return axios.delete(`${API_BASE_URL}/api/employees/${id}`);
	});

	const result = await deleteEmployee();

	if (!result.status) {
		return null;
	}

	const validate = EmployeeDtoSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);

		return null;
	}

	return validate.data;
};
