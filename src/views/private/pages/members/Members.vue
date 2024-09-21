<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="d-flex justify-content-between align-items-center mt-3">
        <h2 class="mb-0">All Members</h2>

        <div class="d-flex align-items-end">
          <div class="me-3">
            <input
              v-model="filters['global'].value"
              placeholder="Keyword Member"
              class="form-control my-input py-2"
            />
          </div>

          <div>
            <button
              v-if="canDelete()"
              @click="onSubmit('delete-m')"
              class="btn btn-danger mr-1"
            >
              <i class="fa-solid fa-minus"></i> Delete
            </button>
            <router-link
              class="btn btn-info text-white m-1"
              to="/members/create"
              v-if="canCreate()"
              >Add</router-link
            >
            <button
              v-if="canCreate()"
              @click="onSynch()"
              class="btn btn-primary m-1"
            >
              Synchronize
            </button>
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
            <!-- <Column style="width: 5%">
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
            </Column> -->
            <Column field="image" header="Photo">
              <template #body="slotProps">
                <img
                  :src="slotProps.data.image"
                  alt=""
                  class="img-fluid"
                  style="height: 60px; width: 90px"
                />
              </template>
            </Column>

            <Column
              field="membership_id"
              header="Membership ID"
              style="width: 15%"
            ></Column>

            <!-- <Column field="name" header="Fullname">
              <template #body="slotProps">
                {{ slotProps.data.last_name }} {{ slotProps.data.first_name }}
                {{ slotProps.data.middle_name }}
              </template>
            </Column> -->
            <Column field="fullname" header="Fullname"> </Column>
            <Column field="phone_1" header="Phone"> </Column>

            <Column header="Gender">
              <template #body="slotProps">
                <span
                  v-if="
                    slotProps.data.gender == 'male' ||
                    slotProps.data.gender == 'm' ||
                    slotProps.data.gender == null
                  "
                  >Male</span
                >
                <span v-else class="text-danger">Female</span>
              </template>
            </Column>

            <Column header="Door Access">
              <template #body="slotProps">
                <span v-if="slotProps.data.status == 1" class="text-success"
                  >Access</span
                >
                <span v-else class="text-danger">No Access</span>
              </template>
            </Column>

            <Column header="Action">
              <template #body="slotProps">
                <Dropdown
                  @change="
                    checkSelectedAction(
                      selectedAction[slotProps.data.id],
                      slotProps.data.membership_id
                    )
                  "
                  class="w-100"
                  v-model="selectedAction[slotProps.data.id]"
                  optionLabel="label"
                  optionValue="id"
                  :options="dynamicOptions()"
                  placeholder="Action"
                />
              </template>
            </Column>
          </DataTable>
        </div>

        <div v-else>
          <div class="card card-body">
            <div class="alert alert-warning" role="alert">
              <p class="text-center">No member available</p>
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
import { useAuthStore } from "@/store/authStore";
import { swalErrorHandle } from "@/components/myHelperFunction";
import {
  canCreate,
  canUpdate,
  canDelete,
  canRead,
  canApprove,
  canReject,
} from "@/components/permission_restriction.js";
import router from "@/router";

const isLoading = ref(false);
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const items = ref([]);
const selected = ref([]);
const selectAll = ref("");
const currentEditID = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const selectedAction = ref([]);
const dynamicOptions = () => {
  let arr = [];
  if (canUpdate()) {
    arr.push({ label: "Edit", id: 1 });
  }
  if (canRead()) {
    arr.push({ label: "View", id: 2 });
  }
  if (canDelete()) {
    arr.push({ label: "Delete", id: 3 });
  }
  return arr;
  // { label: "Activate/Deactivate", id: 4 },
};

const checkSelectedAction = (id, data) => {
  if (id === 1) {
    router.push({
      path: "/members/create/",
      query: { edit: "true", id: data },
    });
  } else if (id == 2) {
    router.push({
      path: "/members/view/",
      query: { id: data },
    });
    // router.push({ path: "/members/view/" + data });
  } else if (id === 3) {
    onSubmit("delete", id);
  } else if (id === 4) {
    activate(data);
  }
};

const activate = async (data) => {
  isLoading.value = true;
  await axiosUrl
    .get("members/status/?membership_id=" + data)
    .then(() => {
      isLoading.value = false;
      getMembers();
    })
    .catch((error) => {
      console.log(error);
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const onSynch = async () => {
  isLoading.value = true;
  await axiosUrl
    .get("synch")
    .then((response) => {
      console.log(response);
      isLoading.value = false;
      swalSuccessHandle("Done Successful.");
      getMembers();
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const onSubmit = async (type, id) => {
  let payload = {};
  if (type === "delete") {
    payload = {
      ids: [id],
    };
  } else if (type === "delete-m") {
    payload = {
      ids: selected.value,
    };
  }
  isLoading.value = true;

  await axiosUrl
    .delete("payments/product", { data: payload })
    .then(() => {
      isLoading.value = false;
      selected.value = [];
      selectAll.value = false;
      getMembers();
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
  isLoading.value = true;

  await axiosUrl
    .get("/members")
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

onMounted(() => {
  getMembers();
});
</script>

<style scoped>
</style>