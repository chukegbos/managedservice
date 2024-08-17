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
				path: "/bar",
				name: "BarPage",
				component: () => import("@/views/private/pages/BarPage.vue"),
			},

			{
				path: "/sales",
				name: "SalesPage",
				component: () => import("@/views/private/pages/Sales.vue"),
			},


			{
				path: "/place-order",
				name: "PlaceOrder",
				component: () => import("@/views/private/pages/PlaceOrder.vue"),
			},
			{
				path: "/shopping-cart",
				name: "ShoppingCart",
				component: () => import("@/views/private/pages/ShoppingCart.vue"),
			},

			{
				path: "/order/:id",
				name: "OrderPage",
				component: () => import("@/views/private/pages/OrderPage.vue"),
			},

			{
				path: "/receipt/:code",
				name: "Receipt",
				component: () => import("@/views/private/pages/Receipt.vue"),
			},
			
			{
				path: "/change-password",
				name: "ChangePassword",
				component: () =>
					import("@/views/private/pages/PasswordView.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
