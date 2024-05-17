<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
      <div id="sidebar-menu" class="sidebar-menu">
        <ul class="sidebar-vertical">
          <li class="menu-title">
            <span>Main</span>
          </li>
          <li>
            <router-link to="/"><i class="la la-dashcube"></i> <span>Dashboard</span></router-link>
          </li>

          <li class="submenu dropdown-sidebar" @click="toggleSidebar(0)">
            <a href="#"><i class="la la-users"></i> <span> Membership</span> <span class="menu-arrow"></span></a>
            <ul>
              <li><router-link to="/members">Members</router-link></li>
              <li><router-link to="/members/types">Member Type</router-link></li>
              <li><router-link to="/members/sections">Member Sections</router-link></li>
            </ul>
          </li>
          
          <li class="submenu dropdown-sidebar" @click="toggleSidebar(sidebarBtnNum - 4)">
            <a href="#"><i class="la la-money"></i> <span> Payments</span> <span class="menu-arrow"></span></a>
            <ul>
             

              <li>
                <router-link to="/payment/products">
                  Payment Products
                </router-link>
              </li>
              
              <li>
                <router-link to="/payment/debits">
                  Payment Debits
                </router-link>
              </li>
              
               <li>
                <router-link to="/payment/history">
                  Payments History
                </router-link>
              </li>
              
              <!-- <li>
                <router-link to="/payment/channels">
                  Payment Channels
                </router-link>
              </li> -->

              <li>
                <router-link to="/payment/banks">
                  Payment Banks
                </router-link>
              </li>

              <li>
                <router-link to="/payment/pos">
                  Payment POS
                </router-link>
              </li>
             
            </ul>
          </li>

          <li class="menu-title">
            <span>Sub Pages</span>
          </li>

          <li class="submenu dropdown-sidebar" @click="toggleSidebar(sidebarBtnNum - 3)">
            <a href="#" class="noti-dot"><i class="la la-user"></i> <span> One</span> <span
                class="menu-arrow"></span></a>
            <ul>
              <li><router-link to="#" class="active">Lorem, ipsum.</router-link></li>
              <li><router-link to="#">Lorem, ipsum.</router-link></li>
              <li><router-link to="#">Lorem, ipsum.</router-link></li>
              <li><router-link to="#">Lorem, ipsum.</router-link></li>
            </ul>
          </li>

          <li>
            <a href="#"><i class="la la-users"></i> <span>Two</span></a>
          </li>

     

        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const sidebarBtnNum = ref(0);
const sidebarBtn = ref([])
const sidebarDropdown = ref([])
const sidebarLinks = ref([])

const toggleSidebar = (num) => {
  // console.log(sidebarLinks.value[num])
  // console.log(sidebarDropdown.value[num])

  if (!sidebarLinks.value[num].classList.contains("active", "subdrop")) {
    for (let i = 0; i < sidebarBtnNum.value; i++) {
      console.log('in')
      sidebarLinks.value[i].className = ""
      sidebarDropdown.value[i].className = ""
    }

    sidebarLinks.value[num].classList.add("active", "subdrop")
    sidebarDropdown.value[num].classList.add("d-block")
  } else {
    sidebarLinks.value[num].className = ""
    sidebarDropdown.value[num].className = ""
  }
}

onMounted(() => {
  sidebarBtn.value = document.querySelectorAll('.dropdown-sidebar');
  sidebarLinks.value = document.querySelectorAll('.dropdown-sidebar > a');
  sidebarDropdown.value = document.querySelectorAll('.dropdown-sidebar ul');
  sidebarBtnNum.value = sidebarBtn.value.length
})
</script>