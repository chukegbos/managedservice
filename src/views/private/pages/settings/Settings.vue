<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mt-3">
          <div class="">
              <h3>App Settings Page</h3>
          </div>
      </div>

      <div class="card-body">
          <ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-admin" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Admins</button>
              </li>
              <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-role" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Roles & Permissions</button>
              </li>
              <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-password" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Change Password</button> 
              </li>
              <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-settings" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Site Settings</button> 
              </li>
              <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-plugin" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Plugins</button> 
              </li>
          </ul>
       
          <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active" id="pills-admin" role="tabpanel" aria-labelledby="pills-home-tab">
                  <Admin />
              </div>
              <div class="tab-pane fade" id="pills-role" role="tabpanel" aria-labelledby="pills-profile-tab">
                  <Roles />
              </div>
              <div class="tab-pane fade" id="pills-password" role="tabpanel" aria-labelledby="pills-contact-tab">
                  <ChangePassword />
              </div>
              <div class="tab-pane fade" id="pills-settings" role="tabpanel" aria-labelledby="pills-contact-tab">
                  <SiteSettings />
              </div>
              <div class="tab-pane fade" id="pills-plugin" role="tabpanel" aria-labelledby="pills-contact-tab">
                  <Plugin />
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
    import  Roles  from "@/components/RoleComponent.vue";
    import  Admin  from "@/components/AdminComponent.vue";
    import  ChangePassword  from "@/components/ChangePassword.vue";
    import  SiteSettings  from "@/components/SiteSettings.vue";
    import  Plugin  from "@/components/Plugin.vue";
  </script>
  
  <style>
    @media only screen and (min-width: 992px) {
      .modal {
        width: 750px !important;
        height: 400px !important;
      }
    }
</style>