<template>
  <div>
    <div class="main-wrapper d-md-flex pt-5 pt-md-0">
      <div class="d-none d-md-block w-50 h-100" style="background-color: #014aac">
        <img src="@/assets/img/login-bg-img.jpg" alt="" class="w-100 h-100" />
      </div>
      <div class="w-md-50 h-100 d-flex justify-content-center align-items-center flex-column">
        <form @submit.prevent="onSubmit()" class="w-75">
          <div class="d-flex justify-content-center mb-3">
            <img src="@/assets/img/manageclub-247.png" alt="" class="login-img" />
          </div>
          <div class="input-block mb-4">
            <label class="col-form-label">Username</label>
            <input class="form-control" type="text" v-model="form.username" />
          </div>
          <div class="input-block mb-4">
            <div class="row align-items-center">
              <div class="col">
                <label class="col-form-label">Password</label>
              </div>
            </div>
            <div class="position-relative">
              <input class="form-control" type="password" v-model="form.password" id="password" />
            </div>
          </div>
          <div class="input-block mb-4 text-center">
            <button class="btn account-btn text-white w-100 d-flex justify-content-center align-items-center"
              type="submit" :disabled="loading">
              login
              <div v-if="loading" class="spinner-border ms-2" role="status" style="height: 18px; width: 18px">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "@/store/authStore";
import { axiosUrl } from "@/env";
import { swalErrorHandle } from "@/components/myHelperFunction";
import Swal from "sweetalert2";

const loading = ref(false);
const user = ref("");
const authStore = useAuthStore();
const token = authStore.token;

const form = reactive({
  username: "",
  password: "",
});

const onSubmit = async () => {
  loading.value = true;
  if (form.username == "" || form.password == "") {
    loading.value = false;
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
        authStore.getCurrentUser(response.data.data.user);
        authStore.getCurrentClub(response.data.data.club);
        authStore.getUserToken(response.data.data.access_token);
        // authStore.getUserTokenExpiresAt(user.value.token_expires_at);
        let path = "/";
        window.location.href = path;
      })
      .catch((error) => {
        loading.value = false;
        swalErrorHandle(error);
      });
  }
};

onMounted(() => {
  if (token && token != undefined) {
    window.location.href = "/";
  }
});
</script>

<style scoped>
@media only screen and (min-width: 720px) {
  .main-wrapper {
    height: 100vh;
  }

  .w-md-50 {
    width: 50%;
  }
}

.login-img {
  width: 150px;
}

button {
  background-color: #014aac;
}

button:hover,
button:disabled {
  background-color: #014bacb7 !important;
}
</style>