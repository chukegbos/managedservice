import { createRouter, createWebHistory } from "vue-router";

export const isLoggedIn = () => {
	return localStorage.getItem("token");
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
				beforeEnter(to, from, next) {
					if (isLoggedIn()) {
						next();
					} else {
						next("/login");
					}
				},
			},

			{
				path: "/members",
				name: "Members",
				component: () =>
					import("@/views/private/pages/members/Index.vue"),
				beforeEnter(to, from, next) {
					if (isLoggedIn()) {
						next();
					} else {
						next("/login");
					}
				},
			},

			{
				path: "/members/sections",
				name: "Sections",
				component: () =>
					import("@/views/private/pages/members/Section.vue"),
				beforeEnter(to, from, next) {
					if (isLoggedIn()) {
						next();
					} else {
						next("/login");
					}
				},
			},

			{
				path: "/members/types",
				name: "Types",
				component: () =>
					import("@/views/private/pages/members/Type.vue"),
				beforeEnter(to, from, next) {
					if (isLoggedIn()) {
						next();
					} else {
						next("/login");
					}
				},
			},

			{
				path: "/payment/banks",
				name: "PaymentBanks",
				component: () =>
					import("@/views/private/pages/payment/Banks.vue"),
				beforeEnter(to, from, next) {
					if (isLoggedIn()) {
						next();
					} else {
						next("/login");
					}
				},
			},

			{
				path: "/payment/pos",
				name: "PaymentPOS",
				component: () =>
					import("@/views/private/pages/payment/POS.vue"),
				beforeEnter(to, from, next) {
					if (isLoggedIn()) {
						next();
					} else {
						next("/login");
					}
				},
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
