<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">

      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="d-flex justify-content-between align-items-center text-cener">
            <h2 class="text-center">
              <strong>Change Password</strong>
            </h2>
          </div>
          <div class="card mt-2">
            <div class="card-body">
              <form @submit.prevent="onSubmit()">
                <div class="input-block mb-4 mx-3">
                  <label class="col-form-label fs-6">Old Password</label>
                  <input class="form-control" type="password" v-model="form.current_password" required />
                </div>

                <div class="input-block mb-4 mx-3">
                  <label class="col-form-label fs-6">New Password</label>
                  <input class="form-control" type="password" v-model="form.new_password" required />
                </div>

                <div class="input-block mb-4 mx-3">
                  <label class="col-form-label fs-6">Confirm Password</label>
                  <input class="form-control" type="password" v-model="form.confirm_password" required />
                </div>

                <div class="mx-3">
                  <button class="btn btn-primary account-btn w-100" type="submit">
                    Submit
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

const onSubmit = async () => {
  isLoading.value = true;

  if (form.value.new_password != form.value.confirm_password) {
    isLoading.value = false;
    Swal.fire(
      "Failed!",
      "New passord field and confirm passord field does not match",
      "warning"
    );
  }
  else if (form.value.new_password.length < 6) {
    isLoading.value = false;
    Swal.fire(
      "Failed!",
      "Your password must be atleast 6 characters",
      "warning"
    );
  }
  else {
    await axiosUrl
      .post('password', form.value)
      .then((response) => {
        isLoading.value = false;
        swalSuccessHandle('Password Created Successful.')
        form.value.current_password = "";
        form.value.new_password = "";
        form.value.confirm_password = "";
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
  }

};

onMounted(() => {
  try {
    isLoading.value = true;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    Swal.fire(
      "Failed!",
      "Its not your fault, try again.",
      "warning"
    );
  }


});
</script>

<style scoped></style>