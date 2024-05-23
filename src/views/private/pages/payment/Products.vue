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
                @click="onSubmit('delete-m')"
                class="btn add-btn px-4"
              >
                <i class="fa-solid fa-minus"></i> Delete
              </button>
              <!-- <button v-else class="btn add-btn px-4">
                <i class="fa-solid fa-minus"></i> Delete
              </button> -->
              <!-- <button @click="visible = true" class="btn add-btn me-2 px-4">
                < Add
              </button> -->
              <button @click="openModal('add')" class="btn add-btn me-2 px-4">
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
                {{
                  slotProps.data.payment_name
                    ? slotProps.data.payment_name
                    : ""
                }}<br />
                <b>Code:</b> #{{
                  slotProps.data.product_id ? slotProps.data.product_id : ""
                }}
              </template>
            </Column>
            <Column header="Amount" style="width: 25%">
              <template #body="slotProps">
                <span v-html="nairaSign"></span
                >{{ formatPrice(slotProps.data.amount) }}<br />
                <b>Grace Period:</b>
                {{
                  slotProps.data.grace_period
                    ? slotProps.data.grace_period
                    : ""
                }}days
              </template>
            </Column>
            <Column header="Status" style="width: 30%">
              <template #body="slotProps">
                <span>
                  <b>Door Access:</b>
                  <span v-if="slotProps.data.door_access == 1"> Yes </span>
                  <span v-else> No </span>
                </span>
                <br />

                <span>
                  <b>Type of product:</b>
                  <span v-if="slotProps.data.type == 1"> Monthly </span>
                  <span v-else-if="slotProps.data.type == 2"> Every 3 Months </span>
                  <span v-else-if="slotProps.data.type == 3"> Every 4 Months </span>
                  <span v-else-if="slotProps.data.type == 4"> Every 6 Months </span>
                  <span v-else-if="slotProps.data.type == 5"> Annualy </span>
                  <span v-else-if="slotProps.data.type == 5"> Biannualy </span>
                  <span v-else> One Off </span>
                </span>
                <br>

                <span>
                  <b v-if="slotProps.data.reoccuring_day == 1">Reoccurring Day: {{ slotProps.data.reoccuring_day  }}</b>
                  <b v-else-if="slotProps.data.type == 0"></b>
                  <b v-else>Next Due Date:</b> <span v-if="slotProps.data.next_date">{{ formatDate(slotProps.data.next_date)  }}</span>
                </span>
              </template>
            </Column>
            <Column header="Creator" style="width: 15%">
              <template #body="slotProps">
                {{ slotProps.data.creator ? slotProps.data.creator : "" }}<br />
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
                  :options="options"
                  placeholder="Action"
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

    <!-- Modal -->
    <Modal name="product-modal" :title="modalParams.title">
      <ModalContent>
        <form
          @submit.prevent="onSubmit(modalParams.title, currentEditID)"
          style="width: 95%; margin: 0 auto"
        >
          <div class="row">
            <div class="col-12 col-lg-6 mb-3">
              <label class="col-form-label fs-6">Product Name</label>
              <input
                class="form-control"
                type="text"
                v-model="productData.payment_name"
                required
              />
            </div>
            <div class="col-12 col-lg-6 mb-3">
              <label class="col-form-label fs-6">Amount</label>
              <input
                class="form-control"
                type="number"
                v-model="productData.amount"
                required
              />
            </div>
            <div class="col-12 col-lg-6 mb-3">
              <label class="col-form-label fs-6">Door Access</label>
              <select
                v-model="productData.door_access"
                class="form-control"
                required
              >
                <option value="null">-- Select Type--</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div class="col-12 col-lg-6 mb-3">
              <label class="col-form-label fs-6">Grace Period</label>
              <input
                class="form-control"
                type="number"
                v-model="productData.grace_period"
                required
              />
            </div>
            <div class="col-12 col-lg-6 mb-3">
              <label class="col-form-label fs-6">Type</label>
              <select v-model="productData.type" class="form-control" required>
                <option value="null">-- Select Type--</option>
                <option value="0">One Off</option>
                <option value="1">Monthly</option>
                <option value="2">Every 3 Months</option>
                <option value="3">Every 4 Months</option>
                <option value="4">Every 6 Months</option>
                <option value="5">Annualy</option>
                <option value="6">Biannualy</option>
              </select>
            </div>
            <div class="col-12 col-lg-6 mb-3" v-if="productData.type === '1' || productData.type === 1">
              <label class="col-form-label fs-6">Recurring Day</label>
              <input
                class="form-control"
                type="number"
                v-model="productData.reoccuring_day"
                required
              />
            </div>

            <div class="col-12 col-lg-12 mb-3">
              <label class="col-form-label fs-6">Select Member Types</label>
              <div style="border: 1px solid grey; height: 15em; overflow-y: auto; white-space: nowrap; padding:5px">
                  <div class="c-inputs-stacked" v-for="member_type in types" :key="member_type.id">

                  
                      <div class="m-1">
                          <input type="checkbox" v-model="productData.member_type" :value="member_type.id" number> {{ member_type.title }}
                      </div>
                  </div>
              </div>
            </div>
          </div>
       
          <div class="mt-1">
            <button class="btn btn-primary account-btn w-100" type="submit">
              Submit
            </button>
          </div>
        </form>
      </ModalContent>
    </Modal>

    <Modal name="singleDebit" :title="modalParams.title">
      <ModalContent>
        <form
          @submit.prevent="onSingleDebit()"
          style="width: 95%; margin: 0 auto"
        >
          <div class="form-group mb-3">
            <label class="col-form-label fs-6">Select Member</label>
            <select
              v-model="singleDebit.membership_id"
              class="form-control"
              required
            >
              <option value="null">-- Select Member--</option>
              <option
                v-for="option in members"
                :value="option.membership_id"
                :key="option.membership_id"
              >
                {{ option.first_name }} {{ option.last_name }} ({{
                  option.membership_id
                }})
              </option>
            </select>
          </div>

          <div class="mt-1">
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

