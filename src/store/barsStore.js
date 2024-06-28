import { defineStore } from "pinia";

export const useBarsStore = defineStore("bars", {
	state: () => ({
		bars: [],
	}),

	actions: {},
	persist: true,
});
