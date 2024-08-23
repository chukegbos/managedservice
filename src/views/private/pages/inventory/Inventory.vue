<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="">
        <div class="d-flex justify-content-between align-items-center mt-3">
          <h2 class="mb-0">Product Inventories</h2>

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
                v-if="canDelete()"
                @click="onSubmit('delete-m')"
                class="btn btn-danger add-btn px-4 mr-2"
              >
                <i class="fa-solid fa-minus"></i> Delete
              </button>
              <!-- <button v-else class="btn add-btn px-4">
                  <i class="fa-solid fa-minus"></i> Delete
                </button> -->
              <!-- <button @click="visible = true" class="btn add-btn me-2 px-4">
                  < Add
                </button> -->
              <button
                v-if="canCreate()"
                @click="openModal('add')"
                class="btn btn-success add-btn me-2 px-4 ml-2s"
              >
                <i class="fa-solid fa-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div v-if="items.length > 0 && canRead()">
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
            <Column header="Product Code" style="width: 20%">
              <template #body="slotProps">
                {{
                  slotProps.data.product_code ? slotProps.data.product_code : ""
                }}
              </template>
            </Column>
            <Column header="Product" style="width: 20%">
              <template #body="slotProps">
                {{
                  slotProps.data.product_name ? slotProps.data.product_name : ""
                }}
              </template>
            </Column>
            <Column header="Category" style="width: 15%">
              <template #body="slotProps">
                {{
                  slotProps.data.category.name
                    ? slotProps.data.category.name
                    : ""
                }}
              </template>
            </Column>
            <Column header="Quantity" style="width: 15%">
              <template #body="slotProps">
                {{ slotProps.data.quantity ? slotProps.data.quantity : 0 }}
              </template>
            </Column>
            <Column header="Per. Crate" style="width: 10%">
              <template #body="slotProps">
                {{
                  slotProps.data.number_per_pack
                    ? slotProps.data.number_per_pack
                    : ""
                }}
              </template>
            </Column>
            <Column header="Unit" style="width: 10%">
              <template #body="slotProps">
                {{ slotProps.data.unit ? slotProps.data.unit : "" }}
              </template>
            </Column>
            <!-- <Column header="Threshold" style="width: 20%">
                <template #body="slotProps">
                  {{
                    slotProps.data.threshold
                      ? slotProps.data.threshold
                      : ""
                  }}
                </template>
              </Column> -->
            <Column header="Cost Price" style="width: 20%">
              <template #body="slotProps">
                {{
                  slotProps.data.cost_price
                    ? formatCurrency(slotProps.data.cost_price)
                    : formatCurrency(0)
                }}
              </template>
            </Column>
            <Column header="Selling Price" style="width: 20%">
              <template #body="slotProps">
                {{
                  slotProps.data.sell_price
                    ? formatCurrency(slotProps.data.sell_price)
                    : formatCurrency(0)
                }}
              </template>
            </Column>
            <Column header="Date Created" style="width: 15%">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.created_at) }}
              </template>
            </Column>
            <Column header="Action" style="width: 15%">
              <template #body="slotProps">
                <Dropdown
                  @change="
                    checkSelectedAction(
                      actionValue[slotProps.data.id],
                      slotProps.data
                    )
                  "
                  class="w-100"
                  v-model="actionValue[slotProps.data.id]"
                  optionLabel="name"
                  optionValue="id"
                  :options="dynamicOptions"
                  placeholder="Action"
                />
              </template>
            </Column>
          </DataTable>
        </div>

        <div v-else>
          <div class="card card-body">
            <div class="alert alert-warning" role="alert">
              <p class="text-center">No Inventory available</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalComp
      :isToggled="isToggled"
      :title="modalParams.title"
      @close="isToggled = false"
    >
      <form
        @submit.prevent="onSubmit(modalParams.title, currentEditID)"
        style="width: 95%; margin: 0 auto"
      >
        <div class="row fs-14 align-items-end">
          <div class="col-12 mb-3">
            <label class="col-form-label fs-6">Product Name</label>
            <input
              class="form-control"
              type="text"
              v-model="inventoryData.product_name"
              required
            />
          </div>
          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6"> Product Category </label>
            <Dropdown
              class="w-100"
              v-model="inventoryData.category_id"
              optionLabel="name"
              optionValue="id"
              :options="categories"
              :disabled="categoryLoading || categories.length === 0"
              filter
              placeholder="Select Category"
            />
          </div>
          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6">No. Per Crate</label>
            <input
              class="form-control"
              type="number"
              v-model="inventoryData.number_per_pack"
              required
              placeholder="e.g 12"
            />
          </div>
          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6">Unit</label>
            <input
              class="form-control"
              type="text"
              v-model="inventoryData.unit"
              required
              placeholder="e.g. bottle, crate, pack"
            />
          </div>
          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6">Threshold</label>
            <input
              class="form-control"
              type="number"
              v-model="inventoryData.threshold"
              required
            />
          </div>

          <div class="mt-1">
            <button class="btn btn-primary account-btn w-100" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </ModalComp>
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
import { Modal, ModalContent, open, close } from "@dimsog/vue-modal";
import {
  canCreate,
  canUpdate,
  canDelete,
  canRead,
  canApprove,
  canReject,
} from "@/components/permission_restriction.js";

