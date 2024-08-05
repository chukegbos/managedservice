<template>
  <div class="content-wrapper">
    <loading :active="isLoading || isLoading2" />

    <div class="container">
      <div class="">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Supply Management</h2>

          <div class="d-flex">
            <div class="me-3">
              <input
                v-model="filters['global'].value"
                placeholder="Keyword Search"
                class="form-control my-input"
              />
            </div>

            <div class="d-flex align-items-end">
              <!-- <button
                v-if="selected.length > 0"
                @click="onSubmit('delete')"
                class="btn add-btn px-4"
              > -->
              <button
                @click="onSubmit('delete')"
                class="btn btn-sm btn-danger add-btn px-4 me-2"
              >
                <i class="fa-solid fa-minus"></i> Delete Supply
              </button>
              <button
                @click="openModal('add')"
                class="btn btn-sm btn-success add-btn px-4"
              >
                <i class="fa-solid fa-plus"></i> Add Supply
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
              <p class="text-center">No supply available</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal name="supply-management-modal" :title="modalParams.title">
      <ModalContent>
        <form
          @submit.prevent="onSubmit(modalParams.title, currentEditID)"
          class="container"
        >
          <div class="row fs-14 align-items-end">
            <div class="input-block col-12 col-md-6">
              <label class="col-form-label fs-6">Supplier Name</label>
              <input
                class="form-control"
                type="text"
                v-model="modalForm.supplier_name"
                required
              />
            </div>

            <div class="input-block col-12 col-md-6">
              <label class="col-form-label fs-6">Contact Person</label>
              <input
                class="form-control"
                type="text"
                v-model="modalForm.contact_person"
                required
              />
            </div>

            <div class="input-block col-12 col-md-6">
              <label class="col-form-label fs-6">Email</label>
              <input
                class="form-control"
                type="email"
                v-model="modalForm.email"
                required
              />
            </div>

            <div class="input-block col-12 col-md-6">
              <label class="col-form-label fs-6">Phone Number</label>
              <input
                class="form-control"
                type="text"
                v-model="modalForm.phone"
                required
              />
            </div>

            <div class="input-block col-12">
              <label class="col-form-label fs-6">Address</label>
              <input
                class="form-control"
                type="text"
                v-model="modalForm.address"
                required
              />
            </div>

            <div class="input-block col-12 col-md-6">
              <label class="col-form-label fs-6">Bank Name <span class="text-primary"><small>Lorem, ipsum</small></span></label>
              <input
                class="form-control"
                type="text"
                v-model="modalForm.bank_name"
                required
              />
            </div>

            <div class="input-block col-12 col-md-6">
              <label class="col-form-label fs-6">Account Number</label>
              <input
                class="form-control"
                type="text"
                v-model="modalForm.bank_account"
                required
              />
            </div>

            <div class="col-12">
              <button class="btn btn-primary account-btn w-100" type="submit">
                Submit
              </button>
            </div>
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
const isLoading2 = ref(false);
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
  supplier_name: "",
  contact_person: "",
  email: "",
  phone: null,
  address: "",
  bank_name: "",
  bank_account: null,
  account_name: "",
});

const openModal = (type, id, name) => {
  if (type === "add") modalParams.title = "Add Supply";
  else if (type === "edit") {
    modalParams.title = "Edit Supply";
    modalForm.name = name;
    currentEditID.value = id;
  }

  open("supply-management-modal");
};

const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < items.value.length; i++)
      selected.value.push(items.value[i].id);
  else selected.value = [];
};

const getSupplyManagement = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/suppliers")
    .then((response) => {
      items.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const getAllBanks = async () => {
  isLoading2.value = true;

  await axiosUrl
    .get("/allbanks")
    .then((response) => {
      banks.value = response.data.data;
      isLoading2.value = false;
    })
    .catch((error) => {
      isLoading2.value = false;
      swalErrorHandle(error);
    });
};

const onSubmit = async (type, id) => {
  let url = "/suppliers";
  let payload = {};
  if (type === "Add Supply") {
    url = "suppliers";
    payload = modalForm;
  } else if (type === "delete") {
    url = "/suppliers";
    payload = {
      ids: selected.value,
    };
  } else if (type === "Edit Supply") {
    url = "/suppliers" + id;
    payload = modalForm;
  } else return;

  close("supply-management-modal");
  isLoading.value = true;
  if (type === "delete") {
    await axiosUrl
      .delete(url, { data: payload })
      .then(() => {
        isLoading.value = false;
        selected.value = [];
        selectAll.value = false;
        getSupplyManagement();
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  } else if (type === "Edit Supply") {
    await axiosUrl
      .put(url, payload)
      .then(() => {
        isLoading.value = false;

        modalForm.name = "";
        modalParams.title = "";

        getSupplyManagement();
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  } else {
    await axiosUrl
      .post(url, payload)
      .then(() => {
        isLoading.value = false;

        modalForm.name = "";
        modalParams.title = "";

        getSupplyManagement();
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  }
};

onMounted(() => {
  getSupplyManagement();
  getAllBanks();
});
</script>

<style scoped>
</style>