import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: null,
		// tokenExpiration: null,
		loggedInUser: {},
		currentClub: {},
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
		clearToken() {
			this.token = null;
			// this.tokenExpiration = null;
			this.loggedInUser = null;
			this.currentClub = null;
		},
	},
	persist: true,
});