const categoryLoading = ref(false);
const isLoading = ref(false);
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const items = ref([]);
const selected = ref([]);
const selectAll = ref("");
const actionValue = ref([]);
const currentEditID = ref();
const isToggled = ref(false);
const addVisible = ref(false);
const inventoryData = reactive({
  product_name: "",
  category: { id: "", name: "" },
  category_id: "",
  number_per_pack: "",
  unit: "",
  threshold: "",
});

const dynamicOptions = () => {
  let arr = [];
  if (canUpdate()) {
    arr.push({
      id: "1",
      name: "Edit",
    });
  }
  if (canDelete()) {
    arr.push({
      id: "2",
      name: "Delete",
    });
  }

  return arr;
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const modalParams = reactive({
  title: "",
});

const checkSelectedAction = (id, data) => {
  if (id === "1") {
    openModal("edit", data);
  } else if (id === "2") {
    onSubmit("delete", data.id);
  }
};

const openModal = (type, data) => {
  if (type === "add") {
    modalParams.title = "Add Inventory";
    inventoryData.product_name = "";
    inventoryData.category = { id: "", name: "" };
    (inventoryData.category_id = ""), (inventoryData.number_per_pack = "");
    inventoryData.unit = "";
    inventoryData.threshold = "";
  } else if (type === "edit") {
    modalParams.title = "Edit Inventory";
    currentEditID.value = data.id;
    inventoryData.product_name = data.product_name;
    inventoryData.category = { id: data.category.id, name: data.category.name };
    inventoryData.number_per_pack = data.number_per_pack;
    inventoryData.category_id = data.category.id;
    inventoryData.unit = data.unit;
    inventoryData.threshold = data.threshold;
  }

  isToggled.value = true;

  // open("inventory-modal");
};

const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < items.value.length; i++)
      selected.value.push(items.value[i].id);
  else selected.value = [];
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace("NGN", "");
};

const getInventoryProducts = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/inventories")
    .then((response) => {
      items.value = response.data.data;
      console.log(items.value);
      // debugger;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const categories = ref([]);

const getInventoryCategories = async () => {
  categoryLoading.value = true;

  await axiosUrl
    .get("/product/groups")
    .then((response) => {
      categories.value = response.data.data;

      categoryLoading.value = false;
    })
    .catch((error) => {
      categoryLoading.value = false;
      swalErrorHandle(error);
    });
};

const loadFun = (type) => {
  if (type === "Add Inventory" || type === "Edit Inventory") {
    inventoryData.name = "";
  } else if (type === "delete" || type === "delete-m") {
    selected.value = [];
    selectAll.value = false;
  }
};

const onSubmit = async (type, id) => {
  let url = "";
  let payload = {};
  if (type === "Add Inventory") {
    url = "inventories";
    payload = inventoryData;
  } else if (type === "delete") {
    url = "/inventories";
    payload = {
      ids: [id],
    };
  } else if (type === "delete-m") {
    url = "/inventories";
    payload = {
      ids: selected.value,
    };
  } else if (type === "Edit Inventory") {
    url = "/inventories/" + id;
    payload = inventoryData;
  } else return;

  // close("inventory-modal");

  isLoading.value = true;

  if (type === "Edit Inventory") {
    await axiosUrl
      .put(url, payload)
      .then(() => {
        isLoading.value = false;
        isToggled.value = false;
        loadFun(type);
        swalSuccessHandle("Inventory Updated Successfully");
        getInventoryProducts();
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  } else if (type === "delete" || type === "delete-m") {
    await axiosUrl
      .delete(url, { data: payload })
      .then(() => {
        isLoading.value = false;
        isToggled.value = false;
        loadFun(type);
        swalSuccessHandle("Inventory Deleted Successfully");
        getInventoryProducts();
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
        loadFun(type);
        getInventoryProducts();
        isToggled.value = false;
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  }
};

onMounted(() => {
  getInventoryProducts();
  getInventoryCategories();
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