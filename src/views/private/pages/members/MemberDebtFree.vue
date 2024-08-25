<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="text-center">
        <h6 class="my-2">
          <b>{{ description }}</b>
        </h6>
      </div>
      <form
        @submit.prevent="getDebt"
        class="row align-items-end"
        v-if="canRead()"
      >
        <div class="col-md-4">
          <label for="">Start Date</label>
          <input
            type="date"
            id="startDate"
            v-model="startDate"
            class="form-control"
            @change="validateDates"
          />
        </div>

        <div class="col-md-4">
          <label for="">Password</label>
          <input
            type="date"
            id="endDate"
            v-model="endDate"
            class="form-control"
            @change="validateDates"
          />
        </div>
        <div class="col-md-4">
          <button
            type="submit"
            class="btn btn-primary px-5"
            :disabled="!isValid"
          >
            Filter
          </button>
        </div>
      </form>

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
            <Column field="membership_id" header="Membership ID"></Column>

            <Column field="name" header="Fullname">
              <template #body="slotProps">
                {{ slotProps.data.last_name }} {{ slotProps.data.first_name }}
                {{ slotProps.data.middle_name }}
              </template>
            </Column>
            <Column field="debts" header="Debt">
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.debts) }}
              </template>
            </Column>
          </DataTable>
        </div>

        <div v-else>
          <div class="card card-body">
            <div class="alert alert-warning" role="alert">
              <p class="text-center">No data available</p>
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
import { formatDate, swalErrorHandle } from "@/components/myHelperFunction";
import router from "@/router";
import {
  canCreate,
  canUpdate,
  canDelete,
  canRead,
  canApprove,
  canReject,
} from "@/components/permission_restriction.js";

const startDate = ref("");
const endDate = ref("");
const isValid = ref(false);

const validateDates = () => {
  // Ensure both dates are provided and startDate is not after endDate
  isValid.value =
    startDate.value && endDate.value && startDate.value <= endDate.value;
};

const isLoading = ref(false);
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const items = ref([]);
const description = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Function to format dates as YYYY-MM-DD (required by input[type="date"])
const setDate = (date) => {
  let d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
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

const getDebt = async () => {
  if (isValid.value) {
    isLoading.value = true;

    await axiosUrl
      .get(
        "/report/membership/debtFree?startDate=" +
          startDate.value +
          "&endDate=" +
          endDate.value
      )
      .then((response) => {
        items.value = response.data.data.members;
        console.log(items.value);
        description.value = response.data.data.description;
        isLoading.value = false;
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  }
};

onMounted(() => {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  startDate.value = setDate(thirtyDaysAgo);
  endDate.value = setDate(today);

  validateDates();
  getDebt();
});
</script>
  
  <style scoped>
</style>