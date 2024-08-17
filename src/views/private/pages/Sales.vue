<template>
  <div class="">
    <div class="container content">
      <Loading :active="loading" />

      <div class="row">
        <div class="col-12 mb-2">
          <input v-model="filters['global'].value" placeholder="Keyword Search" class="form-control my-input" />
        </div>
      
        <div class="col-12 mb-2">
          <DataTable v-if="sales.length > 0" class="shadow mb-5" v-model:filters="filters" :value="sales"
            :sortField="'number'" :sortOrder="-1" stripedRows paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" >
            <Column field="sale_code" :sortable="false" header="All Sales">
              <template #body="{ data }">
                <div class="float-start">
                  <span class="text-info"><b>#{{ data["sale_code"] }} </b></span>
                  <br>{{ formatCurrency(data["total"]) }}
                </div>
                <div class="float-end">
                    <span class="text-success">{{ formatDate(data.created_at) }}</span><br>
                    <router-link :to="'/receipt/' + data.sale_code" class="btn btn-info btn-sm text-white">
                        View
                    </router-link>
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
    import { FilterMatchMode } from 'primevue/api';
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
    const id = ref()
    const { sales } = storeToRefs(barsStore)
    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        }).format(value).replace('NGN', '');
    }
   
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const ordinalSuffix = (n) => {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return s[(v - 20) % 10] || s[v] || s[0];
        };

        return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
    }

    onMounted(() => {
        id.value = route.query.id
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