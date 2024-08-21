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
            <DataTable v-if="sales.length > 0" class="shadow mb-5" v-model:filters="filters" :value="sales"
            :sortField="'number'" :sortOrder="-1" stripedRows paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" >
                <Column field="sale_code" :sortable="false" header="Sale Code">
                    <template #body="{ data }">
                        <span class="text-info"><b>#{{ data["sale_code"] }} </b></span>
                    </template>
                </Column>
                
                <Column field="bar" :sortable="false" header="Sale Code">
                    <template #body="{ data }">
                        <span class="text-success"><b>{{ data["bar"].name }}</b></span><br>
                        {{ data["bar"].bar_code }}
                    </template>
                </Column>

                <Column field="channel" :sortable="false" header="Mode of payment">
                    <template #body="{ data }">
                        <span class="text-success"><b>{{ data["channel"].name }}</b></span><br>
                        {{ data["mode_of_payment"] }}
                    </template>
                </Column>
                <Column field="total" :sortable="false" header="Total">
                    <template #body="{ data }">
                        {{ formatCurrency(data["total"]) }}
                    </template>
                </Column>  
                <Column field="created_at" :sortable="false" header="Date Created">
                    <template #body="{ data }">
                            <span class="text-success">{{ formatDate(data.created_at) }}</span>
                    </template>
                </Column>  
                <Column field="sale_code" :sortable="false" header="Action">
                    <template #body="{ data }">
                        <router-link :to="'/receipt/' + data.sale_code" class="btn btn-info btn-sm text-white">
                            View
                        </router-link>
                    </template>
                </Column>  
            </DataTable>
  
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
  import { swalErrorHandle } from "@/components/myHelperFunction";
  
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

  const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        }).format(value).replace('NGN', '');
    }
   
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const ordinalSuffix = (n) => {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return s[(v - 20) % 10] || s[v] || s[0];
        };

        return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
    }
  
  onMounted(() => {
    getSales();
  });
  </script>
  
  <style scoped>
  </style>