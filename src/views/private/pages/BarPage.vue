<template>
  <div class="container">
    <Loading :active="loading" />

    <div>
      <div class="mb-3">
        <input v-model="filters['global'].value" placeholder="Keyword Search" class="form-control my-input" />
      </div>
      
      <DataTable v-if="bars[id]?.items.length > 0" class="shadow mb-5" v-model:filters="filters" :value="bars[id].items"
        :sortField="'name'" :sortOrder="1" stripedRows paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" >
        <Column field="name" :sortable="true" header="All Drinks">
          <template #body="{ data }">
            <span class="text-info"><b>{{ data["name"] }} </b></span>
            <br>Amount: <NairaSymbol /> {{ data["amount_sold"] }}
            <br>
            Quantity: <span class="text-success">{{ data["number"] }}</span>
          </template>
        </Column>
       
      </DataTable>

      <div v-else class="mt-2 text-center text-danger">
        <span v-if="!loading">No Drink Available</span>
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

const loading = ref(false);
const barsStore = useBarsStore();
const route = useRoute()
const id = ref(null)
const { bars, bar_id } = storeToRefs(barsStore)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});


onMounted(() => {
  bar_id.value = route.query.id
});
</script>

<style scoped></style>