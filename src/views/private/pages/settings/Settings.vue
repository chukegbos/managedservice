<template>
  <div>

    <div class="container">
      <div class="d-flex justify-content-between align-items-center mt-3">
        <div></div>

        <div class="">
          <h3>App Settings Page</h3>
        </div>
      </div>

      <div class="card-body">
        <!-- Tab Navigaions  -->
        <ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Admins
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Roles & Permissions
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Change Password
            </button>
          </li>
        </ul>
        <!-- Tab Navigations ends here  -->

        <!-- Tab Content -->
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <Admin />
          </div>
          <div
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <Roles />
          </div>
          <div
            class="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            <ChangePassword />
          </div>
        </div>
        <!-- Tab Content ends here  -->
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import Roles from "@/components/RoleComponent.vue";
import Admin from "@/components/AdminComponent.vue";
import ChangePassword from "@/components/ChangePassword.vue";
</script>
  
  <style>
@media only screen and (min-width: 992px) {
  .modal {
    width: 750px !important;
    height: 400px !important;
  }
}
</style>