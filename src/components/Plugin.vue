<template>
    <div class="content-wrapper">
        <loading :active="isLoading" />
  
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="">
                        <h5 class="text-center">
                            SMS Plugin Setup
                        </h5>
                    </div>
                    <div class="card mt-2">
                        <div class="card-body">
                            <form @submit.prevent="onSubmit()">
                                <div class="input-block mb-4 mx-3">
                                    <label class="col-form-label fs-6">SMS Email</label>
                                    <input class="form-control" type="email" v-model="plugin.sms_email" required/>
                                </div>

                                <div class="input-block mb-4 mx-3">
                                    <label class="col-form-label fs-6">SMS Password</label>
                                    <input class="form-control" type="text" v-model="plugin.sms_password" required/>
                                </div>
                    
                                <div class="mx-3">
                                <button class="btn btn-primary account-btn w-100" type="submit">
                                    Update
                                </button>
                                </div>
                            </form>
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
      import { useAuthStore } from "@/store/authStore";
      import {
          swalErrorHandle,
          swalSuccessHandle,
      } from "@/components/myHelperFunction";
      import Swal from "sweetalert2";
      import router from '@/router';
  
      const isLoading = ref(false);
      const authStore = useAuthStore();
      const loggedInUser = authStore.loggedInUser;

      const plugin = ref({
        sms_email: "",
        sms_password: ""
      });

      const getSMSDetails = async () => {
        isLoading.value = true;
        await axiosUrl
        .get('/settings')
        .then((response) => {
            console.log(response.data.data)
            plugin.value.sms_email = response.data.data.sms_email;
            plugin.value.sms_password = response.data.data.sms_password;
            isLoading.value = false;
        })
        .catch((error) => {
            isLoading.value = false;
            Swal.fire(
                "Failed!",
                "Failed to get sms details",
                "warning"
            );
        });
      }
  
      const onSubmit= async () => {
          isLoading.value = true;
          await axiosUrl
              .put('/settings/sms-plugin', plugin.value)
              .then((response) => {
                  isLoading.value = false;
                  swalSuccessHandle('SMS Plugin Setting Updated Successful.')

              })
              .catch((error) => {
                  isLoading.value = false;
                  console.log(error.response.data.message)
                  Swal.fire(
                      "Failed!",
                      error.response.data.message,
                      "warning"
                  );
                  
              });
  
      };
  
      onMounted(() => {
        getSMSDetails();
      });
  </script>
  
  <style scoped>
  </style>