const isLoading = ref(false);
const nairaSign = "&#x20A6;";
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const items = ref([]);
const members = ref([]);
const types = ref([]);
const selected = ref([]);
const selectAll = ref("");
const actionValue = ref([]);
const currentEditID = ref();
const addVisible = ref(false);
const productData = reactive({
  payment_name: "",
  amount: null,
  door_access: null,
  grace_period: null,
  type: null,
  reoccuring_day: null,
  member_type: [],
});

const singleDebit = reactive({
  product_id: "",
  membership_id: "",
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
    name: "Individual Debit",
  },

  {
    id: "4",
    name: "Group Debit",
  },
];
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
    onSubmit("delete", id);
  } else if (id === "3") {
    individualDebit(data);
  } else if (id === "4") {
    groupDebit(data);
  }
};

const openModal = (type, data) => {
  if (type === "add") modalParams.title = "Add Product";
  else if (type === "edit") {
    modalParams.title = "Edit Product";
    productData.payment_name = data.payment_name;
    productData.amount = data.amount;
    productData.door_access = data.door_access;
    productData.grace_period = data.grace_period;
    productData.type = data.type;
    productData.reoccuring_day = data.reoccuring_day;
    currentEditID.value = data.id;

    var selectedType = [];
      data.types.forEach(function (ty) {
          selectedType.push(ty.pivot.member_type_id);
      });
      console.log(selectedType)
      productData.member_type = selectedType;
  }

  open("product-modal");
};

const individualDebit = (data) => {
  modalParams.title = "Single Debit";
  singleDebit.product_id = data.product_id;
  open("singleDebit");
};

const groupDebit = async (data) => {
  let url = "";
  let payload = {};
  singleDebit.product_id = data.product_id;
  payload = singleDebit;
  url = "payments/debit/all";

  isLoading.value = true;

  await axiosUrl
    .post(url, payload)
    .then(() => {
      isLoading.value = false;
      swalSuccessHandle("Members Debited Successfully.");
      getProducts();
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const onSingleDebit = async () => {
  let url = "";
  let payload = {};
  payload = singleDebit;
  url = "payments/debit";

  close("singleDebit");
  isLoading.value = true;

  await axiosUrl
    .post(url, payload)
    .then(() => {
      isLoading.value = false;
      swalSuccessHandle("Member Debited Successfully.");
      getProducts();
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < items.value.length; i++)
      selected.value.push(items.value[i].id);
  else selected.value = [];
};

const getMembers = async () => {
  await axiosUrl
    .get("/payload/members")
    .then((response) => {
      members.value = response.data.data;
    })
    .catch(() => {});
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

const getType = async () => {
  await axiosUrl
    .get("/members/types/all")
    .then((response) => {
      types.value = response.data.data;
    })
    .catch((error) => {
      isLoading.value = false;
    });
};

const loadFun = (type) => {
  if (type === "Add Product" || type === "Edit Product") {
    productData.payment_name = "";
    productData.amount = null;
    productData.door_access = null;
    productData.grace_period = null;
    productData.type = null;
    productData.reoccuring_day = null;
    modalParams.title = "";
  } else if (type === "delete" || type === "delete-m") {
    selected.value = [];
    selectAll.value = false;
  }
};

const onSubmit = async (type, id) => {
  let url = "";
  let payload = {};
  if (type === "Add Product") {
    if (productData.door_access === "null" || productData.type === "null")
      return;
    url = "payments/products";
    payload = productData;
  } else if (type === "delete") {
    url = "payments/product";
    payload = {
      ids: [id],
    };
  } else if (type === "delete-m") {
    url = "payments/product";
    payload = {
      ids: selected.value,
    };
  } else if (type === "Edit Product") {
    url = "payments/products/" + id;
    payload = productData;
  } else return;

  close("product-modal");
  isLoading.value = true;

  if (type === "Edit Product") {
    await axiosUrl
      .put(url, payload)
      .then(() => {
        isLoading.value = false;
        loadFun(type);
        getProducts();
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
        loadFun(type);
        getProducts();
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
        getProducts();
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  }
};

onMounted(() => {
  getProducts();
  getMembers();
  getType();
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