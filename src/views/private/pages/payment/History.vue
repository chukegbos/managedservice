<template>
  <div class="content-wrapper">
    <loading :active="isLoading && items.length === 0" />

    <div class="container">
      <div class="">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Payments History</h2>

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
            :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem"
          >
            <Column header="Product Name" style="width: 20%">
              <template #body="slotProps">
                {{
                  slotProps.data.product_name
                    ? slotProps.data.product_name
                    : ""
                }}<br />
                <b>Code:</b> #{{
                  slotProps.data.product_id ? slotProps.data.product_id : ""
                }}
              </template>
            </Column>
            <Column header="Member Name" style="width: 20%">
              <template #body="slotProps">
                {{ slotProps.data.member_name ? slotProps.data.member_name : ""
                }}<br />
                <b>Code:</b> #{{
                  slotProps.data.member_code ? slotProps.data.member_code : ""
                }}
              </template>
            </Column>
            <Column header="Payment Channel" style="width: 20%">
              <template #body="slotProps">
                {{
                  slotProps.data.paymentChannel
                    ? slotProps.data.paymentChannel
                    : "N/A"
                }}<br />
                <b>Amount: </b> <span v-html="nairaSign" />{{
                  formatPrice(slotProps.data.amount)
                }}
              </template>
            </Column>
            <Column header="Channel Process" style="width: 20%">
              <template #body="slotProps">
                {{
                  slotProps.data.channelProcess
                    ? slotProps.data.channelProcess
                    : "N/A"
                }}
              </template>
            </Column>
            <Column header="Creator" style="width: 20%">
              <template #body="slotProps">
                {{ slotProps.data.created_by ? slotProps.data.created_by : "" }}
                <br />
                {{ formatDate(slotProps.data.date_created) }}
              </template>
            </Column>
          </DataTable>
        </div>

        <div v-else>
          <div class="card card-body">
            <div class="alert alert-warning" role="alert">
              <p class="text-center">No Product available</p>
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
    .get("/payments/history")
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