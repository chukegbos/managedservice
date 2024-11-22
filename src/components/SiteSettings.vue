<template>
    <div class="content-wrapper">
        <loading :active="isLoading" />
  
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="">
                        <h5 class="text-left">
                            Site Setting
                        </h5>
                    </div>
                    <div class="card mt-2">
                        <div class="card-body">
                            <form @submit.prevent="onSubmit()">
                                <div class="input-block mb-4 mx-3">
                                    <label class="col-form-label fs-6">Club Name</label>
                                    <input class="form-control" type="text" v-model="settings.name" required/>
                                </div>

                                <div class="input-block mb-4 mx-3">
                                    <label class="col-form-label fs-6">Club Initial</label>
                                    <input class="form-control" type="text" v-model="settings.initial" required/>
                                </div>

                                <div class="input-block mb-4 mx-3">
                                    <label class="col-form-label fs-6">Phone No</label>
                                    <input class="form-control" type="text" v-model="settings.phone" required/>
                                </div>

                                <div class="input-block mb-4 mx-3">
                                    <label class="col-form-label fs-6">Email</label>
                                    <input class="form-control" type="email" v-model="settings.email" required/>
                                </div>

                                <div class="input-block mb-4 mx-3">
                                    <label class="col-form-label fs-6">Address</label>
                                    <input class="form-control" type="text" v-model="settings.address" required/>
                                </div>
                    
                                <div class="mx-3">
                                <button class="btn btn-primary account-btn w-100" type="submit">
                                    update
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
  
      const form = ref({
          current_password: "",
          new_password: "",
          confirm_password: "",
      });

      const settings = ref({
        name: "",
        initial: "",
        phone: "",
        email: "",
        address: "",
        // approval: ""
      })

    

      const getSettings = async () => {
        isLoading.value = true;
        await axiosUrl
        .get('/settings')
        .then((response) => {
            console.log(response.data.data)
        
            settings.value.name = response.data.data.name;
            settings.value.initial = response.data.data.initial;
            settings.value.phone = response.data.data.phone;
            settings.value.email = response.data.data.email;
            settings.value.address = response.data.data.address;
            isLoading.value = false;
        })
        .catch((error) => {
            isLoading.value = false;
            Swal.fire(
                "Failed!",
                "Failed to get settings",
                "warning"
            );
        });
      }
  
      const onSubmit= async () => {
        isLoading.value = true;
        await axiosUrl
              .put('settings/update', settings.value)
              .then((response) => {
                  isLoading.value = false;
                  swalSuccessHandle('Settings updated Successful.')
                  getSettings();
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
        getSettings(); 
      });


  </script>
  
  <style scoped>
  </style>