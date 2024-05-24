<template>
  <div>
    <div class="body">
      <div class="main-wrapper">
        <nav class="navbar navbar-expand-lg bg-body-tertiary header mb-2">
          <div
            class="d-flex justify-content-between w-100 align-items-center px-2"
          >
            <div class="w-50 d-flex align-items-center">
              <Button
                icon="pi pi-bars"
                @click="sidebarVisible = true"
                style="color: #004aad; background-color: inherit; border: none"
              />
              <router-link to="/" class="navbar-brand">
                <img src="@/assets/img/manageclub-247.png" alt="" width="85" />
              </router-link>
            </div>

            <div
              class="w-50 d-flex justify-content-end collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav mb-lg-0 me-3">
                <!-- < class="dropdown-item">Admins</>
          <a class="dropdown-item" href="#">Club Settings</a>
          <router-link class="dropdown-item">Change Password</router-link>
          <aclass="dropdown-item" href="#">Logout</aclass=> -->
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle text-white"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ loggedInUser["username"] }}
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <router-link to="/admins" class="dropdown-item"
                        >Admin</router-link
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Club Settings</a>
                    </li>
                    <li>
                      <router-link to="" class="dropdown-item"
                        >Change Password</router-link
                      >
                    </li>
                    <li>
                      <a @click="logout()" class="dropdown-item" style="cursor: pointer;">Logout</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- <AppHeader2 /> -->
        <AppSidebar
          class="border-0"
          :visible="sidebarVisible"
          @update:visible="sidebarVisible = $event"
        />
        <!-- <AppSidebar2 /> -->
        <router-view />
        <!-- <AppFooter /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from "@/components/AppSidebar.vue";
import AppSidebar2 from "@/components/AppSidebar2.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppHeader2 from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

const sidebarVisible = ref(false);

import { axiosUrl } from "@/env";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/store/authStore";
const isLoading = ref(false);
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const currentClub = authStore.currentClub;

const logout = async () => {
  isLoading.value = true;
  await axiosUrl
    .post("auth/logout")
    .then(() => {
      isLoading.value = false;
      localStorage.clear();
      window.location.href = "/";
    })
    .catch(() => {
      isLoading.value = false;
    });
};
</script>

<style scoped>
.header {
  background: #004aad;
  background: linear-gradient(to right, #ffffff 0%, #004aad 100%);
  border-bottom: 1px solid transparent;
  /* height: 60px; */
  -webkit-box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
}
</style>