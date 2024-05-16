<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Bank Payments</h2>

          <div class="d-flex">
            <div class="me-3">
              <input
                v-model="filters['global'].value"
                placeholder="Keyword Search"
                class="form-control my-input"
              />
            </div>

            <div>
              <button
                v-if="selected.length > 0"
                @click="onSubmit('delete')"
                class="btn add-btn px-4"
              >
                <i class="fa-solid fa-minus"></i> Delete Bank
              </button>
              <button @click="openModal('add')" class="btn add-btn me-2 px-4">
                <i class="fa-solid fa-plus"></i> Add Bank
              </button>
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
            <Column style="width: 5%">
              <template #header="">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleAll()"
                />
              </template>
              <template #body="slotProps">
                <input
                  type="checkbox"
                  v-model="selected"
                  :value="slotProps.data.id"
                  number
                />
              </template>
            </Column>
            <Column field="bank_name" header="Bank Name" style="width: 20%">
              <template #body="slotProps">
                {{ slotProps.data.bank_name ? slotProps.data.bank_name : "N/A" }}
              </template>
            </Column>
            <Column field="account_name" header="Account Name" style="width: 20%">
              <template #body="slotProps">
                {{ slotProps.data.account_name ? slotProps.data.account_name : "N/A" }}
              </template>
            </Column>
            <Column field="account_number" header="Account Number" style="width: 20%">
              <template #body="slotProps">
                {{ slotProps.data.account_number ? slotProps.data.account_number : "N/A" }}
              </template>
            </Column>
            <Column header="Date Created" style="width: 20%">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.created_at) }}
              </template>
            </Column>
            <Column header="Action" style="width: 20%">
              <template #body="slotProps">
                <button
                  @click="
                    openModal('edit', slotProps.data.id, slotProps.data.name)
                  "
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
              <p class="text-center">No Bank available</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal name="bank-modal" :title="modalParams.title">
      <ModalContent>
        <form @submit.prevent="onSubmit(modalParams.title, currentEditID)">
          <div class="input-block mb-4 mx-3">
            <label class="col-form-label fs-6">Name</label>
            <input
              class="form-control"
              type="text"
              v-model="modalForm.name"
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
</template>

<script setup>
import { axiosUrl } from "@/env";
import { ref, reactive, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useAuthStore } from "@/store/authStore";
import { formatDate, swalErrorHandle } from "@/components/myHelperFunction";
import { Modal, ModalContent, open, close } from "@dimsog/vue-modal";

const isLoading = ref(false);
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const items = ref([]);
const selected = ref([]);
const selectAll = ref("");
const currentEditID = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const modalParams = reactive({
  title: "",
});
const modalForm = reactive({
  name: "",
  club_code: loggedInUser.club_code,
});

const openModal = (type, id, name) => {
  if (type === "add") modalParams.title = "Add Bank";
  else if (type === "edit") {
    modalParams.title = "Edit Bank";
    modalForm.name = name;
    currentEditID.value = id;
  }

  open("bank-modal");
};

const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < items.value.length; i++)
      selected.value.push(items.value[i].id);
  else selected.value = [];
};

const getBank = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/payments/bank")
    .then((response) => {
      items.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error)
    });
};

const onSubmit = async (type, id) => {
  let url = "";
  let payload = {};
  if (type === "Add Bank") {
    url = "payments/bank";
    payload = modalForm;
  } else if (type === "delete") {
    url = "payments/bank";
    payload = {
      payload: selected.value,
    };
  } else if (type === "Edit Bank") {
    url = "payments/bank/" + id;
    payload = modalForm;
  } else return;

  close("bank-modal");
  isLoading.value = true;

  await axiosUrl
    .post(url, payload)
    .then(() => {
      isLoading.value = false;

      if (type === "Add Bank" || type === "Edit Bank") {
        modalForm.name = "";
        modalParams.title = "";
      } else if (type === "delete") {
        selected.value = [];
        selectAll.value = false;
      }

      getBank();
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error)
    });
};

onMounted(() => {
  getBank();
});
</script>

<style scoped>
</style>