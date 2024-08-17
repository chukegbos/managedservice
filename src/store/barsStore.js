import { defineStore } from "pinia";

export const useBarsStore = defineStore("bars", {
	state: () => ({
		bars: [],
		members: [],
		orders: [],
		channels: [],
		pos: [],
		banks: [],
		sales: [],
		bar_id: '',
	}),

	actions: {},
	persist: true,
});
