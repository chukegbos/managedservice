<template>
  <div>
    <form class='login-form' @submit.prevent="onSubmit()">
      <div class="flex-row">
        <label class="lf--label" for="username">
          <svg x="0px" y="0px" width="12px" height="13px">
            <path fill="#B1B7C4"
              d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z" />
          </svg>
        </label>
        <input id="username" class='lf--input' placeholder='Username' v-model="form.username" type='text'>
      </div>
      <div class="flex-row">
        <label class="lf--label" for="password">
          <svg x="0px" y="0px" width="15px" height="5px">
            <g>
              <path fill="#B1B7C4"
                d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z" />
            </g>
          </svg>
        </label>
        <input id="password" class='lf--input' placeholder='Password' v-model="form.password" type='password'>
      </div>
      <button class='lf--submit' type="submit" :disabled="loading">
        LOGIN
        <svg v-if="loading" class="spinner" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
      </button>
    </form>
    <a class='lf--forgot' href='#'>Forgot password?</a>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { loginAxios } from "@/env";
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
    await loginAxios
      .post("login", {
        email: form.username,
        password: form.password,
      })
      .then((response) => {
        // console.log(response.data.data)
        localStorage.setItem("token", response.data.data.token);
        user.value = response.data.data
        authStore.getCurrentUser(user.value.user);
        authStore.getUserToken(user.value.token);
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

<style scoped>
* {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background: linear-gradient(135deg,
      rgba(#242e4d, .9),
      rgba(#897e79, .9));
  font-family: 'Roboto', helvetica, arial, sans-serif;
  font-size: 1.5em;
}

body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(data:image/png;base64,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);
  opacity: 0.3;
}

.login-form {
  width: 100%;
  padding: 2em;
  position: relative;
  background: rgba(0, 0, 0, .15);
}

.login-form::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(to right,
      #35c3c1,
      #00d6b7);
}

@media screen and (min-width: 600px) {
  .login-form {
    width: 25vw;
  }
}

.flex-row {
  display: flex;
  margin-bottom: 1em;
}

.lf--label {
  width: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6f8;
  cursor: pointer;
}

.lf--input {
  flex: 1;
  padding: 1em;
  border: 0;
  color: #8f8f8f;
  font-size: 1rem;
}

.lf--input::before {
  outline: none;
  transition: transform .15s ease;
  transform: scale(1.1);
}

.lf--submit {
  display: block;
  padding: 1em;
  width: 100%;
  background: linear-gradient(to right,
      #35c3c1,
      #00d6b7);
  border: 0;
  color: #fff;
  cursor: pointer;
  font-size: .75em;
  font-weight: 600;
  text-shadow: 0 1px 0 rgba(0, 0, 0, .2);
}

.lf--submit:focus {
  outline: none;
  transition: transform .15s ease;
  transform: scale(1.1);
}

.lf--forgot {
  margin-top: 1em;
  color: #00d6b7;
  font-size: .65em;
  text-align: center;
  position: relative;
}

::placeholder {
  color: #8f8f8f;
}

.loading-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 9999;
}

.loading-btn.loading:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

html,
body {
  height: 100%;
  background-image: linear-gradient(-105deg, #009acc, #363795);
}

.spinner {
  margin-left: 10px;
  animation: rotate 2s linear infinite;
  z-index: 2;
  width: 10px;
  height: 10px;
}

.spinner .path {
  stroke: #2F3745;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>