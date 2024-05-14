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
			},
			{
				path: "/members",
				name: "Members",
				component: () =>
					import("@/views/private/pages/members/Index.vue"),
			},
			{
				path: "/members",
				name: "Members",
				component: () =>
					import("@/views/private/pages/members/Members.vue"),
			},
			{
				path: "/members/create",
				name: "MembersCreate",
				component: () =>
					import("@/views/private/pages/members/MembersCreate.vue"),
			},
			{
				path: "/members/sections",
				name: "Sections",
				component: () =>
					import("@/views/private/pages/members/Section.vue"),
			},
			{
				path: "/members/types",
				name: "Types",
				component: () =>
					import("@/views/private/pages/members/Type.vue"),
			},
			{
				path: "/payment/banks",
				name: "PaymentBanks",
				component: () =>
					import("@/views/private/pages/payment/Banks.vue"),
			},
			{
				path: "/payment/pos",
				name: "PaymentPOS",
				component: () =>
					import("@/views/private/pages/payment/POS.vue"),
			},
			{
				path: "/payment/products",
				name: "PaymentPOS",
				component: () =>
					import("@/views/private/pages/payment/Products.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
