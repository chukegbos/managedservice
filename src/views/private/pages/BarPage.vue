<template>
  <div class="mx-3 pt-3">
    <div class="container-fluid pb-0">
      <h3 class="fs-6"> Total Amount - 1000</h3>
      <h3 class="fs-6">Total Sale - <NairaSymbol /> 400</h3>
    </div>

    <div>
      <div class="mb-3">
        <input v-model="filters['global'].value" placeholder="Keyword Search" class="form-control my-input" />
      </div>

      <DataTable v-if="bars[route.params.id]?.items.length > 0" class="shadow mb-5" v-model:filters="filters"
        :value="bars[route.params.id].items" :sortField="'name'" :sortOrder="1" stripedRows paginator :rows="20"
        :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 600px; text-transform: capitalize;">
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

    <div class="fixed-bottom">
      <div class="d-flex bg-secondary">
        <div class="w-50 border-end py-2">
          <p class="text-center text-white mb-0">Order</p>
        </div>
        <div class="w-50 h-100 py-2">
          <p class="text-center text-white mb-0">Sale</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { FilterMatchMode } from 'primevue/api';
import { useAuthStore } from "@/store/authStore";
import { useBarsStore } from "@/store/barsStore";
import { axiosUrl } from "@/env";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { formatDate, swalErrorHandle, isObjectEmpty } from "@/components/myHelperFunction";

const loading = ref(false);
const authStore = useAuthStore();
const barsStore = useBarsStore();
const loggedInUser = authStore.loggedInUser;
const route = useRoute()
const { bars } = storeToRefs(barsStore)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(() => {
  if (window.innerWidth >= 1100)
    document.querySelectorAll(".page-header")[0].style.width = "1000px";
});

const getData = async () => {
  loading.value = true;

  await axiosUrl
    .get("/dashboard")
    .then((response) => {

      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;
      swalErrorHandle(error);
    });
};

onMounted(() => {
  // getData();
});
</script>

<style scoped>
.dash-widget-icon {
  background-color: #004aad;
  color: #FFFFFF;
  font-size: 20px;
  height: 40px;
  line-height: 60px;
  margin-right: 10px;
  text-align: center;
  width: 40px;
  border-radius: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  justify-content: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
}
</style>