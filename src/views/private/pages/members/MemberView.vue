<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="d-flex justify-content-between align-items-center row">
        <div class="col-md-6">
          <h2>
            <strong
              >{{ member.first_name }} {{ member.middle_name }}
              {{ member.last_name }} ({{ member.membership_id }})</strong
            >
          </h2>
        </div>
        <div class="col-md-6">
          <b class="mr-3">Debt: </b> <span v-html="nairaSign"></span
          >{{ formatPrice(totalDebt) }}
          <span class="mx-3 text-success">|</span>
          <b class="mr-3"
            >Wallet Balance : <span v-html="nairaSign"></span
            >{{ formatPrice(wallet) }}</b
          >
        </div>
      </div>
      <TabView>
        <TabPanel header="Personal Information">
          <div class="row m-0">
            <div class="col-md-2 mb-3">
              <img
                :src="member.image"
                alt=""
                class="img-fluid"
                style="height: 200px; width: 150px"
              />
            </div>
            <div class="col-md-10 mb-3">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <tr>
                    <th class="mr-2">Name:</th>
                    <td>
                      {{ member.first_name }} {{ member.middle_name }}
                      {{ member.last_name }}
                    </td>
                  </tr>
                  <tr>
                    <th class="mr-2">Date of Birth:</th>
                    <td>{{ member.dob }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Gender:</th>
                    <td>{{ member.gender }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Email:</th>
                    <td>{{ member.email }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Phone 1:</th>
                    <td>{{ member.phone_1 }}, {{ member.phone_2 }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Home Address:</th>
                    <td>
                      {{ member.address }} {{ member.city_resident }},
                      {{ member.stateResidence }} State, {{ member.country }}
                    </td>
                  </tr>

                  <tr>
                    <th class="mr-2">Office Address:</th>
                    <td>{{ member.office_address }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Home Town:</th>
                    <td>{{ member.home_town }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">State of Origin:</th>
                    <td>{{ member.stateOrigin }} State</td>
                  </tr>

                  <tr>
                    <th class="mr-2">Marital Status:</th>
                    <td>{{ member.marital_status }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Spouse Name:</th>
                    <td>{{ member.spouse_name }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Children:</th>
                    <td>{{ member.children }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Kin Name:</th>
                    <td>{{ additional.kin_name }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Kin Address:</th>
                    <td>{{ additional.kin_address }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Kin Phone 1:</th>
                    <td>{{ additional.kin_phone_1 }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Kin Phone 2:</th>
                    <td>{{ additional.kin_phone_2 }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Kin Relationship:</th>
                    <td>{{ additional.kin_relationship }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Beneficiary Name:</th>
                    <td>{{ additional.beneficiary_name }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Beneficiary Address:</th>
                    <td>{{ additional.beneficiary_address }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Beneficiary Phone 1:</th>
                    <td>{{ additional.beneficiary_phone_1 }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Beneficiary Phone 2:</th>
                    <td>{{ additional.beneficiary_phone_2 }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Beneficiary Relationship:</th>
                    <td>{{ additional.beneficiary_relationship }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Sponsor 1:</th>
                    <td>{{ additional.sponsor_1 }}</td>
                  </tr>
                  <tr>
                    <th class="mr-2">Sponsor 2:</th>
                    <td>{{ additional.sponsor_2 }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Debt">
          <div class="">
            <div class="d-flex justify-content-between align-items-center">
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
            <div v-if="debts.length > 0">
              <DataTable
                class="shadow"
                v-model:filters="filters"
                :value="debts"
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
                <Column header="Amount" style="width: 20%">
                  <template #body="slotProps">
                    <span v-html="nairaSign"></span
                    >{{ formatPrice(slotProps.data.amount) }}<br />
                    <b>Grace Period:</b>
                    {{
                      slotProps.data.grace_period
                        ? slotProps.data.grace_period
                        : ""
                    }}
                  </template>
                </Column>
                <Column header="Creator" style="width: 20%">
                  <template #body="slotProps">
                    {{
                      slotProps.data.created_by ? slotProps.data.created_by : ""
                    }}
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
                  <p class="text-center">No more debts</p>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel header="Payments">
          <div v-if="history.length > 0">
            <DataTable
              class="shadow"
              v-model:filters="filters"
              :value="history"
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
                  {{
                    slotProps.data.member_name
                      ? slotProps.data.member_name
                      : ""
                  }}<br />
                  <b>Code:</b> #{{
                    slotProps.data.member_code ? slotProps.data.member_code : ""
                  }}
                </template>
              </Column>
              <Column header="Payment Channel" style="width: 20%">
                <template #body="slotProps">
                  {{
                    slotProps.data.paymentChannel
                      ? slotProps.data.paymentChannel
                      : "N/A"
                  }}<br />
                  <b>Amount: </b> <span v-html="nairaSign" />{{
                    formatPrice(slotProps.data.amount)
                  }}
                </template>
              </Column>
              <Column header="Channel Process" style="width: 20%">
                <template #body="slotProps">
                  {{
                    slotProps.data.channelProcess
                      ? slotProps.data.channelProcess
                      : "N/A"
                  }}
                </template>
              </Column>
              <Column header="Creator" style="width: 20%">
                <template #body="slotProps">
                  {{
                    slotProps.data.created_by ? slotProps.data.created_by : ""
                  }}
                  <br />
                  {{ formatDate(slotProps.data.date_created) }}
                </template>
              </Column>
            </DataTable>
          </div>

          <div v-else>
            <div class="card card-body">
              <div class="alert alert-warning" role="alert">
                <p class="text-center">No Payment History Available</p>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabView>

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
                    {{ data["bank_name"] }} - {{ data["account_number"] }}
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
  </div>
</template>

<script setup>
import { axiosUrl } from "@/env";
import { ref, reactive, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useAuthStore } from "@/store/authStore";
import Swal from "sweetalert2";
import router from "@/router";
import { useRoute } from "vue-router";
import {
  formatDate,
  formatPrice,
  swalErrorHandle,
  swalSuccessHandle,
} from "@/components/myHelperFunction";
import { Modal, ModalContent, open, close } from "@dimsog/vue-modal";

const isLoading = ref(false);
const membership_id = ref();
const nairaSign = "&#x20A6;";
const route = useRoute();
const member = ref({});
const additional = ref({});
const debts = ref([]);
const payments = ref([]);
const wallet = ref();
const totalDebt = ref();
const authStore = useAuthStore();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const history = ref([]);
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

const options = [
  {
    id: "1",
    name: "Pay",
  },
];
const modalParams = reactive({
  title: "",
});

const checkSelectedAction = (id, data) => {
  if (id === "1") {
    modalParams.title = "Pay";
    payData.membership_id = data.member_code;
    payData.transaction_code = data.trans_id;
    open("pay-modal");
  }
};

const getHistory = async () => {
  await axiosUrl
    .get("/payments/history")
    .then((response) => {
      history.value = response.data.data;
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
      }
      swalSuccessHandle("Payment Successful.");
      getMember();
      getChannel();
      getBanks();
      getPOS();
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const getChannel = async () => {
  await axiosUrl
    .get("/payments/channels")
    .then((response) => {
      channels.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const getBanks = async () => {
  await axiosUrl
    .get("/payments/bank")
    .then((response) => {
      // console.log(response.data.data);
      banks.value = response.data.data;
    })
    .catch((error) => {
      swalErrorHandle(error);
    });
};

const getPOS = async () => {
  await axiosUrl
    .get("/payments/pos")
    .then((response) => {
      // console.log(response.data.data);
      pos.value = response.data.data;
    })
    .catch((error) => {
      swalErrorHandle(error);
    });
};

const getMember = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/members/" + membership_id.value)
    .then((response) => {
      member.value = response.data.data[0].member;
      additional.value = response.data.data[0].additional;
      wallet.value = response.data.data[0].wallet;
      totalDebt.value = response.data.data[0].totalDebt;

      payments.value = response.data.data[0].payments;
      debts.value = response.data.data[0].debts;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
    });
};

onMounted(() => {
  try {
    membership_id.value = route.params.membershipID;
    getMember();
    getChannel();
    getBanks();
    getPOS();
    getHistory();
  } catch (error) {
    isLoading.value = false;
    Swal.fire("Failed!", "Its not your fault, try again.", "warning");
  }
});
</script>

<style scoped>
.table th {
  font-weight: 500;
  white-space: nowrap;
  border-top: 1px solid #e9e9ea;
  padding: 0 0.75rem;
}
</style>

<style>
@media only screen and (min-width: 720px) {
  .modal {
    width: 600px !important;
    height: 300px !important;
  }
}
</style>