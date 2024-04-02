import { createRouter, createWebHistory } from "vue-router";

export const isLoggedIn = () => {
	// return localStorage.getItem("token");
	return true;
};

const routes = [
	{
		path: "/login",
		name: "LoginPage",
		component: () => import("@/views/Auth/LoginPage.vue"),
	},

	{
		path: "/private",
		component: () => import("@/views/private/PrivatePage.vue"),
		beforeEnter(to, from, next) {
			if (isLoggedIn()) {
				next();
			} else {
				next("/login");
			}
		},

		children: [
			{
				path: "/",
				name: "DashBoard",
				component: () =>
					import("@/views/private/pages/DashboardPage.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
