<template>
  <div class="header">

    <div class="header-left">
      <router-link to="#" class="logo">
        <img src="@/assets/img/logo.svg" alt="Logo">
      </router-link>
      <router-link to="#" class="logo collapse-logo">
        <img src="@/assets/img/collapse-logo.svg" alt="Logo">
      </router-link>
      <router-link to="#" class="logo2">
        <img src="@/assets/img/logo2.png" width="40" height="40" alt="Logo">
      </router-link>
    </div>

    <a id="toggle_btn" @click="toggleSidebar()">
      <span class="bar-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </a>

    <div class="page-title-box">
      <h3>Admin Dashboard</h3>
    </div>

    <a id="mobile_btn" class="mobile_btn d-block" href="#sidebar"><i class="fa-solid fa-bars"></i></a>

    <ul class="nav user-menu">
      <li class="nav-item">
        <div class="top-nav-search">
          <a href="javascript:void(0);" class="responsive-search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </a>
          <form action="">
            <input class="form-control" type="text" placeholder="Search here">
            <button class="btn" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
      </li>

      <li class="nav-item dropdown has-arrow flag-nav">
        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" @click="toggleDropdown()">
          <img src="@/assets/img/flags/us.png" alt="Flag" height="20"> <span>English</span>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a href="javascript:void(0);" class="dropdown-item">
            <img src="@/assets/img/flags/us.png" alt="Flag" height="16"> English
          </a>
          <a href="javascript:void(0);" class="dropdown-item">
            <img src="@/assets/img/flags/fr.png" alt="Flag" height="16"> French
          </a>
          <a href="javascript:void(0);" class="dropdown-item">
            <img src="@/assets/img/flags/es.png" alt="Flag" height="16"> Spanish
          </a>
          <a href="javascript:void(0);" class="dropdown-item">
            <img src="@/assets/img/flags/de.png" alt="Flag" height="16"> German
          </a>
        </div>
      </li>

      <li class="nav-item dropdown">
        <a href="#" class="dropdown-toggle nav-link" data-bs-toggle="dropdown" @click="toggler(1, 0)">
          <i class="fa-regular fa-bell"></i> <span class="badge rounded-pill">3</span>
        </a>
        <div class="dropdown-menu notifications">
          <div class="topnav-dropdown-header">
            <span class="notification-title">Notifications</span>
            <a href="javascript:void(0)" class="clear-noti"> Clear All </a>
          </div>
          <div class="noti-content">
            <ul class="notification-list">
              <li class="notification-message">
                <a href="#">
                  <div class="chat-block d-flex">
                    <span class="avatar flex-shrink-0">
                      <img src="@/assets/img/profiles/avatar-02.jpg" alt="User Image">
                    </span>
                    <div class="media-body flex-grow-1">
                      <p class="noti-details"><span class="noti-title">John Doe</span> added new task <span
                          class="noti-title">Patient appointment booking</span></p>
                      <p class="noti-time"><span class="notification-time">4 mins ago</span></p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="chat-block d-flex">
                    <span class="avatar flex-shrink-0">
                      <img src="@/assets/img/profiles/avatar-03.jpg" alt="User Image">
                    </span>
                    <div class="media-body flex-grow-1">
                      <p class="noti-details"><span class="noti-title">Tarah Shropshire</span> changed the task name
                        <span class="noti-title">Appointment booking with payment gateway</span>
                      </p>
                      <p class="noti-time"><span class="notification-time">6 mins ago</span></p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="chat-block d-flex">
                    <span class="avatar flex-shrink-0">
                      <img src="@/assets/img/profiles/avatar-06.jpg" alt="User Image">
                    </span>
                    <div class="media-body flex-grow-1">
                      <p class="noti-details"><span class="noti-title">Misty Tison</span> added <span
                          class="noti-title">Domenic Houston</span> and <span class="noti-title">Claire Mapes</span>
                        to project <span class="noti-title">Doctor available module</span></p>
                      <p class="noti-time"><span class="notification-time">8 mins ago</span></p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="chat-block d-flex">
                    <span class="avatar flex-shrink-0">
                      <img src="@/assets/img/profiles/avatar-17.jpg" alt="User Image">
                    </span>
                    <div class="media-body flex-grow-1">
                      <p class="noti-details"><span class="noti-title">Rolland Webber</span> completed task <span
                          class="noti-title">Patient and Doctor video conferencing</span></p>
                      <p class="noti-time"><span class="notification-time">12 mins ago</span></p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="chat-block d-flex">
                    <span class="avatar flex-shrink-0">
                      <img src="@/assets/img/profiles/avatar-13.jpg" alt="User Image">
                    </span>
                    <div class="media-body flex-grow-1">
                      <p class="noti-details"><span class="noti-title">Bernardo Galaviz</span> added new task <span
                          class="noti-title">Private chat module</span></p>
                      <p class="noti-time"><span class="notification-time">2 days ago</span></p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div class="topnav-dropdown-footer">
            <a href="#">View all Notifications</a>
          </div>
        </div>
      </li>

      <li class="nav-item dropdown">
        <a href="#" class="dropdown-toggle nav-link" data-bs-toggle="dropdown" @click="toggler(2, 1)">
          <i class="fa-regular fa-comment"></i><span class="badge rounded-pill">8</span>
        </a>
        <div class="dropdown-menu notifications">
          <div class="topnav-dropdown-header">
            <span class="notification-title">Messages</span>
            <a href="javascript:void(0)" class="clear-noti"> Clear All </a>
          </div>
          <div class="noti-content">
            <ul class="notification-list">
              <li class="notification-message">
                <a href="#">
                  <div class="list-item">
                    <div class="list-left">
                      <span class="avatar">
                        <img src="@/assets/img/profiles/avatar-09.jpg" alt="User Image">
                      </span>
                    </div>
                    <div class="list-body">
                      <span class="message-author">Richard Miles </span>
                      <span class="message-time">12:28 AM</span>
                      <div class="clearfix"></div>
                      <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="list-item">
                    <div class="list-left">
                      <span class="avatar">
                        <img src="@/assets/img/profiles/avatar-02.jpg" alt="User Image">
                      </span>
                    </div>
                    <div class="list-body">
                      <span class="message-author">John Doe</span>
                      <span class="message-time">6 Mar</span>
                      <div class="clearfix"></div>
                      <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="list-item">
                    <div class="list-left">
                      <span class="avatar">
                        <img src="@/assets/img/profiles/avatar-03.jpg" alt="User Image">
                      </span>
                    </div>
                    <div class="list-body">
                      <span class="message-author"> Tarah Shropshire </span>
                      <span class="message-time">5 Mar</span>
                      <div class="clearfix"></div>
                      <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="list-item">
                    <div class="list-left">
                      <span class="avatar">
                        <img src="@/assets/img/profiles/avatar-05.jpg" alt="User Image">
                      </span>
                    </div>
                    <div class="list-body">
                      <span class="message-author">Mike Litorus</span>
                      <span class="message-time">3 Mar</span>
                      <div class="clearfix"></div>
                      <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="list-item">
                    <div class="list-left">
                      <span class="avatar">
                        <img src="@/assets/img/profiles/avatar-08.jpg" alt="User Image">
                      </span>
                    </div>
                    <div class="list-body">
                      <span class="message-author"> Catherine Manseau </span>
                      <span class="message-time">27 Feb</span>
                      <div class="clearfix"></div>
                      <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div class="topnav-dropdown-footer">
            <a href="#">View all Messages</a>
          </div>
        </div>
      </li>

      <li class="nav-item dropdown has-arrow main-drop">
        <a href="#" class="dropdown-toggle nav-link" data-bs-toggle="dropdown" @click="toggleProfile()">
          <span class="user-img"><img src="@/assets/img/avatar/avatar-27.jpg" alt="User Image">
            <span class="status online"></span></span>
          <span>Admin</span>
        </a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">My Profile</a>
          <a class="dropdown-item" href="#">Settings</a>
          <a class="dropdown-item" href="#">Logout</a>
        </div>
      </li>
    </ul>

    <div class="dropdown mobile-user-menu">
      <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i
          class="fa-solid fa-ellipsis-vertical"></i></a>
      <div class="dropdown-menu dropdown-menu-right">
        <a class="dropdown-item" href="#">My Profile</a>
        <a class="dropdown-item" href="#">Settings</a>
        <a class="dropdown-item" href="#">Logout</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const element = ref();
