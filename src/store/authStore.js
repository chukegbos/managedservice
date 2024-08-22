import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: null,
		// tokenExpiration: null,
		loggedInUser: {},
		currentClub: {},
		allRoles: {},
	}),
	actions: {
		getUserToken(token) {
			this.token = token;
		},
		// getUserTokenExpiresAt(tokenExpiration) {
		// 	this.tokenExpiration = tokenExpiration;
		// },
		getCurrentUser(loggedInUser) {
			this.loggedInUser = loggedInUser;
		},
		getCurrentClub(currentClub) {
			this.currentClub = currentClub;
		},

		getRoles(allRoles) {
			this.allRoles = allRoles;
		},

		clearToken() {
			this.token = null;
			// this.tokenExpiration = null;
			this.loggedInUser = null;
			this.currentClub = null;
		},
	},
	persist: true,
});
