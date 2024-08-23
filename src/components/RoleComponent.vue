<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Role Management</h2>

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
                class="btn btn-danger add-btn px-4 mr-2"
              >
                <i class="fa-solid fa-minus"></i> Delete
              </button>
              <!-- <button v-else class="btn add-btn px-4">
                <i class="fa-solid fa-minus"></i> Delete
              </button> -->
              <!-- <button @click="visible = true" class="btn add-btn me-2 px-4">
                < Add
              </button> -->
              <button @click="openModal('add')" class="btn btn-success add-btn me-2 px-4 ml-2s">
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
            <Column header="Role Title" style="width: 20%">
              <template #body="slotProps">
                {{
                  slotProps.data.title
                    ? slotProps.data.title
                    : ""
                }}
              </template>
            </Column>
            <!-- <Column header="Date Created  " style="width: 15%">
              <template #body="slotProps">
                {{ 
                slotProps.data.created_at
                    ? formatDate(slotProps.data.created_at)
                    : "N/A"
                   
                  }}
              </template>
            </Column> -->
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
              <p class="text-center">No Role available</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Modal name="role-modal" :title="modalParams.title">
      <ModalContent>
        <form
          @submit.prevent="onSubmit(modalParams.title, currentEditID)"
          style="width: 95%; margin: 0 auto"
        >
          <div class="row">
            <div class="col-12 mb-2">
              <label class="col-form-label fs-6">Role Title</label>
              <input
                class="form-control"
                type="text"
                v-model="roleData.title"
                required
              />
            </div>
          </div>

          <div class="col-12 mb-3">
          <label class="col-form-label fs-6">Add Permissions</label>
          <div>
              <label :for="permission.id" v-for="permission in permissions" :key="permission.id"
              class="d-block my-2">
                  <input
                  :id="permission.name"
                      type="checkbox"
                      :value="permission.id"
                      class="form-check-input"
                      v-model="roleData.permissions"
                      
                  />
                  {{ permission.name }}
              </label>
          </div>
          </div>

          <div class="mt-1">
            <button class="btn btn-primary account-btn w-100" type="submit">
              {{ modalParams.btnLabel }}
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
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const items = ref([]);
const selected = ref([]);
const selectAll = ref("");
const actionValue = ref([]);
const currentEditID = ref();
const isToggled = ref(false);
const addVisible = ref(false);
const roleData = reactive({
  title: "",
  permissions: []
});

const permissions = ref([]);


const options = [
  {
    id: "1",
    name: "Edit",
  },
  {
    id: "2",
    name: "Delete",
  },
];

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const modalParams = reactive({
  title: "",
  btnLabel: ""
});

const checkSelectedAction = (id, data) => {
  if (id === "1") {
    openModal("edit", data);
  } else if (id === "2") {
    onSubmit("delete", data.id);
  }
};

const openModal = (type, data) => {
  if (type === "add") {
      modalParams.title = "Add Role";
      modalParams.btnLabel = 'Update';
      roleData.title = "";
      roleData.permissions = [];

  }
  else if (type === "edit") {
    modalParams.title = "Edit Role";
    modalParams.btnLabel = 'Update';
    roleData.title = data.title;
    data.permissions.forEach(element => {
      roleData.permissions.push(element.id);
    });
    currentEditID.value = data.id;

  }

  open("role-modal");
};



const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < items.value.length; i++)
      selected.value.push(items.value[i].id);
  else selected.value = [];
};


const getRoles = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/roles")
    .then((response) => {
      items.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const getPermissions = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/roles/permissions")
    .then((response) => {
      permissions.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};


const loadFun = (type) => {
  if (type === "Add Role" || type === "Edit Role") {
    roleData.title = "";
    roleData.permissions = [];
  } else if (type === "delete" || type === "delete-m") {
    selected.value = [];
    selectAll.value = false;
  }
};

const onSubmit = async (type, id) => {
  let url = "";
  let payload = {};
  if (type === "Add Role") {
    url = "/roles";
    payload.title = roleData.title;
    payload.permissions = roleData.permissions;
  } else if (type === "delete") {
    url = "/roles";
    payload = {
      ids: [id],
    };
  } else if (type === "delete-m") {
    url = "/roles";
    payload = {
      ids: selected.value,
    };
  } else if (type === "Edit Role") {
    url = "/roles/" + id;
    payload.title = roleData.title;
    payload.permissions = roleData.permissions;
  } else return;

  close("role-modal");
  isLoading.value = true;

  if (type === "Edit Role") {
    await axiosUrl
      .put(url, payload)
      .then(() => {
        isLoading.value = false;
        loadFun(type);
        swalSuccessHandle("Role Updated Successfully");
        getRoles();
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
        swalSuccessHandle("Role Deleted Successfully");
        getRoles();
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
        getRoles();
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  }
};

onMounted(() => {
  getRoles();
  getPermissions();
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