import { query } from "./_generated/server";

export const get = query({
	handler: async () => {
		console.log(
			"this should be called once on server during ssr but twice on client during hydration",
		);
		return "hello";
	},
});
