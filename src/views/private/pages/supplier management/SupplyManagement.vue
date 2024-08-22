<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container mt-3">
      <div class="">
        <div class="d-flex justify-content-between align-items-center mt-3">
          <h2 class="mb-0">Supply Management</h2>

          <div class="d-flex">
            <div class="me-3">
              <input
                v-model="filters['global'].value"
                placeholder="Keyword Search"
                class="form-control my-input"
              />
            </div>

            <div class="d-flex align-items-end">
              <button
                v-if="canDelete()"
                @click="onSubmit('delete')"
                class="btn btn-danger add-btn px-4 me-2"
                :disabled="selected.length === 0"
              >
                <i class="fa-solid fa-minus"></i> Delete Supply
              </button>
              <button
                v-if="canCreate()"
                @click="openModal('add')"
                class="btn btn-success add-btn px-4"
              >
                <i class="fa-solid fa-plus"></i> Add Supply
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div v-if="items.length > 0 && canRead()">
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
              field="contact_person"
              header="Contact"
              :sortable="true"
              style="width: 25%"
            >
              <template #body="{ data }">
                <small
                  ><span class="text-primary">Name: </span>
                  {{ data.contact_person ? data.contact_person : "N/A" }}</small
                >
                <br />
                <small
                  ><span class="text-primary">Email: </span>
                  {{ data.email ? data.email : "N/A" }}</small
                >
                <br />
                <small
                  ><span class="text-primary">Mobile Number: </span>
                  {{ data.phone ? data.phone : "N/A" }}</small
                >
              </template>
            </Column>
            <Column
              field="phone"
              header="Mobile Number"
              :sortable="true"
              style="width: 10%"
            >
              <template #body="{ data }">
                {{ data.phone ? data.phone : "N/A" }}
              </template>
            </Column>
            <Column
              field="address"
              header="Address"
              :sortable="true"
              style="width: 10%"
            >
              <template #body="{ data }">
                {{ data.address ? data.address : "N/A" }}
              </template>
            </Column>
            <Column
              field="supplier_name"
              header="Supplier Name"
              :sortable="true"
              style="width: 10%"
            >
              <template #body="{ data }">
                {{ data.supplier_name ? data.supplier_name : "N/A" }}
              </template>
            </Column>
            <Column
              field="bank_name"
              header="Bank"
              :sortable="true"
              style="width: 25%"
            >
              <template #body="{ data }">
                <small
                  ><span class="text-primary">Bank Name: </span>
                  {{ data.bank_name ? data.bank_name : "N/A" }}</small
                >
                <br />
                <small
                  ><span class="text-primary">Bank Account: </span>
                  {{ data.account_name ? data.account_name : "N/A" }}</small
                >
                <br />
                <small
                  ><span class="text-primary">Account Number: </span>
                  {{ data.bank_account ? data.bank_account : "N/A" }}</small
                >
              </template>
            </Column>
            <Column
              field="created_At"
              header="Date Created"
              :sortable="true"
              style="width: 10%"
            >
              <template #body="{ data }">
                {{ formatDate(data.created_at) }}
              </template>
            </Column>
            <Column header="Action" style="width: 5%">
              <template #body="{ data }">
                <button
                  v-if="canUpdate()"
                  @click="openModal('edit', data)"
                  class="btn btn-warning btn-sm m-1 text-white px-4"
                >
                  Edit
                </button>
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

    <ModalComp
      :isToggled="isToggled"
      :title="modalParams.title"
      @close="isToggled = false"
    >
      <form
        @submit.prevent="onSubmit(modalParams.title, currentEditID)"
        class="container"
      >
        <div class="row fs-14 align-items-end">
          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6">Supplier Name</label>
            <input
              class="form-control"
              type="text"
              v-model="modalForm.supplier_name"
              required
            />
          </div>

          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6">Contact Person</label>
            <input
              class="form-control"
              type="text"
              v-model="modalForm.contact_person"
              required
            />
          </div>

          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6">Email</label>
            <input
              class="form-control"
              type="email"
              v-model="modalForm.email"
              required
            />
          </div>

          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6">Phone Number</label>
            <input
              class="form-control"
              type="text"
              v-model="modalForm.phone"
              maxlength="11"
              @input="handleInput($event)"
              placeholder=""
              required
            />
          </div>

          <div class="input-block col-12">
            <label class="col-form-label fs-6">Address</label>
            <input
              class="form-control"
              type="text"
              v-model="modalForm.address"
              required
            />
          </div>

          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6"
              >Bank Name
              <MiniSpinner v-if="banksLoading" />
              <span v-if="!isObjectEmpty(bankDetails)">
                <span
                  class="text-primary"
                  v-if="bankDetails.account_name"
                  style="font-size: 12px"
                  ><small>({{ bankDetails.account_name }})</small>
                </span></span
              ></label
            >
            <Dropdown
              class="w-100"
              v-model="modalForm.bank_name"
              optionLabel="name"
              optionValue="code"
              :options="banks"
              :disabled="
                banksLoading || banks.length === 0 || bankVerifyLoading
              "
              filter
              placeholder=""
            />
          </div>

          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6"
              >Account Number
              <MiniSpinner v-if="bankVerifyLoading" />
            </label>
            <input
              class="form-control"
              type="text"
              v-model="modalForm.bank_account"
              maxlength="10"
              @input="handleInput2($event)"
              placeholder=""
              :disabled="bankVerifyLoading"
              required
            />
          </div>

          <div class="col-12">
            <button class="btn btn-primary account-btn w-100" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </ModalComp>
  </div>
