import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
	component: Component,
});

function Component() {
	return <Outlet />;
}
