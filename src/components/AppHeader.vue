<template>
  <div class="header">
    <loading :active="isLoading" />
    <div class="sidebar-overlay"></div>
    <div class="header-left">
      <router-link to="#" class="logo">
        <img src="@/assets/img/manageclub-247.png" alt="Logo" width="85" />
      </router-link>
      <router-link to="#" class="logo collapse-logo">
        <img width="95" src="@/assets/img/manageclub-247.png" alt="Logo" />
      </router-link>
      <router-link to="#" class="logo2">
        <img src="@/assets/img/manageclub-247.png" width="40" height="40" alt="Logo" />
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
      <h3 style="color: #024BAE">{{ currentClub['name'] }}</h3>
    </div>

    <!-- <a
      @click="toggleMobile()"
      id="mobile_btn"
      class="mobile_btn d-block"
      href="#sidebar"
      ><i class="fa-solid fa-bars"></i
    ></a> -->

    <ul class="nav user-menu">
      <!-- <li class="nav-item">
        <div class="top-nav-search">
          <a href="javascript:void(0);" class="responsive-search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </a>
          <form action="">
            <input class="form-control" type="text" placeholder="Search here" />
            <button class="btn" type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </li> -->

      <!-- <li class="nav-item dropdown has-arrow flag-nav">
        <a
          class="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          @click="toggleDropdown()"
        >
          <img src="@/assets/img/flags/us.png" alt="Flag" height="20" />
          <span>English</span>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a href="javascript:void(0);" class="dropdown-item">
            <img src="@/assets/img/flags/us.png" alt="Flag" height="16" />
            English
          </a>
          <a href="javascript:void(0);" class="dropdown-item">
            <img src="@/assets/img/flags/fr.png" alt="Flag" height="16" />
            French
          </a>
          <a href="javascript:void(0);" class="dropdown-item">
            <img src="@/assets/img/flags/es.png" alt="Flag" height="16" />
            Spanish
          </a>
          <a href="javascript:void(0);" class="dropdown-item">
            <img src="@/assets/img/flags/de.png" alt="Flag" height="16" />
            German
          </a>
        </div>
      </li>

      <li class="nav-item dropdown">
        <a
          href="#"
          class="dropdown-toggle nav-link"
          data-bs-toggle="dropdown"
          @click="toggler(1, 0)"
        >
          <i class="fa-regular fa-bell"></i>
          <span class="badge rounded-pill">3</span>
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
                      <img
                        src="@/assets/img/profiles/avatar-02.jpg"
                        alt="User Image"
                      />
                    </span>
                    <div class="media-body flex-grow-1">
                      <p class="noti-details">
                        <span class="noti-title">John Doe</span> added new task
                        <span class="noti-title"
                          >Patient appointment booking</span
                        >
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">4 mins ago</span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="chat-block d-flex">
                    <span class="avatar flex-shrink-0">
                      <img
                        src="@/assets/img/profiles/avatar-03.jpg"
                        alt="User Image"
                      />
                    </span>
                    <div class="media-body flex-grow-1">
                      <p class="noti-details">
                        <span class="noti-title">Tarah Shropshire</span> changed
                        the task name
                        <span class="noti-title"
                          >Appointment booking with payment gateway</span
                        >
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">6 mins ago</span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="chat-block d-flex">
                    <span class="avatar flex-shrink-0">
                      <img
                        src="@/assets/img/profiles/avatar-06.jpg"
                        alt="User Image"
                      />
                    </span>
                    <div class="media-body flex-grow-1">
                      <p class="noti-details">
                        <span class="noti-title">Misty Tison</span> added
                        <span class="noti-title">Domenic Houston</span> and
                        <span class="noti-title">Claire Mapes</span> to project
                        <span class="noti-title">Doctor available module</span>
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">8 mins ago</span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="chat-block d-flex">
                    <span class="avatar flex-shrink-0">
                      <img
                        src="@/assets/img/profiles/avatar-17.jpg"
                        alt="User Image"
                      />
                    </span>
                    <div class="media-body flex-grow-1">
                      <p class="noti-details">
                        <span class="noti-title">Rolland Webber</span> completed
                        task
                        <span class="noti-title"
                          >Patient and Doctor video conferencing</span
                        >
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">12 mins ago</span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="chat-block d-flex">
                    <span class="avatar flex-shrink-0">
                      <img
                        src="@/assets/img/profiles/avatar-13.jpg"
                        alt="User Image"
                      />
                    </span>
                    <div class="media-body flex-grow-1">
                      <p class="noti-details">
                        <span class="noti-title">Bernardo Galaviz</span> added
                        new task
                        <span class="noti-title">Private chat module</span>
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">2 days ago</span>
                      </p>
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
      </li> -->

      <!-- <li class="nav-item dropdown">
        <a
          href="#"
          class="dropdown-toggle nav-link"
          data-bs-toggle="dropdown"
          @click="toggler(2, 1)"
        >
          <i class="fa-regular fa-comment"></i
          ><span class="badge rounded-pill">8</span>
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
                        <img
                          src="@/assets/img/profiles/avatar-09.jpg"
                          alt="User Image"
                        />
                      </span>
                    </div>
                    <div class="list-body">
                      <span class="message-author">Richard Miles </span>
                      <span class="message-time">12:28 AM</span>
                      <div class="clearfix"></div>
                      <span class="message-content"
                        >Lorem ipsum dolor sit amet, consectetur
                        adipiscing</span
                      >
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="list-item">
                    <div class="list-left">
                      <span class="avatar">
                        <img
                          src="@/assets/img/profiles/avatar-02.jpg"
                          alt="User Image"
                        />
                      </span>
                    </div>
                    <div class="list-body">
                      <span class="message-author">John Doe</span>
                      <span class="message-time">6 Mar</span>
                      <div class="clearfix"></div>
                      <span class="message-content"
                        >Lorem ipsum dolor sit amet, consectetur
                        adipiscing</span
                      >
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="list-item">
                    <div class="list-left">
                      <span class="avatar">
                        <img
                          src="@/assets/img/profiles/avatar-03.jpg"
                          alt="User Image"
                        />
                      </span>
                    </div>
                    <div class="list-body">
                      <span class="message-author"> Tarah Shropshire </span>
                      <span class="message-time">5 Mar</span>
                      <div class="clearfix"></div>
                      <span class="message-content"
                        >Lorem ipsum dolor sit amet, consectetur
                        adipiscing</span
                      >
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="list-item">
                    <div class="list-left">
                      <span class="avatar">
                        <img
                          src="@/assets/img/profiles/avatar-05.jpg"
                          alt="User Image"
                        />
                      </span>
                    </div>
                    <div class="list-body">
                      <span class="message-author">Mike Litorus</span>
                      <span class="message-time">3 Mar</span>
                      <div class="clearfix"></div>
                      <span class="message-content"
                        >Lorem ipsum dolor sit amet, consectetur
                        adipiscing</span
                      >
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="#">
                  <div class="list-item">
                    <div class="list-left">
                      <span class="avatar">
                        <img
                          src="@/assets/img/profiles/avatar-08.jpg"
                          alt="User Image"
                        />
                      </span>
                    </div>
                    <div class="list-body">
                      <span class="message-author"> Catherine Manseau </span>
                      <span class="message-time">27 Feb</span>
                      <div class="clearfix"></div>
                      <span class="message-content"
                        >Lorem ipsum dolor sit amet, consectetur
                        adipiscing</span
                      >
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
      </li> -->

      <li class="nav-item dropdown has-arrow main-drop">
        <a
          href="#"
          class="dropdown-toggle nav-link"
          data-bs-toggle="dropdown"
          @click="toggleProfile()"
        >

          <span class="user-img"
            >
            <!-- <img src="@/assets/img/avatar/avatar-27.jpg" alt="User Image" /> -->
            <span class="status online"></span
          ></span>
          <span class="px-2">{{ loggedInUser['username'].toUpperCase() }}</span>
        </a>
        <div class="dropdown-menu">
          <router-link to="/admins" class="dropdown-item">Admins</router-link>
          <a class="dropdown-item" href="#">Club Settings</a>
          <router-link to="/change-password" class="dropdown-item">Change Password</router-link>
          <a @click="logout()" class="dropdown-item" href="#">Logout</a>
        </div>
      </li>
    </ul>

    <div class="dropdown mobile-user-menu">
      <a
        href="#"
        class="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        @click="toggleDropdownMobile()"
      >
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <router-link to="/admins" class="dropdown-item">Admins</router-link>
        <a class="dropdown-item" href="#">Club Settings</a>
        <router-link to="/change-password" class="dropdown-item">Change Password</router-link>
        <a class="dropdown-item" href="#" @click="logout()">Logout</a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
.dropdown-menu {
  left: -50% !important;
}
</style>