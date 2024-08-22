<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container" v-if="!isLoading">
      <div class="d-flex justify-content-between align-items-center row mb-3">
        <div class="col-md-12 text-center">
          <h4>
            <b>{{ bar.name }} ({{ bar_code }})</b>
          </h4>
          <b>Current Manager: </b>{{ bar.manager }}<br />
          <b>Daily Sales: </b> <span v-html="nairaSign"></span
          >
          <!-- {{ formatPrice(totalDebt) }} -->
        </div>
      </div>

      <TabView>
        <TabPanel header="Drinks">
          <div v-if="drinks.length > 0">
            <div class="row mb-3">
              <div class="col-md-6 mb-3">
                <input
                  v-model="filters['global'].value"
                  placeholder="Drink Search"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mb-3">
                <button
                  @click="onRequest()"
                  class="btn btn-primary text-center float-end"
                >
                  Make Request
                </button>
              </div>
            </div>
            <div>
              <DataTable
                class="shadow text-center"
                v-model:filters="filters"
                :value="drinks"
                :sortField="'number'"
                showGridlines
                paginator
                :rows="10"
                :rowsPerPageOptions="[5, 10, 20, 50]"
              >
                <Column field="name" header="Name">
                  <template #body="slotProps">
                    <span class="text-info text-center">{{
                      slotProps.data.name
                    }}</span
                    ><br />
                    <span class="text-center">{{
                      slotProps.data.inventory_code
                    }}</span>
                  </template>
                </Column>
                <Column header="Price">
                  <template #body="slotProps">
                    <span class="text-primary"
                      ><span v-html="nairaSign"></span
                      >{{ formatPrice(slotProps.data.amount_sold) }}</span
                    >
                  </template>
                </Column>
                <Column field="number" header="Available"></Column>

                <Column header="Threshold">
                  <template #body="slotProps">
                    <span
                      v-if="slotProps.data.threshold > slotProps.data.number"
                      class="text-danger"
                      >{{ slotProps.data.threshold }} <br />
                      <span class="blink_me">Make Request</span></span
                    >
                    <span class="text-success" v-else>{{
                      slotProps.data.threshold
                    }}</span>
                  </template>
                </Column>
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
              </DataTable>
            </div>
          </div>

          <div v-else>
            <div class="card card-body">
              <div class="alert alert-warning" role="alert">
                <p class="text-center">No more drinks</p>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel header="My Request">
          <div class="mt-4">
            <div v-if="myRequests.length > 0">
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <h4>My Request to other bars</h4>
                </div>
                <div class="col-md-6 mb-3">
                  <input
                    v-model="filters['global'].value"
                    placeholder="Drink Request"
                    class="form-control"
                  />
                </div>
              </div>
              <div>
                <DataTable
                  class="shadow text-center"
                  v-model:filters="filters"
                  :value="myRequests"
                  :sortField="'request_date'"
                  showGridlines
                  paginator
                  :rows="10"
                  :rowsPerPageOptions="[5, 10, 20, 50]"
                >
                  <Column field="req_code" header="Ref Code">
                    <!-- <template #body="slotProps">
                        <span class="text-info text-center">{{ slotProps.data.req_code }}</span>
                      </template> -->
                  </Column>

                  <Column header="Creator">
                    <template #body="slotProps">
                      <span class="text-dark">{{ slotProps.data.creator }}</span
                      ><br />
                      {{ formatDate(slotProps.data.created_at) }}
                    </template>
                  </Column>

                  <Column field="statusApproved" header="Status"></Column>

                  <Column header="Action">
                    <template #body="slotProps">
                      <button
                        @click="onViewRequest(slotProps.data.req_code)"
                        class="btn btn-primary"
                      >
                        View
                      </button>
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>
            <div v-else>
              <div class="card card-body">
                <div class="alert alert-warning" role="alert">
                  <p class="text-center">No request found</p>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel header="Bar Request">
          <div class="mt-4">
            <div v-if="pullRequests.length > 0">
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <h4>Other Bar's Requests</h4>
                </div>
                <div class="col-md-6 mb-3">
                  <input
                    v-model="filters['global'].value"
                    placeholder="Drink Request"
                    class="form-control"
                  />
                </div>
              </div>

              <div>
                <DataTable
                  class="shadow text-center"
                  v-model:filters="filters"
                  :value="pullRequests"
                  :sortField="'request_date'"
                  showGridlines
                  paginator
                  :rows="10"
                  :rowsPerPageOptions="[5, 10, 20, 50]"
                >
                  <Column field="req_code" header="Ref Code"></Column>

                  <Column field="product" header="Product">
                    <template #body="slotProps">
                      <span class="text-info text-center">{{
                        slotProps.data.product
                      }}</span
                      ><br />
                      <span class="text-center">{{
                        slotProps.data.product_code
                      }}</span>
                    </template>
                  </Column>

                  <Column field="quantity" header="Quantity/Available">
                    <template #body="slotProps">
                      {{ slotProps.data.quantity }}/{{
                        slotProps.data.myItem.number
                      }}
                    </template>
                  </Column>

                  <Column field="from" header="Request From"></Column>

                  <Column header="Creator">
                    <template #body="slotProps">
                      <span class="text-dark">{{ slotProps.data.creator }}</span
                      ><br />
                      {{ formatDate(slotProps.data.created_at) }}
                    </template>
                  </Column>

                  <Column header="Approved By">
                    <template #body="slotProps">
                      <span
                        v-if="slotProps.data.approved === null"
                        class="text-info text-center p-1"
                      >
                        Pending <br />
                        <button
                          @click="
                            onApprove(
                              slotProps.data.id,
                              slotProps.data.quantity,
                              slotProps.data.myItem.number
                            )
                          "
                          class="btn btn-primary btn-sm m-1"
                        >
                          Approve
                        </button>
                        <button
                          @click="onReject(slotProps.data.id)"
                          class="btn btn-danger btn-sm"
                        >
                          Remove
                        </button>
                      </span>
                      <span v-else>
                        <span class="text-dark">{{
                          slotProps.data.approved[0]
                        }}</span
                        ><br />
                        {{ formatDate(slotProps.data.approved[1]) }}
                      </span>
                    </template>
                  </Column>

                  <Column header="Accepted By">
                    <template #body="slotProps">
                      <span
                        v-if="slotProps.data.accepted === null"
                        class="text-info"
                      >
                        Pending
                      </span>
                      <span v-else>
                        <span class="text-dark">{{
                          slotProps.data.accepted[0]
                        }}</span
                        ><br />
                        {{ formatDate(slotProps.data.accepted[1]) }}
                      </span>
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>
            <div v-else>
              <div class="card card-body">
                <div class="alert alert-warning" role="alert">
                  <p class="text-center">No request found</p>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script setup>
