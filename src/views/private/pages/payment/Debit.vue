<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Payments Debit</h2>

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
              <button v-else class="btn add-btn px-4">
                <i class="fa-solid fa-minus"></i> Delete
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
            <Column header="Amount" style="width: 20%">
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
            <Column header="Status" style="width: 25%">
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
                  <span v-else> One Off </span>
                  <span>
                    <b v-if="slotProps.data.reoccuring_day == 1"
                      >Reoccurring Day:
                    </b>
                    <b v-else>Reoccurring Days: </b>
                    <span v-if="slotProps.data.type == 1">
                      {{
                        slotProps.data.reoccuring_day
                          ? slotProps.data.reoccuring_day
                          : "N/A"
                      }}
                    </span>
                    <span v-else>N/A</span>
                  </span>
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
const selected = ref([]);
const selectAll = ref("");
const actionValue = ref([]);

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
  }
  

  open("product-modal");
};

const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < items.value.length; i++)
      selected.value.push(items.value[i].id);
  else selected.value = [];
};

const getDebits = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/payments/debit")
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
  getDebits();
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