const element2 = ref()

const toggleSidebar = () => {
  if (!document.querySelectorAll(".body")[0].classList.contains("mini-sidebar"))
    document.querySelectorAll(".body")[0].classList.add("mini-sidebar")
  else
    document.querySelectorAll(".body")[0].className = "body"
}

const toggleDropdown = () => {
  const num = 0
  const element2 = document.querySelectorAll(".dropdown-menu.dropdown-menu-right");

  if (!element.value[num].classList.contains("show")) {
    element.value[num].setAttribute("aria-expanded", "true");
    element.value[num].classList.add("show")

    element2[num].classList.add("show")
    element2[num].style.cssText = "position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(10px, 42px); overflow: hidden;";
  } else {
    element.value[num].setAttribute("aria-expanded", "false");
    element.value[num].classList.remove("show")

    element2[num].classList.remove("show")
    element2[num].style.cssText = ""
  }
}

const toggleProfile = () => {
  const num = 3
  const element2 = document.querySelectorAll(".dropdown-menu");

  if (!element.value[num].classList.contains("show")) {
    element.value[num].setAttribute("aria-expanded", "true");
    element.value[num].classList.add("show")

    element2[num].classList.add("show")
    element2[num].style.cssText = "position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(-50px, 42px); overflow: hidden;";
  } else {
    element.value[num].setAttribute("aria-expanded", "false");
    element.value[num].classList.remove("show")

    element2[num].classList.remove("show")
    element2[num].style.cssText = ""
  }
}

const toggler = (index, num) => {
  let translate

  if (num == 0)
    translate = "-150px"
  else
    translate = "-200px"

  if (!element2.value[num].classList.contains("show")) {
    element.value[index].setAttribute("aria-expanded", "true");
    element.value[index].classList.add("show");

    element2.value[num].classList.add("show");
    element2.value[num].style.cssText = "position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(" + translate + ", 42px); overflow: hidden;";
  } else {
    element.value[index].setAttribute("aria-expanded", "false");
    element.value[index].classList.remove("show");

    element2.value[num].classList.remove("show");
    element2.value[num].style.cssText = "";
  }
}

onMounted(() => {
  element.value = document.querySelectorAll(".nav-link.dropdown-toggle");
  element2.value = document.querySelectorAll(".dropdown-menu.notifications");
})
</script>

<style scoped></style>