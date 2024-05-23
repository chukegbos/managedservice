<template>
    <div class="content-wrapper">
        <loading :active="isLoading && items.length === 0" />

        <div class="container">
            <div class="row">
                <div class="col-md-3 col-6 mb-3">
                    <h2>All Entries</h2>
                </div>

                <div class="col-md-3 col-6 mb-3">
                    <button @click="openModal()" class="btn add-btn me-2 px-4">
                        <i class="fa-solid fa-plus"></i> Add Entry
                    </button>
                </div>

                <div class="col-md-6 col-12 mb-3">
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

                    <Column header="Particular" style="width: 30%">
                    <template #body="slotProps">
                        {{ slotProps.data.description }}
                    </template>
                    </Column>

                    <Column header="Amount" style="width: 20%">
                    <template #body="slotProps">
                        <span v-html="nairaSign" />{{formatPrice(slotProps.data.amount)}}
                    </template>
                    </Column>

                    <Column header="Account Type" style="width: 20%">
                    <template #body="slotProps">
                        {{ slotProps.data.account }}
                    </template>
                    </Column>

                    <Column header="Status" style="width: 6%">
                        <template #body="slotProps">
                            <span v-if="slotProps.data.statusValue=='Cr'" class="text-info">{{ slotProps.data.statusValue }}</span>
                            <span v-else class="text-danger">{{ slotProps.data.statusValue }}</span>
                        </template>
                    </Column>

                    <Column header="Creator" style="width: 20%">
                    <template #body="slotProps">
                        {{ slotProps.data.creator }}
                        <br />
                        {{ formatDate(slotProps.data.created_at) }}
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

            <Modal name="section-modal" :title="modalParams.title">
                <ModalContent>
                    <form @submit.prevent="onSubmit()">

                        <div class="input-block mb-4 mx-3">
                            <label class="col-form-label fs-6">Account</label>
                            <select
                                v-model="modalForm.account_id"
                                class="form-control"
                                required
                            >
                                <option value="null">-- Select Account--</option>
                                <option v-for="data in accounts" :key="data" :value="data.id">
                                    {{ data["name"] }} ({{ data["account_type"] }})
                                </option>
                            </select>
                        </div>

                        <div class="input-block mb-4 mx-3">
                            <label class="col-form-label fs-6">Particular</label>
                            <input
                            class="form-control"
                            type="text"
                            v-model="modalForm.particular"
                            required
                            />
                        </div>

                        <div class="input-block mb-4 mx-3">
                            <label class="col-form-label fs-6">Amount</label>
                            <input
                            class="form-control"
                            type="number"
                            v-model="modalForm.amount"
                            required
                            />
                        </div>

                    <div class="mx-3">
                        <button class="btn btn-primary account-btn w-100" type="submit">
                        Submit
                        </button>
                    </div>
                    </form>
                </ModalContent>
            </Modal>

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
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const modalParams = reactive({
  title: "",
});
const modalForm = reactive({
  account_id: "",
  particular: "",
  amount: 0
});

const getHistory = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/accounting/entries")
    .then((response) => {
      items.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const getAccounts = async () => {
  await axiosUrl
    .get("/accounting/accounts")
    .then((response) => {
      accounts.value = response.data.data;
    })
    .catch((error) => {
      swalErrorHandle(error);
    });
};

const openModal = () => {
  modalParams.title = "Add Entry"
  open("section-modal");
};

const onSubmit = async () => {
    let url = "/accounting/entries";
    let payload = modalForm;
    isLoading.value = true;
  close("section-modal");
 

  await axiosUrl
    .post(url, payload)
    .then((response) => {
        isLoading.value = false;
        swalSuccessHandle(response.data.message);
        getHistory();
        getAccounts();
    })
    .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
    });
};

onMounted(() => {
  getHistory();
  getAccounts();
});
</script>

<style>
</style>