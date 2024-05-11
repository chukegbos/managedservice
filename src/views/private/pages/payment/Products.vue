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
                <i class="fa-solid fa-minus"></i> Delete
              </button>
              <button
                v-else
                class="btn add-btn px-4"
              >
                <i class="fa-solid fa-minus"></i> Delete
              </button>
              <button @click="visible = true" class="btn add-btn me-2 px-4">
                <i class="fa-solid fa-plus"></i> Add 
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
            <Column header="Name" style="width: 20%">
              <template #body="slotProps">
                {{ slotProps.data.payment_name }}<br><b>Code:</b> #{{ slotProps.data.product_id }}
              </template>
            </Column>
            <Column header="Amount" style="width: 20%">
              <template #body="slotProps">
                <span v-html="nairaSign"></span>{{ formatPrice(slotProps.data.amount) }}<br>
                <b>Grace Period:</b>  {{ slotProps.data.grace_period }}days
              </template>
            </Column>
            <Column header="Status" style="width: 25%">
              <template #body="slotProps">
                <span>
                  <b>Door Access:</b>  
                  <span v-if="slotProps.data.door_access==1"> Yes </span>
                  <span v-else> No </span>
                </span>
                <br>
               
                <span>
                  <b>Type of product:</b>  
                  <span v-if="slotProps.data.type==1"> Monthly </span>
                  <span v-else> One Off </span>
                 <span v-if="slotProps.data.type==1"> <b>Reoccuring Day:</b>  {{ slotProps.data.reoccuring_day }} date</span>
                </span>
              </template>
            </Column>
            <Column header="Creator" style="width: 15%">
              <template #body="slotProps">
                {{ slotProps.data.creator }}<br>
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

    <Dialog v-model:addVisible="visible" modal header="Add Product" :style="{ width: '25rem' }">
        <form @submit.prevent="onSubmit(modalParams.title, currentEditID)">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="col-form-label fs-6">Product Name</label>
              <input
                class="form-control"
                type="text"
                v-model="addProductData.payment_name"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="col-form-label fs-6">Amount</label>
              <input
                class="form-control"
                type="number"
                v-model="addProductData.amount"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="col-form-label fs-6">Door Access</label>
              <select v-model="addProductData.door_access" class="form-control" required>
                  <option value=null> -- Select Type-- </option>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="col-form-label fs-6">Grace Period</label>
              <input
                class="form-control"
                type="number"
                v-model="addProductData.grace_period"
                required
              />
            </div>
          </div>
          <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="addVisible = false"></Button>
            <Button type="button" label="Save" @click="addVisible = false"></Button>
          </div>
        </form>
    </Dialog>
  </div>
</template>

<script setup>
import { axiosUrl } from "@/env";
import { ref, reactive, onMounted, computed } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useAuthStore } from "@/store/authStore";
import { formatDate, formatPrice, swalErrorHandle } from "@/components/myHelperFunction";
import { Modal, ModalContent, open, close } from "@dimsog/vue-modal";


const isLoading = ref(false);
const nairaSign = "&#x20A6;";
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const items = ref([]);
const selected = ref([]);
const selectAll = ref("");
const actionValue = ref("");
const currentEditID = ref();
const addVisible = ref(false);
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