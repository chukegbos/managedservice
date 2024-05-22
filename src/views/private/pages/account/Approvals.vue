<template>
  <div class="content-wrapper">
    <loading :active="isLoading && items.length === 0" />

    <div class="container">
      <div class="">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Pending Approvals</h2>

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
            <Column header="Tranx ID" style="width: 10%">
              <template #body="slotProps">
                #{{ slotProps.data.trans_id}}
              </template>
            </Column>

            <Column header="Partiular" style="width: 25%">
              <template #body="slotProps">
                {{ slotProps.data.description }}
              </template>
            </Column>

            <Column header="Amount" style="width: 20%">
              <template #body="slotProps">
                 <span v-html="nairaSign" />{{formatPrice(slotProps.data.amount)}}
              </template>
            </Column>

            <Column header="Status" style="width: 10%">
                <template #body="slotProps">
                    <span v-if="slotProps.data.statusValue=='Cr'" class="text-info">{{ slotProps.data.statusValue }}</span>
                    <span v-else class="text-danger">{{ slotProps.data.statusValue }}</span>
                </template>
            </Column>

            <Column header="Payment Method" style="width: 15%">
                <template #body="slotProps">
                    {{ slotProps.data.theChannel }}<br />
                    {{ slotProps.data.channelMethod }}
              </template>
            </Column>
            <Column header="Creator" style="width: 20%">
              <template #body="slotProps">
                {{ slotProps.data.creator }}
                <br />
                {{ formatDate(slotProps.data.created_at) }}
              </template>
            </Column>

            <Column header="Action" style="width: 10%">
                <template #body="slotProps">
                    <a href="#" @click="approve(slotProps.data.trans_id)" class="btn btn-info btn-sm text-white">Approve</a>
                </template>
            </Column>
          </DataTable>
        </div>

        <div v-else>
          <div class="card card-body">
            <div class="alert alert-warning" role="alert">
              <p class="text-center">No Pending Approval</p>
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
    .get("/accounting/approvals")
    .then((response) => {
      items.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const approve = async (id) => {
  isLoading.value = true;

  await axiosUrl
    .get("/accounting/approvals/" + id)
    .then((response) => {
      isLoading.value = false;
      swalSuccessHandle('Approved')
      getHistory();
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