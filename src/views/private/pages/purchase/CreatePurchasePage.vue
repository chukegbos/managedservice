<template>
  <div class="content-wrapper">
    <loading :active="isLoading || isLoading2 || isLoading3" />

    <div class="container">
      <h2 class="mt-3">Items Purchase</h2>
      <div class="d-flex mb-3">
        <p class="mb-0 btn btn-sm btn-outline-success" v-if="canCreate()">
          <font-awesome-icon :icon="['fas', 'plus']" class="me-2" />Add New
          Product
        </p>
        <p
          v-if="canCreate()"
          class="mb-0 ms-3 btn btn-sm btn-outline-success"
          @click="isToggled = true"
        >
          <font-awesome-icon :icon="['fas', 'plus']" class="me-2" />Add New
          Supplier
        </p>
      </div>

      <div class="shadow p-4 rounded" v-if="canCreate() && canRead()">
        <div class="d-flex justify-content-between border-bottom pb-3">
          <div class="w-50 d-flex">
            <div class="me-3">
              <label class="form-label fs-6">Select Supplier</label>
              <Dropdown
                class="w-100"
                v-model="createPayload.supplier_id"
                optionLabel="supplier_name"
                optionValue="id"
                :options="suppliers"
                :disabled="isLoading || suppliers.length === 0"
                filter
                placeholder=""
              />
            </div>
            <div>
              <label class="form-label fs-6">Mode of Payment</label>
              <Dropdown
                class="w-100"
                v-model="createPayload.mode_of_payment_id"
                optionLabel="name"
                optionValue="id"
                :options="payment_channels"
                :disabled="isLoading || payment_channels.length === 0"
                filter
                placeholder=""
              />
            </div>
          </div>

          <div class="w-25">
            <label class="form-label fs-6">Date of Purchase</label>
            <div>
              <Calendar
                v-model="createPayload.date_of_purchase"
                class="w-100"
              />
            </div>
          </div>
        </div>

        <div class="mt-4">
          <table class="table" style="font-size: 14px">
            <thead>
              <tr>
                <th scope="col" style="width: 14%">Product</th>
                <th scope="col" style="width: 8%">Pack</th>
                <th scope="col" style="width: 8%">Quantity</th>
                <th scope="col" style="width: 17%">
                  Unit Cost Price <br />
                  (₦/Crate)
                </th>
                <th scope="col" style="width: 17%">
                  Unit Cost Price <br />
                  (₦/Bottle)
                </th>
                <th scope="col" style="width: 17%">
                  Unit Selling Price <br />
                  (₦/Bottle)
                </th>
                <th scope="col" style="width: 17%">
                  Total Cost Price <br />
                  (₦/Crate)
                </th>
                <th scope="col" style="width: 2%"></th>
              </tr>
            </thead>
            <tbody v-for="(item, i) in createPayload.items" :key="item">
              <tr>
                <td>
                  <Dropdown
                    class="w-100"
                    @change="
                      updateField(i, createPayload.items[i].product_code)
                    "
                    v-model="createPayload.items[i].product_code"
                    optionLabel="product_name"
                    optionValue="product_code"
                    :options="products"
                    :disabled="isLoading || products.length === 0"
                    filter
                    placeholder=""
                  />
                </td>
                <td>
                  <input
                    type="number"
                    class="form-control"
                    @input="productInput(i, 'pack')"
                    v-model="createPayload.items[i].pack"
                    :disabled="createPayload.items[i].product_code === ''"
                  />
                </td>
                <td>
                  <p
                    class="bg-secondary text-white p-2 rounded mb-0 text-center"
                    style="width: fit-content"
                  >
                    {{
                      createPayload.items[i].quantity
                        ? createPayload.items[i].quantity
                        : "0"
                    }}
                  </p>
                </td>
                <td>
                  <input
                    type="number"
                    class="form-control"
                    @input="productInput(i, 'crate')"
                    v-model="createPayload.items[i].unit_cost_price_crate"
                    :disabled="createPayload.items[i].product_code === ''"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    class="form-control"
                    @input="productInput(i, 'bottle')"
                    v-model="createPayload.items[i].unit_cost_price"
                    :disabled="createPayload.items[i].product_code === ''"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    class="form-control"
                    v-model="createPayload.items[i].unit_sell_price"
                    :disabled="createPayload.items[i].product_code === ''"
                  />
                </td>
                <td>
                  <p
                    class="bg-secondary text-white p-2 rounded mb-0 text-center"
                    style="width: fit-content"
                  >
                    {{
                      createPayload.items[i].total_cost_price
                        ? createPayload.items[i].total_cost_price
                        : "0.00"
                    }}
                  </p>
                </td>
                <td>
                  <a href="#" @click="deleteField(i)" class="text-danger">
                    <i class="fa fa-times"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="d-flex justify-content-between">
          <button class="btn btn-sm btn-warning text-white" @click="addField()">
            Add Field
            {{
              createPayload.supplier_id === null ||
              createPayload.supplier_id === "" ||
              createPayload.mode_of_payment_id === null ||
              createPayload.mode_of_payment_id === "" ||
              createPayload.date_of_purchase === null ||
              createPayload.date_of_purchase === "" ||
              createPayload.items.length === 0
            }}
          </button>
          <button
            class="btn btn-sm btn-success"
            :disabled="
              createPayload.supplier_id === null ||
              createPayload.supplier_id === '' ||
              createPayload.mode_of_payment_id === null ||
              createPayload.mode_of_payment_id === '' ||
              createPayload.date_of_purchase === null ||
              createPayload.date_of_purchase === '' ||
              createPayload.items.length === 0
            "
            @click="
              createPurchase(
                route.query.id || route.query.purchase_code ? true : false
              )
            "
          >
            {{
              route.query.id || route.query.purchase_code ? "Update" : "Save"
            }}
          </button>
        </div>
      </div>
    </div>

    <ModalComp
      :isToggled="isToggled"
      title="Add Supply"
      @close="isToggled = false"
    >
      <form @submit.prevent="createSupplier()" class="container">
        <div class="row fs-14 align-items-end">
          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6">Supplier Name</label>
            <input
              class="form-control"
              type="text"
              v-model="supplierPayload.supplier_name"
              required
            />
          </div>

          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6">Contact Person</label>
            <input
              class="form-control"
              type="text"
              v-model="supplierPayload.contact_person"
              required
            />
          </div>

          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6">Email</label>
            <input
              class="form-control"
              type="email"
              v-model="supplierPayload.email"
              required
            />
          </div>

          <div class="input-block col-12 col-md-6">
            <label class="col-form-label fs-6">Phone Number</label>
            <input
              class="form-control"
              type="text"
              v-model="supplierPayload.phone"
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
              v-model="supplierPayload.address"
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
                  ><small>({{ bankDetails.account_name }})</small></span
                ></span
              ></label
            >
            <Dropdown
              class="w-100"
              v-model="supplierPayload.bank_name"
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
              v-model="supplierPayload.bank_account"
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
import Swal from "sweetalert2";
import {
  swalErrorHandle,
  findEmptyKeys,
  formatPayloadErrorKey,
  isObjectEmpty,
} from "@/components/myHelperFunction";
import {
  canCreate,
  canUpdate,
  canDelete,
  canRead,
  canApprove,
  canReject,
} from "@/components/permission_restriction.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const isToggled = ref(false);
const isLoading = ref(false);
const isLoading2 = ref(false);
const isLoading3 = ref(false);
const bankVerifyLoading = ref(false);
const banksLoading = ref(false);
const payment_channels = ref([]);
const products = ref([]);
const suppliers = ref([]);
const items = ref([]);
const banks = ref([]);
const purchaseData = ref([]);
const purchaseTopData = ref([]);
const bankDetails = ref([]);
const createPayload = ref({
  supplier_id: null,
  mode_of_payment_id: null, //Cash Payment or Credit Payment
  date_of_purchase: "",
  amount_paid: null,
  items: [
    {
      product_code: "",
      product_name: "",
      quantity: null,
      pack: null,
      unit_cost_price: null,
      unit_cost_price_crate: null,
      unit_sell_price: null,
      total_cost_price: null,
    },
  ],
});

