<template>
  <div class="mx-3 pt-3">
    <div class="container-fluid pb-0">
      <h3 class="fs-6"> Total Amount - 1000</h3>
      <h3 class="fs-6">Total Sale - N400</h3>
    </div>

    <div class="row mb-xl-4">
      <DataTable v-if="!isObjectEmpty(barData)" class="shadow" v-model:filters="filters" :value="barData"
        :sortField="'Date Sent for Approval'" :sortOrder="-1" stripedRows paginator :rows="20"
        :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 800px; text-transform: capitalize;">
        <Column field="Document No_" :sortable="true" header="Document ID" style="width: 20%">
          <template #body="{ data }">
            {{ data["Document No_"] ? data["Document No_"] : "N/A" }}
          </template>
        </Column>
        <Column field="Document Type" :sortable="true" header="Document Type" style="width: 20%">
          <template #body="{ data }">
            {{ data["Document Type"] ? data["Document Type"] : "N/A" }}
          </template>
        </Column>
        <Column field="Request Unit" :sortable="true" header="Requested By" style="width: 25%">
          <template #body="{ data }">
            {{ data["Request Unit"] ? data["Request Unit"] : "N/A" }}
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
import { useAuthStore } from "@/store/authStore";
import { axiosUrl } from "@/env";
import { formatDate, swalErrorHandle, isObjectEmpty } from "@/components/myHelperFunction";

const loading = ref(false);
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const barData = ref([])

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