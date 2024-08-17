<template>
  <div class="">
    <div class="container content">
      <Loading :active="loading" />

      <div class="row">
        <div class="col-10 mb-2">
          <input
            v-model="filters['global'].value"
            placeholder="Keyword Search"
            class="form-control my-input"
          />
        </div>

        <div class="col-2 mb-2">
          <div class="cart-container" @click="navigateToCart()">
            <i class="fa fa-shopping-cart cart-icon"></i>
            <span class="cart-count">{{ cartLength }}</span>
          </div>
        </div>

        <div class="col-12 mb-2">
          <DataTable
            v-if="bars[id]?.items.length > 0"
            class="shadow mb-5"
            v-model:filters="filters"
            :value="bars[id].items"
            :sortField="'number'"
            :sortOrder="-1"
            stripedRows
            paginator
            :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]"
          >
            <Column field="name" :sortable="false" header="All Drinks">
              <template #body="{ data }">
                <div class="float-start">
                  <span class="text-info"
                    ><b>{{ data["name"] }} </b></span
                  >
                  <br />Amount: {{ formatCurrency(data["amount_sold"]) }}
                </div>
                <div class="float-end">
                  Available: <span class="text-success">{{ data.number }}</span
                  ><br />
                  <button
                    v-if="data.number"
                    @click="addToCart(data)"
                    class="btn btn-info btn-sm text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </template>
            </Column>
          </DataTable>

          <div v-else class="mt-2 text-center text-danger">
            <span v-if="!loading">No Drink Available</span>
          </div>
        </div>
      </div>
    </div>
    <MobileFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useBarsStore } from "@/store/barsStore";
import { axiosUrl } from "@/env";
import { storeToRefs } from "pinia";
import MobileFooter from "@/components/MobileFooter.vue";
import { swalErrorHandle } from "@/components/myHelperFunction";
import { useRoute, useRouter } from "vue-router";

const loading = ref(false);
const route = useRoute();
const router = useRouter();
const barsStore = useBarsStore();
const id = ref();
const { bars, bar_id } = storeToRefs(barsStore);
const cartLength = ref(0);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Function to get the array from localStorage
const getArray = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
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

const addToCart = (data) => {
  const cart = getArray();
  cart.push(data);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(JSON.parse(localStorage.getItem("cart")));
  cartLength.value = JSON.parse(localStorage.getItem("cart")).length;
};
const navigateToCart = () => {
  router.push({
    path: "shopping-cart",
  });
};

onMounted(() => {
  id.value = route.query.id;
  localStorage.setItem("cart", JSON.stringify([]));
});
</script>

<style scoped>
.cart-container {
  position: relative;
  display: inline-block;
}

.cart-icon {
  font-size: 24px;
  color: #333;
}

.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}

.content {
  padding-bottom: 100px; /* Adjust this value to match the height of the fixed element */
}
</style>