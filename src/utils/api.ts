import type { AxiosResponse } from "axios";
import axios from "axios";

export type ApiResponse<T> = {
	status: boolean;
	data: T;
};

type BaseRequest<T, V> = (params?: T) => Promise<AxiosResponse<V>>;
type BaseResponse<V> = Promise<
	{ status: true; data: V } | ErrorResponse
>;

export type ErrorResponse = {
	status: false;
	error?: AppError;
};

export type AppError = {
	id: string | null;
	message: string | null;
	detailedMessage: string | null;
	errorObject: Record<string, unknown> | null;
};

export const requestHandler =
	<T, V>(request: BaseRequest<T, V>) =>
	async (params?: T): BaseResponse<V> => {
		try {
			const response = await request(params);

			return { status: true, data: response.data };
		} catch (e: unknown) {
			if (axios.isAxiosError<AppError>(e)) {
				return {
					status: false,
					error: e.response?.data,
				};
			}
			return {
				status: false,
				error: {
					id: null,
					message: e instanceof Error ? e.message : "Unknown error occurred",
					detailedMessage: null,
					errorObject: null,
				},
			};
		}
	};
