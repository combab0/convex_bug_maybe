import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../../convex/_generated/api";

export const Route = createFileRoute("/_layout/")({
	component: RouteComponent,
});

function RouteComponent() {
	useSuspenseQuery({
		queryKey: ["index"],
		queryFn: () => {
			console.log("this should be called once on server during ssr");
			return "index";
		},
	});
	useSuspenseQuery(convexQuery(api.hello.get, {}));
	return <div>Hello "/"!</div>;
}
