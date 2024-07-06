<template>
  <div class="mx-3 pt-3">
    <Loading :active="loading" />

    <div class="container-fluid pb-0">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="fs-3 mb-0">Make Order</h3>

        <button class="btn btn-success btn-sm px-4" @click.prevent="openModal()">Add Drink</button>
      </div>

      <div class="my-3">
        <input v-model="filters['global'].value" placeholder="Keyword Search" class="form-control my-input" />
      </div>

      <DataTable v-if="orders.length > 0" class="shadow mb-" v-model:filters="filters" :value="orders" :sortField="'id'"
        :sortOrder="1" stripedRows tableStyle="min-width: 700px; text-transform: capitalize;">
        <Column field="product" :sortable="true" header="Product" style="width: 20%">
          <template #body="{ data }">
            {{ data["product"] ? data["product"] : "N/A" }}
          </template>
        </Column>
        <Column field="quantity" :sortable="true" header="Quantity" style="width: 20%">
          <template #body="{ data }">
            {{ data["quantity"] ? data["quantity"] : "N/A" }}
          </template>
        </Column>
        <Column field="unitPrice" :sortable="true" header="Unit Price" style="width: 20%">
          <template #body="{ data }">
            <NairaSymbol v-if="data['unitPrice']" />
            {{ data["unitPrice"] ? data["unitPrice"] : "N/A" }}
          </template>
        </Column>
        <Column field="totalPrice" :sortable="true" header="Total Price" style="width: 20%">
          <template #body="{ data }">
            <NairaSymbol v-if="data['totalPrice']" />
            {{ data["totalPrice"] ? data["totalPrice"] : "N/A" }}
          </template>
        </Column>
        <Column field="" :sortable="true" header="Action" style="width: 20%">
          <template #body="{ data }">
            <button @click="deleteProduct(data['id'])" class="btn btn-danger btn-sm px-4 w-100 mb-1">delete</button>
            <button @click="editProduct(data)" class="btn btn-warning text-white btn-sm px-4 w-100">edit</button>
          </template>
        </Column>
      </DataTable>

      <div v-else class="mt-2 text-center">
        <span v-if="!loading">No Order Mede Yet 🥲</span>
      </div>

      <DataTable class="shadow mb-5" v-model:filters="filters" :value="[{}]" stripedRows
        tableStyle="min-width: 700px; text-transform: capitalize;">
        <Column field="" header="User Type" style="width: 20%">
          <template #body="{}">
            <Dropdown v-model="userType" :options="[{ id: 1, label: 'Member' }, { id: 2, label: 'Guest' }]"
              optionLabel="label" optionValue="id" class="w-100" />
          </template>
        </Column>
        <Column v-if="userType === 1" field="" header="Name" style="width: 20%">
          <template #body="{}">
            <Dropdown v-model="name" :options="[]" optionLabel="label" optionValue="id" class="w-100" />
          </template>
        </Column>
        <Column field="" header="Name" style="width: 20%">
          <template #body="{}">

          </template>
        </Column>
        <Column field="unitPrice" header="Date of Sale" style="width: 20%">
          <template #body="{ data }">
            <NairaSymbol v-if="data['unitPrice']" />
            {{ data["unitPrice"] ? data["unitPrice"] : "N/A" }}
          </template>
        </Column>
        <Column field="totalPrice" header="Total Amount" style="width: 20%">
          <template #body="{ data }">
            <NairaSymbol v-if="data['totalPrice']" />
            {{ data["totalPrice"] ? data["totalPrice"] : "N/A" }}
          </template>
        </Column>
      </DataTable>
    </div>

    <div class="fixed-bottom">
      <div class="d-flex bg-secondary">
        <router-link :to="{ name: 'OrderPage', params: { id } }" class="w-50 border-end py-2 text-decoration-none">
          <p class="text-center text-white mb-0">Order</p>
        </router-link>
        <div class="w-50 h-100 py-2">
          <p class="text-center text-white mb-0">Sale</p>
        </div>
      </div>
    </div>

    <ModalComp :isToggled="isToggled" :title="isEdit ? 'Edit Drink' : 'Add Drink'" @close="isToggled = false">
      <form>
        <div class="mb-2">
          <label class="form-label text-gray fw-bold" for="product">Product</label>
          <Dropdown @change="loadProductData(productData)" v-model="productData" :options="bars[id]['items']" filter
            optionLabel="name" optionValue="id" placeholder="Select Product" class="w-100" />
        </div>

        <div class="mb-2">
          <label class="form-label text-gray fw-bold" for="quantity">Quantity</label>
          <input @input="calculateTotal(drinkData['quantity'])" class="form-control" type="number" name="quantity"
            v-model="drinkData['quantity']" placeholder="Quantity" required />
        </div>

        <div class="mb-2">
          <label class="form-label text-gray fw-bold" for="unitPrice">Unit Price</label>
          <input class="form-control" type="number" name="unitPrice" v-model="drinkData['unitPrice']"
            placeholder="Unit Price" required readonly />
        </div>

        <div class="mb-4">
          <label class="form-label text-gray fw-bold" for="totalPrice">Total Price</label>
          <input class="form-control" type="number" name="totalPrice" v-model="drinkData['totalPrice']"
            placeholder="Total Price" required readonly />
        </div>

        <button @click.prevent="editDrink()" v-if="isEdit" type="submit" class="btn w-100 btn-success btn-block">
          Submit
        </button>
        <button @click.prevent="addDrink()" v-else type="submit" class="btn w-100 btn-success btn-block">
          Submit
        </button>
      </form>
    </ModalComp>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { FilterMatchMode } from 'primevue/api';
