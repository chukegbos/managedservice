import { defineStore } from "pinia";

export const useBarsStore = defineStore("bars", {
	state: () => ({
		bars: [],
		orders: [],
	}),

	actions: {},
	persist: true,
});
