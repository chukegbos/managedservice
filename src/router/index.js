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
				path: "/change-password",
				name: "ChangePassword",
				component: () =>
					import("@/views/private/pages/PasswordView.vue"),
			},
			{
				path: "/members",
				name: "Members",
				component: () =>
					import("@/views/private/pages/members/Members.vue"),
			},
			// {
			// 	path: "/members/view/:membershipID",
			// 	name: "MemberView",
			// 	component: () =>
			// 		import("@/views/private/pages/members/MemberView.vue"),
			// },

			{
				path: "/members/view",
				name: "MemberView",
				component: () =>
					import("@/views/private/pages/members/MemberView.vue"),
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
				path: "/members/debts",
				name: "Debtedness",
				component: () =>
					import("@/views/private/pages/members/MemberDebt.vue"),
			},

			{
				path: "/members/debt-free",
				name: "DebtFree",
				component: () =>
					import("@/views/private/pages/members/MemberDebtFree.vue"),
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
				name: "PaymentProducts",
				component: () =>
					import("@/views/private/pages/payment/Products.vue"),
			},
			{
				path: "/payment/debits",
				name: "PaymentDebit",
				component: () =>
					import("@/views/private/pages/payment/Debit.vue"),
			},
			{
				path: "/payment/history",
				name: "PaymentsHistory",
				component: () =>
					import("@/views/private/pages/payment/History.vue"),
			},
			{
				path: "/wallet",
				name: "Wallet",
				component: () =>
					import("@/views/private/pages/payment/Wallet.vue"),
			},
			{
				path: "/admins",
				name: "Admin",
				component: () =>
					import("@/views/private/pages/admin/Admin.vue"),
			},

			{
				path: "/accounting/approvals",
				name: "Approvals",
				component: () =>
					import("@/views/private/pages/account/Approvals.vue"),
			},
			{
				path: "/accounting/entries",
				name: "Entries",
				component: () =>
					import("@/views/private/pages/account/Entry.vue"),
			},
			{
				path: "/accounting/accounts",
				name: "accounts",
				component: () =>
					import("@/views/private/pages/account/Account.vue"),
			},
			{
				path: "/accounting/ledger",
				name: "PaymentHistory",
				component: () =>
					import("@/views/private/pages/account/Ledger.vue"),
			},

			//bars
			{
				path: "/bars",
				name: "Bars",
				component: () => import("@/views/private/pages/bars/Bars.vue"),
			},

			//Supply Management
			{
				path: "/supply-management",
				name: "SupplyManagement",
				component: () =>
					import(
						"@/views/private/pages/supplier management/SupplyManagement.vue"
					),
			},

			{
				path: "/bars/requests/:request_code",
				name: "Bar Request",
				component: () =>
					import("@/views/private/pages/bars/BarRequestProcess.vue"),
			},

			{
				path: "/bars/all-requests",
				name: "All Request",
				component: () =>
					import("@/views/private/pages/bars/AllRequest.vue"),
			},

			{
				path: "/bars/:bar_code",
				name: "BarView",
				component: () =>
					import("@/views/private/pages/bars/BarView.vue"),
			},

			{
				path: "/sales",
				name: "Sales",
				component: () =>
					import("@/views/private/pages/sales/Allsales.vue"),
			},

			{
				path: "/receipt/:code",
				name: "Receipt",
				component: () =>
					import("@/views/private/pages/sales/Receipt.vue"),
			},

			{
				path: "/purchase",
				name: "PurchasePage",
				component: () =>
					import("@/views/private/pages/purchase/PurchasePage.vue"),
			},

			{
				path: "/purchase-single/:id",
				name: "PurchaseSingle",
				component: () =>
					import("@/views/private/pages/purchase/PurchaseSingle.vue"),
			},

			{
				path: "/create-purchase",
				name: "CreatePurchasePage",
				component: () =>
					import(
						"@/views/private/pages/purchase/CreatePurchasePage.vue"
					),
			},

			{
				path: "/inventory/product-categories",
				name: "InventoryCategory",
				component: () =>
					import(
						"@/views/private/pages/inventory/InventoryCategory.vue"
					),
			},

			{
				path: "/inventories/products",
				name: "Inventory",
				component: () =>
					import("@/views/private/pages/inventory/Inventory.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
