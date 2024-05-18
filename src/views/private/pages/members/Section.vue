<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Member Sections</h2>

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
                <i class="fa-solid fa-minus"></i> Delete Section
              </button>
              <button @click="openModal('add')" class="btn add-btn me-2 px-4">
                <i class="fa-solid fa-plus"></i> Add Section
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
            <Column field="name" header="Name" style="width: 40%">
              <template #body="slotProps">
                {{ slotProps.data.name ? slotProps.data.name : "N/A" }}
              </template>
            </Column>
            <Column header="Date Created" style="width: 35%">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.created_at) }}
              </template>
            </Column>
            <Column header="Action" style="width: 20%">
              <template #body="slotProps">
                <button
                  @click="
                    openModal('edit', slotProps.data.id, slotProps.data.name)
                  "
                  class="btn btn-warning btn-sm m-1 text-white px-4"
                >
                  Edit
                </button>
              </template>
            </Column>
          </DataTable>
        </div>

        <div v-else>
          <div class="card card-body">
            <div class="alert alert-warning" role="alert">
              <p class="text-center">No section available</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal name="section-modal" :title="modalParams.title">
      <ModalContent>
        <form @submit.prevent="onSubmit(modalParams.title, currentEditID)">
          <div class="input-block mb-4 mx-3">
            <label class="col-form-label fs-6">Name</label>
            <input
              class="form-control"
              type="text"
              v-model="modalForm.name"
              required
            />
          </div>

          <div class="mx-3">
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
const modalParams = reactive({
  title: "",
});
const modalForm = reactive({
  name: "",
  club_code: loggedInUser.club_code,
});

const openModal = (type, id, name) => {
  if (type === "add") modalParams.title = "Add Section";
  else if (type === "edit") {
    modalParams.title = "Edit Section";
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

const getSection = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/sections")
    .then((response) => {
      items.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
    });
};

const onSubmit = async (type, id) => {
  let url = "";
  let payload = {};
  if (type === "Add Section") {
    url = "sections/create";
    payload = modalForm;
  } else if (type === "delete") {
    url = "sections/delete";
    payload = {
      ids: selected.value,
    };
  } else if (type === "Edit Section") {
    url = "sections/edit/" + id;
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

        getSection();
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

        getSection();
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  }
};

onMounted(() => {
  getSection();
});
</script>

<style scoped>
</style>