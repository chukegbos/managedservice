
<template>
  <div class="card flex justify-content-center">
    <Sidebar :visible="visible" @hide="emitClose">
      <template #container="">
        <div class="flex flex-column h-full">
          <div
            class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0"
          >
            <span class="inline-flex align-items-center gap-2">
              <span class="font-semibold text-2xl text-primary">
                <img src="@/assets/img/manageclub-247.png" alt="" width="85" />
              </span>
            </span>
            <span>
              <Button
                type="button"
                @click="emitClose()"
                icon="pi pi-times"
                rounded
                outlined
                class="h-2rem w-2rem border-0"
              ></Button>
            </span>
          </div>
          <div class="overflow-y-auto">
            <ul class="list-none p-3 m-0">
              <li>
                <div
                  v-ripple
                  v-styleclass="{
                    selector: '@next',
                    enterClass: 'hidden',
                    enterActiveClass: 'slidedown',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'slideup',
                  }"
                  class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                >
                  <span class="font-medium">MEMBERS MANAGEMENT</span>
                  <i class="pi pi-chevron-down"></i>
                </div>
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <li>
                    <router-link
                      to="/"
                      v-ripple
                      class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-home mr-2"></i>
                      <span class="font-medium">Dashboard</span>
                    </router-link>
                  </li>
                  <li>
                    <a
                      v-ripple
                      v-styleclass="{
                        selector: '@next',
                        enterClass: 'hidden',
                        enterActiveClass: 'slidedown',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'slideup',
                      }"
                      class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-chart-line mr-2"></i>
                      <span class="font-medium">Members</span>
                      <i class="pi pi-chevron-down ml-auto"></i>
                    </a>
                    <ul
                      class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
                    >
                      <li>
                        <router-link
                          to="/members"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Members</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/members/types"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Members Types</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/members/sections"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Members Sections</span>
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      v-ripple
                      v-styleclass="{
                        selector: '@next',
                        enterClass: 'hidden',
                        enterActiveClass: 'slidedown',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'slideup',
                      }"
                      class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-comments mr-2"></i>
                      <span class="font-medium">Payments</span>
                      <i class="pi pi-chevron-down ml-auto"></i>
                    </a>
                    <ul
                      class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
                    >
                      <li>
                        <router-link
                          to="/payment/products"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Payment Product</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/payment/debits"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Payment Debits</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/payment/history"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Payment History</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/payment/banks"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Payment Banks</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/payment/pos"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Payment POS</span>
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      v-ripple
                      v-styleclass="{
                        selector: '@next',
                        enterClass: 'hidden',
                        enterActiveClass: 'slidedown',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'slideup',
                      }"
                      class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-comments mr-2"></i>
                      <span class="font-medium">Accounting/Reports</span>
                      <i class="pi pi-chevron-down ml-auto"></i>
                    </a>
                    <ul
                      class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
                    >
                      <li>
                        <router-link
                          to="/payment/products"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Pending Entries</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/payment/debits"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Approved Entries</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/payment/history"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Accounts</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/payment/banks"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Ledger Entities</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/payment/pos"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Payment POS</span>
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <!-- <li>
                    <a
                      v-ripple
                      class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-comments mr-2"></i>
                      <span class="font-medium">Notifications</span>
                      <span
                        class="inline-flex align-items-center justify-content-center ml-auto bg-primary border-circle"
                        style="min-width: 1.5rem; height: 1.5rem"
                        >3</span
                      >
                    </a>
                  </li> -->
                </ul>
              </li>
            </ul>
            <ul class="list-none p-3 m-0">
              <li>
                <div
                  v-ripple
                  v-styleclass="{
                    selector: '@next',
                    enterClass: 'hidden',
                    enterActiveClass: 'slidedown',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'slideup',
                  }"
                  class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                >
                  <span class="font-medium">INVENTORY MANAGEMENT</span>
                  <i class="pi pi-chevron-down"></i>
                </div>
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <li>
                    <a
                      v-ripple
                      v-styleclass="{
                        selector: '@next',
                        enterClass: 'hidden',
                        enterActiveClass: 'slidedown',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'slideup',
                      }"
                      class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-comments mr-2"></i>
                      <span class="font-medium">Inventory Tracking</span>
                      <i class="pi pi-chevron-down ml-auto"></i>
                    </a>
                    <ul
                      class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
                    >
                      <li>
                        <router-link
                          to="/payment/products"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Product List</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/payment/debits"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Product Group</span>
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <router-link
                      to="#"
                      v-ripple
                      class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-chart-bar mr-2"></i>
                      <span class="font-medium">Supplier Management</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="#"
                      v-ripple
                      class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-chart-bar mr-2"></i>
                      <span class="font-medium">Bar Management</span>
                    </router-link>
                  </li>
                  <li>
                    <a
                      v-ripple
                      v-styleclass="{
                        selector: '@next',
                        enterClass: 'hidden',
                        enterActiveClass: 'slidedown',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'slideup',
                      }"
                      class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-comments mr-2"></i>
                      <span class="font-medium">Order Management</span>
                      <i class="pi pi-chevron-down ml-auto"></i>
                    </a>
                    <ul
                      class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
                    >
                      <li>
                        <router-link
                          to="/payment/products"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Purchase Order</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/payment/debits"
                          v-ripple
                          class="text-decoration-none flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Sales Order</span>
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="mt-auto">
            <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
            <router-link
              to="#"
              v-ripple
              class="text-decoration-none flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
            >
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
              />
              <span class="font-bold">{{ loggedInUser["username"] }}</span>
            </router-link>
          </div>
        </div>
      </template>
    </Sidebar>
  </div>
</template>

<script setup>
// import { defineProps, defineEmits } from "vue";
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

const props = defineProps({
  visible: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(["update:visible"]);

const emitClose = () => {
  emit("update:visible", false);
};
</script>