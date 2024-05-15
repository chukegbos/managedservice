<template>
  <div class="content-wrapper">
    <loading :active="isLoading && items.length === 0" />

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
            <Column header="Product Name" style="width: 20%">
              <template #body="slotProps">
                {{
                  slotProps.data.product_name
                    ? slotProps.data.product_name
                    : ""
                }}<br />
                <b>Code:</b> #{{
                  slotProps.data.product_id ? slotProps.data.product_id : ""
                }}
              </template>
            </Column>
            <Column header="Member Name" style="width: 20%">
              <template #body="slotProps">
                {{ slotProps.data.member_name ? slotProps.data.member_name : ""
                }}<br />
                <b>Code:</b> #{{
                  slotProps.data.member_code ? slotProps.data.member_code : ""
                }}
              </template>
            </Column>
            <Column header="Amount" style="width: 20%">
              <template #body="slotProps">
                <span v-html="nairaSign"></span
                >{{ formatPrice(slotProps.data.amount) }}<br />
                <b>Grace Period:</b>
                {{
                  slotProps.data.grace_period ? slotProps.data.grace_period : ""
                }}
              </template>
            </Column>
            <Column header="Creator" style="width: 20%">
              <template #body="slotProps">
                {{ slotProps.data.created_by ? slotProps.data.created_by : "" }}
                <br />
                <span>
                  <b>Door Access:</b>
                  <span v-if="slotProps.data.door_access == 1"> Yes </span>
                  <span v-else> No </span>
                </span>
                <br />
                {{ formatDate(slotProps.data.date_created) }}
              </template>
            </Column>
            <Column header="Action" style="width: 20%">
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
    <Modal name="pay-modal" :title="modalParams.title">
      <ModalContent>
        <form
          @submit.prevent="onSubmit(modalParams.title, currentEditID)"
          style="width: 90%; margin: 0 auto"
        >
          <div class="row">
            <div class="col-12 mb-3">
              <label class="col-form-label fs-6">Channel</label>
              <select
                v-model="payData.channel_id"
                class="form-control"
                required
              >
                <option value="null">-- Select Type--</option>
                <option v-for="data in channels" :key="data" :value="data.id">
                  {{ data["name"] }}
                </option>
              </select>
            </div>
            <div class="col-12 mb-3" v-if="payData.channel_id === 1">
              <label class="col-form-label fs-6">POS</label>
              <select
                v-model="payData.process_id"
                class="form-control"
                required
              >
                <option value="null">-- Select Type--</option>
                <option v-for="data in pos" :key="data" :value="data.id">
                  {{ data["name"] }}
                </option>
              </select>
            </div>
            <div class="col-12 mb-3" v-if="payData.channel_id === 3">
              <label class="col-form-label fs-6">Bank</label>
              <select
                v-model="payData.process_id"
                class="form-control"
                required
              >
                <option value="null">-- Select Type--</option>
                <option v-for="data in banks" :key="data" :value="data.id">
                  {{ data["name"] }}
                </option>
              </select>
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
const isLoading2 = ref(false);
const isLoading3 = ref(false);
const isLoading4 = ref(false);
const nairaSign = "&#x20A6;";
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const items = ref([]);
const actionValue = ref([]);
const channels = ref([]);
const banks = ref([]);
const pos = ref([]);
const payData = reactive({
  membership_id: "",
  transaction_code: "",
  channel_id: null,
  process_id: "",
});
const singleDeptData = reactive({
  membership_id: "",
  product_id: "",
});
const groupDeptData = reactive({
  product_id: "",
});

const options = [
  {
    id: "1",
    name: "Pay",
  },
  {
    id: "2",
    name: "Single Debit",
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

const checkSelectedAction = (id, data) => {
  if (id === "1") {
    modalParams.title = "Pay";
    payData.membership_id = data.member_code;
    payData.transaction_code = data.trans_id;
    open("pay-modal");
  } else if (id === "2") {
    singleDeptData.membership_id = data.member_code;
    singleDeptData.product_id = data.process_id;
    onSubmit("Single");
  } else if (id === "3") {
    groupDeptData.product_id = data.product_id;
    onSubmit("Group");
  }
};

const getDebits = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/payments/debit")
    .then((response) => {
      items.value = response.data.data;
      for (let i = 0; i < items.value.length; i++) {
        items.value[i]["id"] = i + 1;
      }
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const getChannel = async () => {
  isLoading2.value = true;

  await axiosUrl
    .get("/payments/channels")
    .then((response) => {
      // console.log(response.data.data);
      channels.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const getBanks = async () => {
  isLoading3.value = true;

  await axiosUrl
    .get("/payments/bank")
    .then((response) => {
      // console.log(response.data.data);
      banks.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const getPOS = async () => {
  isLoading4.value = true;

  await axiosUrl
    .get("/payments/pos")
    .then((response) => {
      // console.log(response.data.data);
      pos.value = response.data.data;
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
  if (type === "Pay") {
    url = "/payments/debit/pay";
    if (payData.channel_id === 2) payData.process_id = null;
    payload = payData;
  } else if (type === "Single") {
    url = "payments/dept";
    payload = singleDeptData;
  } else if (type === "Group") {
    url = "payments/debit/pay";
    payload = groupDeptData;
  } else return;

  close("pay-modal");
  isLoading.value = true;

  await axiosUrl
    .post(url, payload)
    .then(() => {
      isLoading.value = false;

      if (type === "Pay") {
        payData.membership_id = "";
        payData.transaction_code = "";
        payData.channel_id = null;
        payData.process_id = "";
        modalParams.title = "";
      } else if (type === "Single") {
        singleDeptData.membership_id = "";
        singleDeptData.product_id = "";
      } else if (type === "Group") {
        groupDeptData.product_id = "";
      }

      getProducts();
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

onMounted(() => {
  getDebits();
  getChannel();
  getBanks();
  getPOS();
});
</script>

<style>
@media only screen and (min-width: 720px) {
  .modal {
    width: 600px !important;
    height: 300px !important;
  }
}
</style>