const supplierPayload = reactive({
  supplier_name: "",
  contact_person: "",
  email: "",
  phone: null,
  address: "",
  bank_name: "",
  bank_account: "",
  account_name: "",
});

const addField = () => {
  let newField = {
    product_code: "",
    product_name: "",
    quantity: null,
    pack: null,
    unit_cost_price: null,
    unit_cost_price_crate: null,
    unit_sell_price: null,
    total_cost_price: null,
  };
  createPayload.value.items.push(newField);
};

const deleteField = (id) => {
  createPayload.value.items.splice(id, 1);
};

const updateField = (id, productCode) => {
  let filteredItems = products.value.filter(
    (item) => item.product_code === productCode
  );
  // console.log(filteredItems[0].product_name);

  createPayload.value.items[id].product_code = productCode;
  createPayload.value.items[id].product_name = filteredItems[0].product_name;
  if (createPayload.value.items[id].pack === null)
    createPayload.value.items[id].pack = 1;

  createPayload.value.items[id].quantity =
    filteredItems[0].number_per_pack * createPayload.value.items[id].pack;
  createPayload.value.items[id].unit_cost_price = filteredItems[0].cost_price;
  createPayload.value.items[id].unit_sell_price = filteredItems[0].sell_price;
  createPayload.value.items[id].unit_cost_price_crate =
    createPayload.value.items[id].unit_cost_price *
    filteredItems[0].number_per_pack;
  createPayload.value.items[id].total_cost_price =
    createPayload.value.items[id].unit_cost_price_crate *
    createPayload.value.items[id].pack;
};