import { useBarsStore } from "@/store/barsStore";
import { axiosUrl } from "@/env";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { swalErrorHandle } from "@/components/myHelperFunction";

const loading = ref(false);
const isToggled = ref(false);
const isEdit = ref(false);
const barsStore = useBarsStore();
const route = useRoute()
const id = ref(null)
const userType = ref(null)
const name = ref('')
const productData = ref()
const { orders, bars } = storeToRefs(barsStore);
const drinkData = reactive({
  id: null,
  productID: null,
  product: '',
  quantity: null,
  unitPrice: null,
  totalPrice: null
})

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const openModal = () => {
  drinkData['id'] = null
  drinkData['productID'] = null
  drinkData['product'] = ''
  drinkData['quantity'] = null
  drinkData['unitPrice'] = null
  drinkData['totalPrice'] = null
  productData.value = null
  isEdit.value = false
  isToggled.value = true
}

const editDrink = () => {
  let newObj = {
    id: drinkData['id'],
    productID: drinkData['productID'],
    product: drinkData['product'],
    quantity: drinkData['quantity'],
    unitPrice: drinkData['unitPrice'],
    totalPrice: drinkData['totalPrice'],
  }
  orders.value[drinkData['id'] - 1] = newObj;
  isToggled.value = false
}

const addDrink = () => {
  drinkData['id'] = orders.value.length + 1
  let newObj = {
    id: drinkData['id'],
    productID: drinkData['productID'],
    product: drinkData['product'],
    quantity: drinkData['quantity'],
    unitPrice: drinkData['unitPrice'],
    totalPrice: drinkData['totalPrice'],
  }
  orders.value.push(newObj);
  isToggled.value = false
}

const loadProductData = (productID) => {
  // console.log(productID)
  let product = bars.value[id.value]['items'].find(obj => obj.id === productID);
  drinkData['productID'] = product['id'];
  drinkData['product'] = product['name'];
  drinkData['unitPrice'] = product['amount_sold'];

  calculateTotal(product['quantity']);
}

const calculateTotal = (qty) => {
  // console.log(qty)
  if (drinkData['totalPrice'] === null || typeof drinkData['totalPrice'] !== 'number')
    drinkData['totalPrice'] = 0

  if (qty === null || typeof qty !== 'number')
    qty = 0

  if (drinkData['unitPrice'] === null || typeof drinkData['unitPrice'] !== 'number')
    drinkData['unitPrice'] = 0

  drinkData['totalPrice'] = qty * drinkData['unitPrice']
}

const deleteProduct = (id) => {
  // console.log(id)
  orders.value.splice(id - 1, 1)
}

const editProduct = (data) => {
  isEdit.value = true
  productData.value = data['productID']
  drinkData['id'] = data['id']
  drinkData['productID'] = data['productID']
  drinkData['product'] = data['product']
  drinkData['quantity'] = data['quantity']
  drinkData['unitPrice'] = data['unitPrice']
  drinkData['totalPrice'] = data['totalPrice']
  isToggled.value = true
}

const getData = async () => {
  loading.value = true;

  await axiosUrl
    .get("/")
    .then((response) => {

      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;
      swalErrorHandle(error);
    });
};

onMounted(() => {
  id.value = route.params.id
});
</script>

<style scoped></style>