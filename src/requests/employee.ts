import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import {
	type CreateEmployeeRequest,
	type EmployeeDto,
	EmployeeDtoSchema,
	EmployeePaginationSchema,
	type GetEmployeesParams,
} from "@/types";
import { API_BASE_URL, requestHandler } from "@/utils";

/**
 * Query options for fetching Employees
 */

export const getEmployeesQueryOptions = (params?: GetEmployeesParams) =>
	queryOptions({
		queryKey: ["Employees", { ...params }],
		queryFn: () => getEmployeesRequest(params),
	});

/**
 * Get all employees
 * GET /api/employees
 * @throws {Error} When API request fails or validation fails
 */
export const getEmployeesRequest = async (params?: GetEmployeesParams) => {
	console.log(params);
	const getEmployees = requestHandler<GetEmployeesParams | undefined, unknown>(
		() => {
			return axios.get(`${API_BASE_URL}/api/employees`, { params });
		},
	);

	const result = await getEmployees(params);

	if (!result.status) {
		throw new Error(result.error?.message || "Failed to fetch employees");
	}

	const validate = EmployeePaginationSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);
		throw new Error("Failed to validate employees response");
	}

	return validate.data;
};

/**
 * Get employee by ID
 * GET /api/employees/{id}
 * @throws {Error} When API request fails or validation fails
 */
export const getEmployeeRequest = async (id: number) => {
	const getEmployee = requestHandler<undefined, unknown>(() => {
		return axios.get(`${API_BASE_URL}/api/employees/${id}`);
	});

	const result = await getEmployee();

	if (!result.status) {
		throw new Error(result.error?.message || "Failed to fetch employee");
	}

	const validate = EmployeeDtoSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);
		throw new Error("Failed to validate employee response");
	}

	return validate.data;
};

/**
 * Create employee
 * POST /api/employees
 * @throws {Error} When API request fails or validation fails
 */
export const createEmployeeRequest = async (props: CreateEmployeeRequest) => {
	const createEmployee = requestHandler<CreateEmployeeRequest, unknown>(() => {
		return axios.post(`${API_BASE_URL}/api/employees`, props);
	});

	const result = await createEmployee(props);

	if (!result.status) {
		throw new Error(result.error?.message || "Failed to create employee");
	}

	const validate = EmployeeDtoSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);
		throw new Error("Failed to validate employee response");
	}

	return validate.data;
};

/**
 * Update employee
 * PUT /api/employees/{id}
 * @throws {Error} When API request fails or validation fails
 */
export const updateEmployeeRequest = async (
	id: number,
	props: CreateEmployeeRequest,
) => {
	const updateEmployee = requestHandler<CreateEmployeeRequest, unknown>(() => {
		return axios.put(`${API_BASE_URL}/api/employees/${id}`, props);
	});

	const result = await updateEmployee(props);

	if (!result.status) {
		throw new Error(result.error?.message || "Failed to update employee");
	}

	const validate = EmployeeDtoSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);
		throw new Error("Failed to validate employee response");
	}

	return validate.data;
};

/**
 * Delete employee
 * DELETE /api/employees/{id}
 * @throws {Error} When API request fails or validation fails
 */
export const deleteEmployeeRequest = async (id: number) => {
	const deleteEmployee = requestHandler<undefined, unknown>(() => {
		return axios.delete(`${API_BASE_URL}/api/employees/${id}`);
	});

	const result = await deleteEmployee();

	if (!result.status) {
		throw new Error(result.error?.message || "Failed to delete employee");
	}

	const validate = EmployeeDtoSchema.safeParse(result.data);

	if (!validate.success) {
		console.error(validate.error);
		throw new Error("Failed to validate employee response");
	}

	return validate.data;
};

/**
 * Hook for creating an employee with automatic query invalidation
 * Invalidates the "Employees" query key to trigger a refetch of the employee list
 */
export const useCreateEmployee = () => {
	return useMutation({
		mutationFn: async (
			variables:
				| {
						mode: "create";
						employee: CreateEmployeeRequest;
				  }
				| {
						mode: "edit";
						employee: EmployeeDto;
						id: number;
				  },
		) => {
			if (variables.mode === "create") {
				return await createEmployeeRequest(variables.employee);
			}

			return await updateEmployeeRequest(variables.id, variables.employee);
		},
		meta: {
			invalidatesQuery: ["Employees"],
		},
	});
};

/**
 * Hook for deleting an employee with automatic query invalidation
 * Invalidates the "Employees" query key to trigger a refetch of the employee list
 */
export const useDeleteEmployee = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteEmployeeRequest,
		onSuccess: () => {
			// Invalidate all queries with the "Employees" key to trigger refetch
			queryClient.invalidateQueries({ queryKey: ["Employees"] });
		},
		meta: {
			invalidatesQuery: ["Employees"],
		},
	});
};
