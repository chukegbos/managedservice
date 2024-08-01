<template>
    <div>
        <div class="content-wrapper">
            <loading :active="isLoading" />

            <div class="container" v-if="!isLoading">
                <div class="row mb-3">
                    <div class="col-md-12 text-center mb-2">
                        <h4><b>Bar Request ({{ request_code }})</b></h4>
                    </div>
                
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                        <form @submit.prevent="onSubmit()">
                            <table class="table table-bordered table-responsive-md">
                                <thead>
                                    <tr>
                                        <th width="400px"><b>PRODUCT</b></th>
                                        <th><b>QUANTITY</b></th>
                                        <th><b>SOURCE</b></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(item) in productItems">
                                        <td>{{ item.product_name }} ({{ item.product_code }})</td>
                                        <td>
                                            <input v-model="item.quantity" type="number" class="form-control qty-input">
                                        </td>
                                        <td>
                                            <select v-model="item.requestFrom" class="form-control" required>
                                                <option value="0">Store (Inventory)</option>
                                                <option v-for="option in bars" :value="option.bar_code" :key="option.id">
                                                    {{ option.name }}
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                           
                            <div class="my-3">
                                <button class="btn btn-primary account-btn w-100" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { axiosUrl } from "@/env";
    import { ref, reactive, onMounted } from "vue";
    import Swal from "sweetalert2";
    import { useRoute, useRouter } from "vue-router";
    import {
      formatDate,
      formatPrice,
      swalErrorHandle,
      swalSuccessHandle,
    } from "@/components/myHelperFunction";

    const isLoading = ref(false);
    const request_code = ref();
    const productItems = ref([]);
    const bars = ref([]);
    const route = useRoute();
    const router = useRouter();

    const getRequest = async () => {
        isLoading.value = true;
        await axiosUrl
        .get("/bars/requests/" + request_code.value)
        .then((response) => {
            productItems.value = response.data.data.allRequest;
            bars.value = response.data.data.bars;
            isLoading.value = false;
          })
          .catch((error) => {
            isLoading.value = false;
        });
    };

    const onSubmit = async () => {
        var error = [];
        productItems.value.forEach(function (product) {
            if(product.quantity==null)
            {
                error.push(product);
                Swal.fire(
                    "Failed!",
                    'Fill all the quantity fields',
                    "warning"
                );
            }  
            
            if(product.requestFrom==null)
            {
                error.push(product);
                Swal.fire(
                    "Failed!",
                    'Fill all the source fields',
                    "warning"
                );
            }  
        });  
        
        if(error.length==0){
            isLoading.value = true;
            var url = "/bars/requests/update";
            await axiosUrl.post(url, productItems.value)
            .then((response) => {
                isLoading.value = false;
                Swal.fire({
                    title: "Success!",
                    text: 'Request has been submitted',
                    icon: "success",
                    confirmButtonText: 'OK'
                }).then(() => {
                    router.push({ path: "/bars/" + response.data });
                });
                
            })
            .catch((error) => {
                isLoading.value = false;
                swalErrorHandle(error);
            });
        }
    }

    onMounted(() => {
        console.log(2)
      request_code.value = route.params.request_code;
      getRequest();
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