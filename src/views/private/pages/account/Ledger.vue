<template>
    <div class="content-wrapper">
        <loading :active="isLoading && items.length === 0" />

        <div class="container">
            <div class="row">
                <div class="col-md-3 col-6 mb-3">
                    <h2>General Ledger</h2>
                </div>
            </div>

            <div class="mt-4">
            <div v-if="items.length > 0">
                <DataTable
                    :value="items"
                    showGridlines
                    paginator
                    :rows="20"
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                >
                    <Column header="Date" style="width: 15%">
                        <template #body="slotProps">
                            {{ formatDate(slotProps.data.created_at) }}
                        </template>
                    </Column>

                    <Column header="Particular" style="width: 25%">
                        <template #body="slotProps">
                            {{ slotProps.data.description }}
                        </template>
                    </Column>

                    <Column header="DR/CR" style="width: 10%">
                        <template #body="slotProps">
                            <span v-if="slotProps.data.statusValue=='Cr'" class="text-info">{{ slotProps.data.statusValue }}</span>
                            <span v-else class="text-danger">{{ slotProps.data.statusValue }}</span>
                        </template>
                    </Column>

                    <Column header="Account Name" style="width: 15%">
                        <template #body="slotProps">
                            {{ slotProps.data.account }}
                        </template>
                    </Column>

                    <Column header="Post Ref" style="width: 10%">
                        <template #body="slotProps">
                            #{{ slotProps.data.trans_id}}
                        </template>
                    </Column>

                    <Column header="Debit" style="width: 15%">
                        <template #body="slotProps">
                            <span v-if="slotProps.data.statusValue=='Dr'">
                                <span v-html="nairaSign" />{{ formatPrice(slotProps.data.amount) }}
                            </span>
                        </template>
                    </Column>

                    <Column header="Credit" style="width: 15%">
                        <template #body="slotProps">
                            <span v-if="slotProps.data.statusValue=='Cr'">
                                <span v-html="nairaSign" />{{ formatPrice(slotProps.data.amount) }}
                            </span>
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
import { ref,  reactive, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useAuthStore } from "@/store/authStore";
import {
  formatDate,
  formatPrice,
  formatDay,
  swalErrorHandle,
  swalSuccessHandle,
} from "@/components/myHelperFunction";
import { Modal, ModalContent, open, close } from "@dimsog/vue-modal";

const isLoading = ref(false);
const nairaSign = "&#x20A6;";
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const accounts = ref([]);
const items = ref([]);


const getHistory = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/accounting/entries/ledger")
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