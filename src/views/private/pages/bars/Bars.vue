<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mt-3">
        <h2 class="mb-0">Bars</h2>

        <div class="d-flex">
          <div class="me-3">
            <input
              v-model="filters['global'].value"
              placeholder="Search Bar"
              class="form-control my-input"
            />
          </div>
          <button
            v-if="canDelete()"
            @click="onSubmit('delete')"
            :disabled="selected.length === 0"
            class="btn add-btn btn-danger px-4 mr-2"
          >
            <i class="fa-solid fa-minus"></i> Delete Bar
          </button>
          <button
            v-if="canCreate()"
            @click="openModal('add')"
            class="btn btn-success add-btn px-4"
          >
            <i class="fa-solid fa-plus"></i> Add Bar
          </button>
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

            <Column field="name" header="Name">
              <template #body="slotProps">
                {{ slotProps.data.name ? slotProps.data.name : "N/A" }}
              </template>
            </Column>

            <Column field="bar_code" header="Bar Code">
              <template #body="slotProps">
                {{ slotProps.data.bar_code ? slotProps.data.bar_code : "N/A" }}
              </template>
            </Column>

            <Column field="manager" header="Manager">
              <template #body="slotProps">
                {{ slotProps.data.manager ? slotProps.data.manager : "N/A" }}
              </template>
            </Column>

            <Column header="Date Created">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.created_at) }}
              </template>
            </Column>

            <Column header="Action">
              <template #body="slotProps">
                <Dropdown
                  @change="
                    checkSelectedAction(
                      selectedAction[slotProps.data.id],
                      slotProps.data
                    )
                  "
                  v-model="selectedAction[slotProps.data.id]"
                  optionLabel="label"
                  optionValue="id"
                  :options="dynamicActions()"
                  placeholder="Action"
                />
              </template>
            </Column>
          </DataTable>
        </div>

        <div v-else>
          <div class="card card-body">
            <div class="alert alert-warning" role="alert">
              <p class="text-center">No Bar Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal name="section-modal" :title="modalParams.title">
      <ModalContent>
        <form @submit.prevent="onSubmit(modalParams.title, currentEditID)">
          <div class="form-group mb-3">
            <label class="col-form-label fs-6">Name of Bar</label>
            <input
              class="form-control"
              type="text"
              v-model="modalForm.name"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label>Select Manager</label>
            <select v-model="modalForm.manager_id" class="form-control">
              <option value="null" selected>-- Select Manager --</option>
              <option
                v-for="option in managers"
                :value="option.id"
                :key="option.id"
              >
                {{ option.username }}
              </option>
            </select>
          </div>

          <div class="my-3">
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
import { ref, reactive, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useAuthStore } from "@/store/authStore";
import { formatDate } from "@/components/myHelperFunction";
import { Modal, ModalContent, open, close } from "@dimsog/vue-modal";
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
const managers = ref([]);
const selected = ref([]);
const selectAll = ref("");
const currentEditID = ref();
const selectedAction = ref([]);
const dynamicActions = () => {
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
};

const checkSelectedAction = (id, data) => {
  if (id === 1) {
    openModal("edit", data.id, data.name);
  } else if (id == 2) {
    router.push({ path: "/bars/" + data.bar_code });
  } else if (id === 3) {
    onSubmit("delete", id);
  }
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const modalParams = reactive({
  title: "",
});
const modalForm = reactive({
  name: "",
  manager_id: "",
  club_code: loggedInUser.club_code,
});

const openModal = (type, id, name) => {
  if (type === "add") modalParams.title = "Add Bar";
  else if (type === "edit") {
    modalParams.title = "Edit Bar";
    modalForm.name = name;
    currentEditID.value = id;
  }

  open("section-modal");
};

const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < items.value.length; i++)
      selected.value.push(items.value[i].id);
  else selected.value = [];
};

const getBar = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/bars")
    .then((response) => {
      items.value = response.data.data.bars;
      managers.value = response.data.data.managers;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
    });
};

const onSubmit = async (type, id) => {
  let url = "";
  let payload = {};
  if (type === "Add Bar") {
    url = "bars";
    payload = modalForm;
  } else if (type === "delete") {
    url = "bars";
    payload = {
      ids: selected.value,
    };
  } else if (type === "Edit Bar") {
    url = "bars/" + id;
    payload = modalForm;
  } else return;

  close("section-modal");
  isLoading.value = true;

  if (type === "delete" || type === "delete-m") {
    await axiosUrl
      .delete(url, { data: payload })
      .then(() => {
        isLoading.value = false;
        selected.value = [];
        selectAll.value = false;

        getBar();
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
        modalForm.name = "";
        modalParams.title = "";
        getBar();
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  }
};

onMounted(() => {
  getBar();
});
</script>

<style scoped>
</style>