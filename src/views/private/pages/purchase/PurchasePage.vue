<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container mt-3">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="mb-0">Purchase</h2>

        <div class="d-flex align-items-end">
          <div class="me-3">
            <input
              v-model="filters['global'].value"
              placeholder="Keyword Member"
              class="form-control my-input"
            />
          </div>

          <button
            @click="deletePurchase()"
            class="btn btn-danger"
            :disabled="selected.length === 0"
          >
            <i class="fa-solid fa-minus"></i> Delete
          </button>
        </div>
      </div>

      <div class="mt-4">
        <div v-if="items.length > 0">
          <DataTable
            class="shadow"
            v-model:filters="filters"
            :value="items"
            :sortField="'created_At'"
            showGridlines
            paginator
            :sortOrder="-1"
            :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 800px; text-transform: capitalize;"
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
            <Column
              field="supplier"
              header="Supplier"
              :sortable="true"
              style="width: 20%"
            >
              <template #body="{ data }">
                {{ data.supplier ? data.supplier : "N/A" }}
              </template>
            </Column>
            <Column
              field="initiated_by"
              header="Initiator"
              :sortable="true"
              style="width: 15%"
            >
              <template #body="{ data }">
                {{ data.initiated_by ? data.initiated_by : "N/A" }}
              </template>
            </Column>
            <Column
              field="total_amount"
              header="Total Amount"
              :sortable="true"
              style="width: 15%"
            >
              <template #body="{ data }">
                N{{ data.total_amount ? data.total_amount : "N/A" }}
                <small class="text-primary"
                  >({{ data.mop ? data.mop : "" }})</small
                >
              </template>
            </Column>
            <Column
              field="status"
              header="Status"
              :sortable="true"
              style="width: 10%"
            >
              <template #body="{ data }">
                {{ data.status ? data.status : "N/A" }}
              </template>
            </Column>
            <Column
              field="purchase_date"
              header="Purchase Date"
              :sortable="true"
              style="width: 15%"
            >
              <template #body="{ data }">
                {{ formatDate(data.purchase_date) }}
              </template>
            </Column>
            <Column
              field="created_At"
              header="Date Created"
              :sortable="true"
              style="width: 15%"
            >
              <template #body="{ data }">
                {{ formatDate(data.created_at) }}
              </template>
            </Column>
            <Column header="Action" style="width: 5%">
              <template #body="{ data }">
                <Dropdown
                  @change="checkSelectedAction(selectedAction[data.id], data)"
                  v-if="data.status === 'Pendiong'"
                  v-model="selectedAction[data.id]"
                  optionLabel="label"
                  optionValue="id"
                  :options="actions"
                  placeholder="Action"
                />
                <span v-else>N/A</span>
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
  </div>
</template>

<script setup>
import { axiosUrl } from "@/env";
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import Swal from "sweetalert2";
import {
  formatDate,
  swalErrorHandle,
  swalConfirmDelete,
} from "@/components/myHelperFunction";

const isLoading = ref(false);
const banksLoading = ref(false);
const items = ref([]);
const banks = ref([]);
const selected = ref([]);
const selectAll = ref("");
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const actions = ref([
  { label: "Approve", id: 1 },
  { label: "Reject", id: 2 },
]);
const selectedAction = ref([]);

const checkSelectedAction = (id, data) => {
  if (id === 1 || id === 2) {
    approve_reject(id, data?.purchase_code);
  } else {
    Swal.fire({
      title: "Failed!",
      text: "Invalid Purchase Code",
      icon: "warning",
      confirmButtonColor: "#FACEA8",
    });
  }
};

const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < items.value.length; i++)
      selected.value.push(items.value[i].id);
  else selected.value = [];
};

const getPurchase = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/purchase")
    .then((response) => {
      items.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const approve_reject = async (id, purchaseCode) => {
  isLoading.value = true;

  let url = "";
  switch (id) {
    case 1:
      url = `purchase/approve/${purchaseCode}`;
      break;
    case 2:
      url = `purchase/reject/${purchaseCode}`;
      break;
    default:
      return;
  }
  await axiosUrl
    .post(url)
    .then((response) => {
      console.log(response.data);
      getPurchase();
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const deletePurchase = async () => {
  if (selected.value.length <= 0) return;
  swalConfirmDelete(
    async () => {
      isLoading.value = true;
      await axiosUrl
        .delete("/purchase", {
          data: {
            purchase_ids: selected.value,
          },
        })
        .then((response) => {
          // console.log(response.data);
          selected.value = [];
          selectAll.value = false;
          getPurchase();
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

const getAllBanks = async () => {
  banksLoading.value = true;

  await axiosUrl
    .get("/allbanks")
    .then((response) => {
      banks.value = response.data;
      banksLoading.value = false;
    })
    .catch((error) => {
      banksLoading.value = false;
      swalErrorHandle(error);
    });
};

onMounted(() => {
  getPurchase();
  getAllBanks();
});
</script>

<style scoped>
</style>

<style>
.p-inputtext {
  padding: 6px 12px !important;
}
</style>