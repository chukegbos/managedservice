import { defineStore } from "pinia";

export const useBarsStore = defineStore("bars", {
	state: () => ({
		bars: [],
		members: [],
		orders: [],
		bar_id: '',
	}),

	actions: {},
	persist: true,
});
