<template>
  <div class="container">
    <Loading :active="loading" />

    <div>
      <h4 class="text-center my-2"><b>Create Order</b></h4>
      <div v-for="item in bars[id]?.items" :key="item.id" class="item">
        <span>{{ item.name }} - ${{ item.price }}</span>
        <button @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>

    <MobileFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from 'primevue/api';
import { useBarsStore } from "@/store/barsStore";
import { axiosUrl } from "@/env";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import MobileFooter from "@/components/MobileFooter.vue";
import { swalErrorHandle } from "@/components/myHelperFunction";
const id = ref()
const loading = ref(false);
const barsStore = useBarsStore();
const route = useRoute()
// const id = ref(null)
const { bars, bar_id } = storeToRefs(barsStore)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});


onMounted(() => {
  id.value = route.query.id
});
</script>

<style scoped></style>