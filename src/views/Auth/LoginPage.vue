<template>
  <div>
    <div class="main-wrapper">
      <div class="account-content">
        <div class="container">

          <div class="account-logo">
            <a href="#"><img src="@/assets/img/logo2.png" alt="Logo"></a>
          </div>

          <div class="account-box">
            <div class="account-wrapper">
              <h3 class="account-title">Login</h3>
              <p class="account-subtitle">Access to our dashboard</p>

              <form @submit.prevent="onSubmit()">
                <div class="input-block mb-4">
                  <label class="col-form-label">Username</label>
                  <input class="form-control" type="text" v-model="form.username">
                </div>
                <div class="input-block mb-4">
                  <div class="row align-items-center">
                    <div class="col">
                      <label class="col-form-label">Password</label>
                    </div>
                    <div class="col-auto">
                      <a class="text-muted" href="#">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div class="position-relative">
                    <input class="form-control" type="password" v-model="form.password" id="password">
                    <span class="fa-solid fa-eye-slash" id="toggle-password"></span>
                  </div>
                </div>
                <div class="input-block mb-4 text-center">
                  <button class="btn btn-primary account-btn" type="submit" :disabled="loading">
                    Login
                    <svg v-if="loading" class="spinner" viewBox="0 0 50 50">
                      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg>
                  </button>
                </div>
                <div class="account-footer">
                  <p>Don't have an account yet? <a href="#">Register</a></p>
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
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { axiosUrl } from "@/env";
import Swal from 'sweetalert2'

const loading = ref(false);
const user = ref("");
const authStore = useAuthStore();
const token = authStore.token

const form = reactive({
  username: "",
  password: ""
});

const onSubmit = async () => {
  loading.value = true;
  if (form.username == '' || form.password == '') {
    loading.value = false
    Swal.fire(
      "Failed!",
      "Please fill in your credentials and try again.",
      "warning"
    );
  } else {
    await axiosUrl
      .post("auth/login", {
        username: form.username,
        password: form.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.data.access_token);
        user.value = response.data.data
        authStore.getCurrentUser(user.value.user);
        authStore.getUserToken(user.value.access_token);
        authStore.getUserTokenExpiresAt(user.value.token_expires_at);
        let path = '/'
        window.location.href = path;
      })
      .catch((error) => {
        loading.value = false
      });
  }
};

onMounted(() => {
  if (token && token != undefined) {
    window.location.href = "/";
  }
});
</script>

<style scoped></style>