import { axiosUrl } from "@/env";
import { ref, reactive, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useAuthStore } from "@/store/authStore";
import Swal from "sweetalert2";
import {
  formatDate,
  formatPrice,
  swalErrorHandle,
  swalSuccessHandle,
  swalConfirmDelete,
  swalHandler,
} from "@/components/myHelperFunction";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const nairaSign = "&#x20A6;";
const bar_code = ref();
const bar = ref("");
const request = ref(false);
const myRequests = ref([]);
const pullRequests = ref([]);
const drinks = ref({});
const selected = ref([]);
const selectAll = ref("");
const authStore = useAuthStore();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < drinks.value.length; i++)
      selected.value.push(drinks.value[i].id);
  else selected.value = [];
};

const onViewRequest = async (code) => {
  router.push({
    path: "/bars/requests/" + code,
  });
};

const onRequest = async () => {
  if (selected.value.length === 0) {
    Swal.fire("Wait!", "Select at least one product.", "warning");
  } else {
    var payload = {
      ids: selected.value,
    };

    isLoading.value = true;
    var url = "/bars/requests/create";
    await axiosUrl
      .post(url, payload)
      .then((response) => {
        isLoading.value = false;
        router.push({
          path: "/bars/requests/" + response.data,
        });
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  }
};

const getBar = async () => {
  isLoading.value = true;
  await axiosUrl
    .get("/bars/" + bar_code.value)
    .then((response) => {
      bar.value = response.data.data.bar;
      drinks.value = response.data.data.drinks;
      myRequests.value = response.data.data.myRequests;
      pullRequests.value = response.data.data.pullRequests;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const onApprove = async (id, quantity, number) => {
  if (quantity > number) {
    swalHandler(
      "Warning !!",
      "You do not have upto that number of drinks.",
      "warning",
      "#FACEA8"
    );
    return;
  }
  isLoading.value = true;
  await axiosUrl
    .get("/bars/requests/approve/" + id)
    .then((response) => {
      console.log(response.data);
      getBar();
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const onReject = async (id) => {
  swalConfirmDelete(
    async () => {
      isLoading.value = true;
      await axiosUrl
        .get("/bars/requests/reject/" + id)
        .then((response) => {
          console.log(response.data);
          getBar();
          isLoading.value = false;
        })
        .catch((error) => {
          isLoading.value = false;
          swalErrorHandle(error);
        });
    },
    () => {
      return;
    }
  );
};

onMounted(() => {
  bar_code.value = route.params.bar_code;
  getBar();
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

.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>