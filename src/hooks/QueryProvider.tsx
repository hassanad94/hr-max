import {
	MutationCache,
	QueryClient,
	QueryClientProvider,
	type QueryKey,
} from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";

declare module "@tanstack/react-query" {
	interface Register {
		mutationMeta: {
			invalidatesQuery?: QueryKey;
		};
	}
}

export const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onSettled: (_data, _error, _variables, _context, mutation) => {
			if (mutation.meta?.invalidatesQuery) {
				queryClient.invalidateQueries({
					queryKey: mutation.meta?.invalidatesQuery,
				});
			}
		},
	}),
	defaultOptions: {
		queries: { staleTime: 0, retry: false },
	},
});
export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
