<template>
  <div class="pt-3">
    <Loading :active="loading" />

    <div class="container-fluid pb-0">
      <h3 class="fs-6"> Total Amount - 1000</h3>
      <h3 class="fs-6">Total Sale -
        <NairaSymbol /> 400
      </h3>
    </div>

    <div>
      <div class="mb-3">
        <input v-model="filters['global'].value" placeholder="Keyword Search" class="form-control my-input" />
      </div>

      <DataTable v-if="bars[id]?.items.length > 0" class="shadow mb-5" v-model:filters="filters" :value="bars[id].items"
        :sortField="'name'" :sortOrder="1" stripedRows paginator :rows="20" :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 600px; text-transform: capitalize;">
        <Column field="name" :sortable="true" header="Name" style="width: 30%">
          <template #body="{ data }">
            {{ data["name"] ? data["name"] : "N/A" }}
          </template>
        </Column>
        <Column field="number" :sortable="true" header="number" style="width: 30%">
          <template #body="{ data }">
            {{ data["number"] ? data["number"] : "N/A" }}
          </template>
        </Column>
        <Column field="amount_sold" :sortable="true" header="Amount Sold" style="width: 30%">
          <template #body="{ data }">
            <NairaSymbol />
            {{ data["amount_sold"] ? data["amount_sold"] : "N/A" }}
          </template>
        </Column>
      </DataTable>

      <div v-else class="mt-2 text-center">
        <span v-if="!loading">No Data Found 🥲</span>
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
const { bars } = storeToRefs(barsStore)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(() => {
});

const getData = async () => {
  loading.value = true;

  await axiosUrl
    .get("/")
    .then((response) => {

      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;
      swalErrorHandle(error);
    });
};

onMounted(() => {
  id.value = route.params.id
});
</script>

<style scoped></style>