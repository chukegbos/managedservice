<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="d-flex justify-content-between align-items-center mt-3">
        <h2 class="mb-0">Inventory Requests</h2>

        <div class="d-flex">
          <div class="me-3">
            <input
              v-model="filters['global'].value"
              placeholder="Search Bar"
              class="form-control my-input"
            />
          </div>
        </div>
      </div>

      <div class="my-4">
        <div v-if="myRequests.length > 0 && canRead()">
          <DataTable
            class="shadow text-center"
            v-model:filters="filters"
            :value="myRequests"
            :sortField="''"
            showGridlines
            paginator
            :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem"
          >
            <Column field="req_code" header="Ref Code">
              <template #body="slotProps">
                {{ slotProps.data.req_code ? slotProps.data.req_code : "N/A" }}
              </template>
            </Column>

            <Column field="product" header="Product">
              <template #body="slotProps">
                <span class="text-info text-center">{{
                  slotProps.data.product ? slotProps.data.product : "N/A"
                }}</span
                ><br />
                <span class="text-center">{{
                  slotProps.data.product_code
                    ? slotProps.data.product_code
                    : "N/A"
                }}</span>
              </template>
            </Column>

            <Column field="quantity" header="Quantity/Available">
              <template #body="slotProps">
                {{ slotProps.data?.quantity ? slotProps.data?.quantity : 0 }}/{{
                  slotProps.data?.myItem?.number
                    ? slotProps.data?.myItem?.number
                    : 0
                }}
              </template>
            </Column>

            <Column field="from" header="Request From">
              <template #body="slotProps">
                {{ slotProps.data.from ? slotProps.data.from : "N/A" }}
              </template>
            </Column>

            <Column header="Creator">
              <template #body="slotProps">
                <span class="text-dark">{{
                  slotProps.data.creator ? slotProps.data.creator : "N/A"
                }}</span
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
                    v-if="canApprove()"
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
                    v-if="canReject() || canDelete()"
                    @click="onReject(slotProps.data.id)"
                    class="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </span>
                <span v-else>
                  <span class="text-dark">{{ slotProps.data.approved[0] }}</span
                  ><br />
                  {{ formatDate(slotProps.data.approved[1]) }}
                </span>
              </template>
            </Column>

            <Column header="Accepted By">
              <template #body="slotProps">
                <span v-if="slotProps.data.accepted === null" class="text-info">
                  Pending
                </span>
                <span v-else>
                  <span class="text-dark">{{ slotProps.data.accepted[0] }}</span
                  ><br />
                  {{ formatDate(slotProps.data.accepted[1]) }}
                </span>
              </template>
            </Column>
          </DataTable>
        </div>
        <div v-else>
          <div class="card card-body">
            <div class="alert alert-warning" role="alert">
              <p class="text-center">No request found</p>
            </div>
          </div>
        </div>
      </div>
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
import {
  canCreate,
  canUpdate,
  canDelete,
  canRead,
  canApprove,
  canReject,
} from "@/components/permission_restriction.js";

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

const getInventoryRequest = async () => {
  isLoading.value = true;
  await axiosUrl
    .get("/inventories/request")
    .then((response) => {
      // console.log(response);
      // bar.value = response.data.data.bar;
      // drinks.value = response.data.data.drinks;
      myRequests.value = response.data?.data;
      // pullRequests.value = response.data.data.pullRequests;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const onApprove = async (id, quantity, number) => {
  if (parseInt(quantity, 10) > parseInt(number, 10)) {
    console.log(quantity)
    console.log(number)
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
      getInventoryRequest();
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
          getInventoryRequest();
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
  getInventoryRequest();
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