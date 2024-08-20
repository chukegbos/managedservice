<template>
    <div class="content-wrapper">
      <loading :active="isLoading || isLoading2" />
  
      <div class="container">
        <div class="">
          <div class="d-flex justify-content-between align-sales-center">
            <h2>All Sales</h2>
  
            <div class="d-flex">
              <div class="me-3">
                <input
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                  class="form-control my-input"
                />
              </div>
            </div>
          </div>
        </div>
  
        <div class="mt-4">
          <div v-if="sales.length > 0">
            <DataTable
              class="shadow"
              v-model:filters="filters"
              :value="sales"
              :sortField="'created_at'"
              showGridlines
              paginator
              :rows="10"
              :rowsPerPageOptions="[5, 10, 20, 50]"
              tableStyle="min-width: 50rem"
            >
              <Column style="width: 5%">
                <template #header="">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="toggleAll()"
                  />
                </template>
                <template #body="{ data }">
                  <input
                    type="checkbox"
                    v-model="selected"
                    :value="data.id"
                    number
                  />
                </template>
              </Column>
              <Column field="name" header="Name" style="width: 40%">
                <template #body="{ data }">
                  {{ data.payment_name ? data.payment_name : "N/A" }}
                </template>
              </Column>
              <Column header="Date Created" style="width: 35%">
                <template #body="{ data }">
                  {{ formatDate(data.created_at) }}
                </template>
              </Column>
              <Column header="Action" style="width: 20%">
                <template #body="{ data }">
                  <button
                    @click="openModal('edit', data.id, data.name)"
                    class="btn btn-warning btn-sm m-1 text-white px-4"
                  >
                    Edit
                  </button>
                </template>
              </Column>
            </DataTable>
          </div>
  
          <div v-else>
            <div class="card card-body">
              <div class="alert alert-warning" role="alert">
                <p class="text-center">No sale available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { axiosUrl } from "@/env";
  import { ref, reactive, onMounted } from "vue";
  import { FilterMatchMode } from "primevue/api";
  import { useAuthStore } from "@/store/authStore";
  import { formatDate, swalErrorHandle } from "@/components/myHelperFunction";
  
  const isLoading = ref(false);
  const isLoading2 = ref(false);
  const authStore = useAuthStore();
  const loggedInUser = authStore.loggedInUser;
  const sales = ref([]);

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  
  
  const getSales = async () => {
    isLoading.value = true;
  
    await axiosUrl
      .get("/sale")
      .then((response) => {
        sales.value = response.data.data;
        isLoading.value = false;
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  };

  
  onMounted(() => {
    getSales();
  });
  </script>
  
  <style scoped>
  </style>