</template>

<script setup>
import { axiosUrl } from "@/env";
import { ref, reactive, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import Swal from "sweetalert2";
import {
  formatDate,
  swalErrorHandle,
  formatPayloadErrorKey,
  findEmptyKeys,
  isObjectEmpty,
  swalConfirmDelete,
} from "@/components/myHelperFunction";
import {
  canCreate,
  canUpdate,
  canDelete,
  canRead,
  canApprove,
  canReject,
} from "@/components/permission_restriction.js";
const isToggled = ref(false);
const isLoading = ref(false);
const bankVerifyLoading = ref(false);
const banksLoading = ref(false);
const items = ref([]);
const banks = ref([]);
const bankDetails = ref({});
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
  supplier_name: "",
  contact_person: "",
  email: "",
  phone: null,
  address: "",
  bank_name: "",
  bank_account: "",
  account_name: "",
});

const handleInput = (event) => {
  // Remove non-digit characters
  modalForm.phone = event.target.value.replace(/\D/g, "").slice(0, 11);
};

const handleInput2 = (event) => {
  // Remove non-digit characters
  modalForm.bank_account = event.target.value.replace(/\D/g, "").slice(0, 10);
  if (modalForm.bank_account.length === 10) {
    // console.log(modalForm.bank_account);
    verifyAccDetails(modalForm.bank_account, modalForm.bank_name);
  }
};

const verifyAccDetails = async (a, b) => {
  if (a.toString().length < 10 || b === "" || b === null || b === undefined)
    return;
  bankVerifyLoading.value = true;
  bankDetails.value = {};
  await axiosUrl
    .post("/get-bank", {
      account_number: a,
      bank_id: b,
    })
    .then((response) => {
      bankVerifyLoading.value = false;
      // console.log(response.data);
      if (response.data.status === false) {
        bankDetails.value = {};
        Swal.fire({
          title: "Failed!",
          text: response.data.message,
          icon: "warning",
          confirmButtonColor: "#FACEA8",
        });
      } else {
        bankDetails.value = response.data?.data;
      }
    })
    .catch((error) => {
      bankVerifyLoading.value = false;
      swalErrorHandle(error);
    });
};

const openModal = (type, data) => {
  if (type === "add") modalParams.title = "Add Supply";
  else if (type === "edit") {
    modalParams.title = "Edit Supply";
    currentEditID.value = data.id;
    modalForm.supplier_name = data.supplier_name;
    modalForm.contact_person = data.contact_person;
    modalForm.email = data.email;
    modalForm.phone = data.phone;
    modalForm.address = data.address;
    modalForm.bank_name = data.bank_name;
    modalForm.bank_account = data.bank_account;
    modalForm.account_name = data.account_name;
    verifyAccDetails(modalForm.bank_account, modalForm.bank_name);
  }

  isToggled.value = true;
};

const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < items.value.length; i++)
      selected.value.push(items.value[i].id);
  else selected.value = [];
};

const getSupplyManagement = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/suppliers")
    .then((response) => {
      items.value = response.data.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
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

const onSubmit = async (type, id) => {
  let url = "/suppliers";
  let payload = {};
  if (type === "Add Supply") {
    if (!isObjectEmpty(bankDetails.value)) {
      modalForm.account_name = bankDetails.value?.account_name;
    }

    const emptyKeys = findEmptyKeys(modalForm);

    if (emptyKeys) {
      if (emptyKeys === "account_name") {
        Swal.fire({
          title: "Verify Bank Details !",
          text: `Please enter correct bank name and account number to proceed`,
          icon: "warning",
          confirmButtonColor: "#FACEA8",
        });
        return;
      } else {
        Swal.fire({
          title: "Failed!",
          text: `Please fill up ${formatPayloadErrorKey(emptyKeys)}`,
          icon: "warning",
          confirmButtonColor: "#FACEA8",
        });
        return;
      }
    }
    url = "suppliers";
    payload = modalForm;
  } else if (type === "delete") {
    url = "/suppliers";
    payload = {
      ids: selected.value,
    };
  } else if (type === "Edit Supply") {
    url = "/suppliers/" + id;
    payload = modalForm;
  } else return;

  close("supply-management-modal");

  if (type !== "delete") {
    isLoading.value = true;
  }
  if (type === "delete") {
    if (selected.value.length <= 0) return;
    swalConfirmDelete(
      async () => {
        isLoading.value = true;
        await axiosUrl
          .delete(url, { data: payload })
          .then((response) => {
            // console.log(response.data);
            selected.value = [];
            selectAll.value = false;
            getSupplyManagement();
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
  } else if (type === "Edit Supply") {
    await axiosUrl
      .put(url, payload)
      .then(() => {
        isLoading.value = false;

        modalParams.title = "";
        bankDetails.value = {};
        modalForm.supplier_name = "";
        modalForm.contact_person = "";
        modalForm.email = "";
        modalForm.phone = null;
        modalForm.address = "";
        modalForm.bank_name = "";
        modalForm.bank_account = "";
        modalForm.account_name = "";
        isToggled.value = false;
        getSupplyManagement();
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
        modalParams.title = "";

        bankDetails.value = {};
        modalForm.supplier_name = "";
        modalForm.contact_person = "";
        modalForm.email = "";
        modalForm.phone = null;
        modalForm.address = "";
        modalForm.bank_name = "";
        modalForm.bank_account = "";
        modalForm.account_name = "";

        getSupplyManagement();
        isToggled.value = false;
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  }
};

onMounted(() => {
  getSupplyManagement();
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