const productInput = (id, type) => {
  let filteredItems = products.value.filter(
    (item) => item.product_code === createPayload.value.items[id].product_code
  );

  switch (type) {
    case "pack":
      createPayload.value.items[id].quantity =
        filteredItems[0].number_per_pack * createPayload.value.items[id].pack;
      createPayload.value.items[id].total_cost_price =
        createPayload.value.items[id].unit_cost_price_crate *
        createPayload.value.items[id].pack;
      break;
    case "crate":
      createPayload.value.items[id].total_cost_price =
        createPayload.value.items[id].unit_cost_price_crate *
        createPayload.value.items[id].pack;
      createPayload.value.items[id].unit_cost_price = parseInt(
        createPayload.value.items[id].unit_cost_price_crate /
          filteredItems[0].number_per_pack
      );
      break;
    case "bottle":
      createPayload.value.items[id].unit_cost_price_crate = parseInt(
        createPayload.value.items[id].unit_cost_price *
          filteredItems[0].number_per_pack
      );
      createPayload.value.items[id].total_cost_price =
        createPayload.value.items[id].unit_cost_price_crate *
        createPayload.value.items[id].pack;
      break;
    default:
      break;
  }
};

const handleInput = (event) => {
  // Remove non-digit characters
  supplierPayload.phone = event.target.value.replace(/\D/g, "").slice(0, 11);
};

const handleInput2 = (event) => {
  // Remove non-digit characters
  supplierPayload.bank_account = event.target.value
    .replace(/\D/g, "")
    .slice(0, 10);
  if (supplierPayload.bank_account.length === 10) {
    // console.log(supplierPayload.bank_account);
    verifyAccDetails(supplierPayload.bank_account, supplierPayload.bank_name);
  }
};

