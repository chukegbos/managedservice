import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: null,
		tokenExpiration: null,
		loggedInUser: {},
	}),
	actions: {
		getUserToken(token) {
			this.token = token;
		},
		getUserTokenExpiresAt(tokenExpiration) {
			this.tokenExpiration = tokenExpiration;
		},
		getCurrentUser(loggedInUser) {
			this.loggedInUser = loggedInUser;
		},
		clearToken() {
			this.token = null;
			this.tokenExpiration = null;
			this.loggedInUser = null;
		},
	},
	persist: true,
});
