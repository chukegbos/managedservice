<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="">
        <div class="d-flex justify-content-between align-items-center mt-3">
          <h2 class="mb-0">Wallet Accounts</h2>

          <div class="d-flex">
            <div class="me-3">
              <input
                v-model="filters['global'].value"
                placeholder="Keyword Search"
                class="form-control my-input"
              />
            </div>

            <div></div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div v-if="walletAccount.length > 0 && canRead()">
          <DataTable
            class="shadow"
            v-model:filters="filters"
            :value="walletAccount"
            :sortField="'created_at'"
            showGridlines
            paginator
            :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem"
          >
            <Column header="Reference ID">
              <template #body="slotProps">
                <span class="text-info">{{ slotProps.data.member }}</span
                ><br />
                #{{ slotProps.data.ref_id }}
              </template>
            </Column>
            <Column header="Type">
              <template #body="slotProps">
                {{ slotProps.data.type }}
              </template>
            </Column>

            <Column header="Amount" style="width: 20%">
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.amount) }}
              </template>
            </Column>

            <Column header="Payment Method" style="width: 20%">
              <template #body="slotProps">
                {{ slotProps.data.channel }}<br />
                {{ slotProps.data.process }}
              </template>
            </Column>

            <Column header="Status">
              <template #body="slotProps">
                <span v-if="slotProps.data.payment_type == 0"> - </span>
                <span v-else>
                  <span v-if="slotProps.data.status == 0">
                    {{ slotProps.data.approval_status }}<br />
                    <button
                      @click="approve(slotProps.data.id)"
                      class="btn btn-warning btn-sm"
                    >
                      Approve
                    </button>
                  </span>

                  <span v-else> Approved </span>
                </span>
              </template>
            </Column>

            <Column header="Created By">
              <template #body="slotProps">
                {{ slotProps.data.creator }}<br />{{
                  formatDate(slotProps.data.created_at)
                }}
              </template>
            </Column>

            <Column header="Updated By">
              <template #body="slotProps">
                <span v-if="slotProps.data.updater">
                  {{ slotProps.data.updater }}<br />{{
                    formatDate(slotProps.data.updated_at)
                  }}
                </span>
              </template>
            </Column>
          </DataTable>
        </div>

        <div v-else>
          <div class="card card-body">
            <div class="alert alert-warning" role="alert">
              <p class="text-center">No Wallet Information Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { axiosUrl } from "@/env";
import { ref, reactive, onMounted, computed } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useAuthStore } from "@/store/authStore";
import {
  formatDate,
  formatPrice,
  swalErrorHandle,
  swalSuccessHandle,
} from "@/components/myHelperFunction";
import {
  canCreate,
  canUpdate,
  canDelete,
  canRead,
  canApprove,
  canReject,
} from "@/components/permission_restriction.js";
import { Modal, ModalContent, open, close } from "@dimsog/vue-modal";

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const isLoading = ref(false);
const nairaSign = "&#x20A6;";
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const walletAccount = ref([]);
const selected = ref([]);
const selectAll = ref("");

const getData = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/members/wallet")
    .then((response) => {
      walletAccount.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const approve = async (id) => {
  let url = "members/wallet/" + id;

  isLoading.value = true;

  await axiosUrl
    .get(url)
    .then(() => {
      isLoading.value = false;
      location.reload();
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

onMounted(() => {
  getData();
});
</script>

<style>
@media only screen and (min-width: 992px) {
  .modal {
    width: 750px !important;
    height: 400px !important;
  }
}
</style>