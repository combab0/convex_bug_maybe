import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const convexClient = new ConvexReactClient("http://127.0.0.1:3212");
	const convexQueryClient = new ConvexQueryClient(convexClient);
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryFn: convexQueryClient.queryFn(),
				queryKeyHashFn: convexQueryClient.hashFn(),
			},
		},
	});
	convexQueryClient.connect(queryClient);

	const router = createRouter({
		routeTree,
		context: { queryClient, convexClient, convexQueryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		Wrap: ({ children }) => (
			<ConvexProvider client={convexClient}>{children}</ConvexProvider>
		),
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
