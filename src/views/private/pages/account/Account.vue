<template>
  <div class="content-wrapper">
    <loading :active="isLoading && items.length === 0" />

    <div class="container">
      <div class="">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Accounts</h2>

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
        <div v-if="items.length > 0">
          <DataTable
            class="shadow"
            v-model:filters="filters"
            :value="items"
            :sortField="'created_at'"
            showGridlines
            paginator
            :rows="20"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem"
          >
            <Column header="Account Name" style="width: 20%">
              <template #body="slotProps">
                {{
                  slotProps.data.name
                }}
              </template>
            </Column>
            <Column header="Account Type" style="width: 20%">
                <template #body="slotProps">
                    {{ slotProps.data.account_type }}
                </template>
            </Column>
            <Column header="Account Type" style="width: 20%">
                <template #body="slotProps">
                    <span v-html="nairaSign" />{{ formatPrice(slotProps.data.amount) }}
                </template>
            </Column>
          </DataTable>
        </div>

        <div v-else>
          <div class="card card-body">
            <div class="alert alert-warning" role="alert">
              <p class="text-center">No Payment History Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { axiosUrl } from "@/env";
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useAuthStore } from "@/store/authStore";
import {
  formatDate,
  formatPrice,
  swalErrorHandle,
  swalSuccessHandle,
} from "@/components/myHelperFunction";

const isLoading = ref(false);
const nairaSign = "&#x20A6;";
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const items = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const getHistory = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/accounting/accounts")
    .then((response) => {
      items.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

onMounted(() => {
  getHistory();
});
</script>

<style>
</style>