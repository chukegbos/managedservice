<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Payments Products</h2>

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
                <i class="fa-solid fa-minus"></i> Delete Product
              </button>
              <button @click="openModal('add')" class="btn add-btn me-2 px-4">
                <i class="fa-solid fa-plus"></i> Add Product
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
            <Column field="name" header="Name" style="width: 40%">
              <template #body="slotProps">
                {{ slotProps.data.name ? slotProps.data.name : "N/A" }}
              </template>
            </Column>
            <Column header="Date Created" style="width: 35%">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.created_at) }}
              </template>
            </Column>
            <Column header="Action" style="width: 20%">
              <template>
                <!-- <button
                  @click="
                    openModal('edit', slotProps.data.id, slotProps.data.name)
                  "
                  class="btn btn-warning btn-sm m-1 text-white px-4"
                >
                  Edit
                </button> -->
                <Dropdown
                  v-model="actionValue"
                  optionLabel="name"
                  optionValue="id"
                  @change="checkSelectedAction(actionValue)"
                  :options="options"
                />
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

    <Modal name="Product-modal" :title="modalParams.title">
      <ModalContent>
        <form @submit.prevent="onSubmit(modalParams.title, currentEditID)">
          <div class="d-flex">
            <div class="input-block mb-4 mx-3 w-50">
              <label class="col-form-label fs-6">Product Name</label>
              <input
                class="form-control"
                type="text"
                v-model="addProductData.payment_name"
                required
              />
            </div>
            <div class="input-block mb-4 mx-3 w-50">
              <label class="col-form-label fs-6">Amount</label>
              <input
                class="form-control"
                type="number"
                v-model="addProductData.amount"
                required
              />
            </div>
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
const actionValue = ref("");
const currentEditID = ref();
const addProductData = reactive({
  payment_name: "",
  amount: null,
  door_access: null,
  grace_period: null,
  type: null,
  reoccuring_day: null,
});
const options = [
  {
    id: "1",
    name: "Edit",
  },
  {
    id: "2",
    name: "Delete",
  },
  {
    id: "3",
    name: "Group Debit",
  },
];
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

const checkSelectedAction = (id) => {
  if (id === "1") {
    openModal("edit", id, "Edit Product");
  } else if (id === "2") {
    onSubmit("delete", id);
  } else if (id === "3") {
    onSubmit("group debit", id);
  }
};

const openModal = (type, id, name) => {
  if (type === "add") modalParams.title = "Add Product";
  else if (type === "edit") {
    modalParams.title = "Edit Product";
    modalForm.name = name;
    currentEditID.value = id;
  }

  open("Product-modal");
};

const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < items.value.length; i++)
      selected.value.push(items.value[i].id);
  else selected.value = [];
};

const getProducts = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/payments/products")
    .then((response) => {
      items.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const onSubmit = async (type, id) => {
  let url = "";
  let payload = {};
  if (type === "Add Product") {
    url = "payments/products";
    payload = modalForm;
  } else if (type === "delete") {
    url = "payments/products";
    payload = {
      payload: selected.value,
    };
  } else if (type === "Edit Product") {
    url = "payments/products/" + id;
    payload = modalForm;
  } else return;
  s;

  close("product-modal");
  isLoading.value = true;

  await axiosUrl
    .post(url, payload)
    .then(() => {
      isLoading.value = false;

      if (type === "Add Product" || type === "Edit Product") {
        modalForm.name = "";
        modalParams.title = "";
      } else if (type === "delete") {
        selected.value = [];
        selectAll.value = false;
      }

      getProducts();
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

onMounted(() => {
  getProducts();
});
</script>

<style scoped>
</style>