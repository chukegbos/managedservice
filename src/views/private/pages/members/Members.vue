<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h2>All Members</h2>

        <div class="d-flex">
          <div class="me-3">
            <input
              v-model="filters['global'].value"
              placeholder="Keyword Member"
              class="form-control my-input"
            />
          </div>

          <div>
            <button
              v-if="selected.length > 0"
              @click="onSubmit('delete')"
              class="btn add-btn px-4"
            >
              <i class="fa-solid fa-minus"></i> Delete
            </button>
            <router-link class="btn add-btn me-2 px-4" to="/members/create"
              >Add</router-link
            >
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

            <Column field="name" header="Fullname">
              <template #body="slotProps">
                {{ slotProps.data.last_name }} {{ slotProps.data.first_name }}
                {{ slotProps.data.middle_name }}
              </template>
            </Column>

            <Column field="phone_1" header="Phone"> </Column>

            <Column header="Gender">
              <template #body="slotProps">
                <span v-if="slotProps.data.gender == 'male'">Male</span>
                <span v-else class="text-danger">Female</span>
              </template>
            </Column>

            <Column header="Status">
              <template #body="slotProps">
                <span v-if="slotProps.data.status == 1" class="text-success"
                  >Access</span
                >
                <span v-else class="text-danger">No Access</span>
              </template>
            </Column>

            <Column header="Gender">
              <template #body="slotProps">
                {{ slotProps.data.gender }}
              </template>
            </Column>

            <Column header="Action">
              <template #body="">
                <Dropdown
                  @change="checkSelectedAction(selectedAction)"
                  v-model="selectedAction"
                  :options="cities"
                  optionLabel="label"
                  optionValue="id"
                  placeholder="Action"
                />
                <!-- Example single danger button -->
                <!-- <div class="btn-group">
                  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    Action
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="javascript:void(0)" @click="view(slotProps.data)">View</a></li>
                    <li>
                      <a class="dropdown-item" href="javascript:void(0)" @click="doorUser(slotProps.data)" v-if="slotProps.data.status==0">Activate Door</a>
                      <a class="dropdown-item" href="javascript:void(0)" @click="doorUser(slotProps.data)" v-else >Deactivate Door</a>
                    </li>
                    <li><a class="dropdown-item" href="javascript:void(0)" @click="editModal(slotProps.data)">Edit</a></li>
                    <li><a class="dropdown-item" href="javascript:void(0)" @click="deleteUser(slotProps.data.id)">Delete</a></li>
                  </ul>
                </div> -->
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
import { ref, reactive, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useAuthStore } from "@/store/authStore";
import { formatDate } from "@/components/myHelperFunction";

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
const selectedAction = ref();
const cities = ref([
  { label: "Edit", id: 1 },
  { label: "Activate", id: 2 },
  { label: "View", id: 3 },
  { label: "Delete", id: 4 },
]);

const checkSelectedAction = (id) => {
  
}

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
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
    });
};

onMounted(() => {
  getMembers();
});
</script>

<style scoped>
</style>