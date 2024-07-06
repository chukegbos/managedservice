<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container" v-if="!isLoading">
      <div class="d-flex justify-content-between align-items-center row">
        <div class="col-md-12 text-center">
          <h4><b>{{ bar.name }} ({{ bar_code }})</b></h4>
          <b>Current Manager: </b>{{ bar.manager }}<br>
          <b>Daily Sales: </b> <span v-html="nairaSign"></span>{{ formatPrice(totalDebt) }}
        </div>
      </div>

      <TabView>
        <TabPanel header="Drinks">
          
          <div v-if="drinks.length > 0">
            <div class="row mb-3">
              <div class="col-md-6 mb-3">
                <input v-model="filters['global'].value" placeholder="Drink Search" class="form-control"/>
              </div>
              <div class="col-md-6 mb-3">
                <button @click="onRequest()" class="btn btn-primary text-center float-end">Make Request</button>
              </div>
            </div>
            <div>
              <DataTable
                class="shadow text-center"
                v-model:filters="filters"
                :value="drinks"
                :sortField="'number'"
                showGridlines
                paginator
                :rows="10"
                :rowsPerPageOptions="[5, 10, 20, 50]"
              >
              
                <Column field="name" header="Name">
                    <template #body="slotProps">
                      <span class="text-info text-center">{{ slotProps.data.name }}</span><br>
                      <span class="text-center">{{ slotProps.data.inventory_code }}</span>
                    </template>
                </Column>
                <Column header="Price">
                    <template #body="slotProps">
                      <span class="text-primary"><span v-html="nairaSign"></span>{{ formatPrice(slotProps.data.amount_sold) }}</span>
                    </template>
                </Column>
                <Column field="number" header="Available"></Column>

                <Column header="Threshold">
                    <template #body="slotProps">
                      
                      <span v-if="slotProps.data.threshold > slotProps.data.number" class="text-danger">{{ slotProps.data.threshold }} <br> <span class="blink_me">Make Request</span></span>
                      <span class="text-success" v-else>{{ slotProps.data.threshold }}</span>
                    </template>
                </Column>
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
              </DataTable>
            </div>
          </div>

          <div v-else>
            <div class="card card-body">
              <div class="alert alert-warning" role="alert">
                <p class="text-center">No more drinks</p>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel header="Request">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex">
              <div class="me-3">
                <input
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                  class="form-control my-input"
                />
              </div>
            </div>
          </div>

          <div class="mt-4">
            
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script setup>
    import { axiosUrl } from "@/env";
    import { ref, reactive, onMounted } from "vue";
    import { FilterMatchMode } from "primevue/api";
    import { useAuthStore } from "@/store/authStore";
    import Swal from "sweetalert2";
    import { useRoute } from "vue-router";
    import {
      formatDate,
      formatPrice,
      swalErrorHandle,
      swalSuccessHandle,
    } from "@/components/myHelperFunction";

    const isLoading = ref(false);
    const nairaSign = "&#x20A6;";
    const route = useRoute();
    const bar_code = ref();
    const bar = ref("");
    const drinks = ref({});
    const selected = ref([]);
    const selectAll = ref("");
    const authStore = useAuthStore();
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const toggleAll = () => {
      if (selectAll.value)
        for (let i = 0; i < drinks.value.length; i++)
          selected.value.push(drinks.value[i].id);
      else selected.value = [];
    };

    const onRequest = async (type, id) => {
    let url = "";
    let payload = {};
    if (type === "Pay") {
        url = "/payments/debit/pay";
        if (payData.channel_id === 2) payData.process_id = null;
        payload = payData;
    } else if (type === "Single") {
        url = "payments/dept";
        payload = singleDeptData;
    } else if (type === "Group") {
        url = "payments/debit/pay";
        payload = groupDeptData;
    } else return;

    close("pay-modal");
    isLoading.value = true;

    await axiosUrl
        .post(url, payload)
        .then(() => {
        isLoading.value = false;

        if (type === "Pay") {
            payData.bar_code = "";
            payData.transaction_code = "";
            payData.channel_id = null;
            payData.process_id = "";
            modalParams.title = "";
        }
        swalSuccessHandle("Payment Successful.");
        location.reload();
        })
        .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
        });
    };

    const getBar = async () => {
        isLoading.value = true;
        await axiosUrl
        .get("/bars/" + bar_code.value)
        .then((response) => {
            bar.value = response.data.data.bar;
            drinks.value = response.data.data.drinks;
            isLoading.value = false;
          })
          .catch((error) => {
            isLoading.value = false;
        });
    };

    onMounted(() => {
      bar_code.value = route.params.bar_code;
      getBar();
    });
</script>

<style scoped>
.table th {
  font-weight: 500;
  white-space: nowrap;
  border-top: 1px solid #e9e9ea;
  padding: 0 0.75rem;
}
</style>

<style>
@media only screen and (min-width: 720px) {
  .modal {
    width: 600px !important;
    height: 300px !important;
  }
}

.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>