const verifyAccDetails = async (a, b) => {
  if (a.toString().length < 10 || b === "" || b === null || b === undefined)
    return;
  bankVerifyLoading.value = true;
  bankDetails.value = [];
  await axiosUrl
    .post("/get-bank", {
      account_number: a,
      bank_id: b,
    })
    .then((response) => {
      bankVerifyLoading.value = false;
      // console.log(response.data);
      bankDetails.value = {};
      if (response.data.status === false) {
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

const createSupplier = async () => {
  if (!isObjectEmpty(bankDetails.value)) {
    supplierPayload.account_name = bankDetails.value?.account_name;
  }

  const emptyKeys = findEmptyKeys(supplierPayload);
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

  isLoading.value = true;
  await axiosUrl
    .post("/suppliers", supplierPayload)
    .then((response) => {
      isLoading.value = false;
      // console.log(response.data);
      if (response.data.status === false) {
        Swal.fire({
          title: "Failed!",
          text: response.data?.message,
          icon: "warning",
          confirmButtonColor: "#FACEA8",
        });
      } else {
        bankDetails.value = {};
        supplierPayload.supplier_name = "";
        supplierPayload.contact_person = "";
        supplierPayload.email = "";
        supplierPayload.phone = null;
        supplierPayload.address = "";
        supplierPayload.bank_name = "";
        supplierPayload.bank_account = "";
        supplierPayload.account_name = "";

        isToggled.value = false;
      }
    })
    .catch((error) => {
      isLoading.value = false;
      swalErrorHandle(error);
    });
};

const createPurchase = async (check = false) => {
  // Validate required fields in `createPayload.value`
  const validations = [
    { field: "supplier_id", message: "Supplier" },
    { field: "mode_of_payment_id", message: "Mode of Payment" },
    { field: "date_of_purchase", message: "Date of Purchase" },
  ];

  for (const { field, message } of validations) {
    if (!createPayload.value[field]) {
      Swal.fire({
        title: "Failed!",
        text: `Please fill up ${message}`,
        icon: "warning",
        confirmButtonColor: "#FACEA8",
      });
      return;
    }
  }

  // Validate each item in `createPayload.value.items`
  if (!check) {
    for (let i = 0; i < createPayload.value.items.length; i++) {
      const item = createPayload.value.items[i];
      for (const key in item) {
        if (["pack", "unit_cost_price_crate", "product_name"].includes(key)) {
          continue;
        }

        const titles = {
          product_code: "Product",
          quantity: "Quantity",
          unit_cost_price: "Unit Cost Price (₦/Bottle)",
          unit_sell_price: "Unit Selling Price (₦/Bottle)",
          total_cost_price: "Total Cost Price (₦/Crate)",
        };

        const title = titles[key] || key;
        const suffix = ["st", "nd", "rd"][((i + 1) % 10) - 1] || "th";

        if (!item[key]) {
          Swal.fire({
            title: "Failed!",
            text: `Please fill up ${i + 1}${suffix} Product - "${title}"`,
            icon: "warning",
            confirmButtonColor: "#FACEA8",
          });
          return;
        }
      }
    }
  }

  // Set URL and HTTP method dynamically
  const url = check ? "/purchase/update/" + route.query?.id : "/purchase";
  const method = check ? "put" : "post";

  // Send the request
  isLoading.value = true;
  try {
    const response = await axiosUrl[method](url, createPayload.value);
    isLoading.value = false;

    // Reset form data
    createPayload.value = {
      supplier_id: null,
      mode_of_payment_id: null,
      date_of_purchase: "",
      amount_paid: null,
      items: [
        {
          product_code: "",
          product_name: "",
          quantity: null,
          pack: null,
          unit_cost_price: null,
          unit_cost_price_crate: null,
          unit_sell_price: null,
          total_cost_price: null,
        },
      ],
    };

    // Navigate to the appropriate page
    router.push({ name: "PurchasePage" });
  } catch (error) {
    isLoading.value = false;
    swalErrorHandle(error);
  }
};

const getSupplyManagement = async () => {
  isLoading.value = true;

  await axiosUrl
    .get("/purchase/list")
    .then((response) => {
      items.value = response.data?.data;

      payment_channels.value = response.data?.data?.payment_channels;
      products.value = response.data?.data?.products;
      suppliers.value = response.data?.data?.suppliers;

      if (
        route.query?.purchase_code !== null &&
        route.query?.purchase_code !== null &&
        route.query?.purchase_code !== undefined
      )
        getPurchase(route.query?.purchase_code);

      if (
        route.query?.id !== null &&
        route.query?.id !== null &&
        route.query?.id !== undefined
      )
        getPurchaseById(route.query?.id);
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

const getPurchaseById = async (id) => {
  isLoading3.value = true;

  await axiosUrl
    .get(`/purchase/single/${id}`)
    .then((response) => {
      purchaseTopData.value = response.data.data;
      createPayload.value.supplier_id = suppliers.value.filter(
        (supplier) => supplier.supplier_name === purchaseTopData.value?.supplier
      )[0]?.id;
      createPayload.value.mode_of_payment_id = payment_channels.value.filter(
        (payment_channels) =>
          payment_channels.name === purchaseTopData.value?.mop
      )[0]?.id;
      createPayload.value.date_of_purchase = new Date(
        purchaseTopData.value?.purchase_date
      );
      createPayload.value.amount_paid = null;
      isLoading3.value = false;
    })
    .catch((error) => {
      isLoading3.value = false;
      swalErrorHandle(error);
    });
};

const getPurchase = async (purchase_code) => {
  isLoading2.value = true;

  await axiosUrl
    .get(`/purchase/items/${purchase_code}/all`)
    .then((response) => {
      purchaseData.value = response.data?.data;
      purchaseData.value.total = 0;
      for (let i = 0; i < purchaseData.value.length; i++) {
        purchaseData.value.total =
          purchaseData.value.total +
          parseFloat(purchaseData.value[i]?.total_cost_price);
      }

      for (let i = 0; i < purchaseData.value.length; i++) {
        if (i >= 1) {
          createPayload.value.items.push({
            product_code: "",
            product_name: "",
            quantity: null,
            pack: null,
            unit_cost_price: null,
            unit_cost_price_crate: null,
            unit_sell_price: null,
            total_cost_price: null,
          });
        }

        createPayload.value.items[i].product_code =
          purchaseData.value[i].product.product_code;
        createPayload.value.items[i].product_name =
          purchaseData.value[i].product.product_name;
        createPayload.value.items[i].quantity = purchaseData.value[i].quantity;
        createPayload.value.items[i].pack =
          purchaseData.value[i].quantity /
          products.value.filter(
            (product) =>
              product.product_code ===
              purchaseData.value[i].product.product_code
          )[0]?.number_per_pack;
        createPayload.value.items[i].unit_cost_price =
          purchaseData.value[i].unit_cost_price;
        createPayload.value.items[i].unit_cost_price_crate =
          purchaseData.value[i].total_cost_price *
          createPayload.value.items[i].pack;
        createPayload.value.items[i].unit_sell_price =
          purchaseData.value[i].unit_sell_price;
        createPayload.value.items[i].total_cost_price =
          purchaseData.value[i].total_cost_price;
      }

      isLoading2.value = false;
    })
    .catch((error) => {
      isLoading2.value = false;
      swalErrorHandle(error);
    });
};

onMounted(() => {
  getSupplyManagement();
  getAllBanks();
});
</script>

<style scoped></style>

<style>
.p-inputtext {
  padding: 6px 12px !important;
}
</style>