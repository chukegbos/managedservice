<template>
  <div class="page-wrapper mt-5 pt-4">
    <div class="content container-fluid pb-0">
        <div class="page-header mb-sm-0">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Welcome {{ loggedInUser['username'].toUpperCase() }}</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row mb-xl-4">
          <div class="col-md-6 col-sm-12 col-lg-6 col-xl-3 mb-3 mb-xl-0">
            <div class="card dash-widget border-0 shadow-sm">
              <div class="card-body">
                <span class="dash-widget-icon"
                  ><i class="fa-solid fa-users"></i
                ></span>
                <div class="dash-widget-info">
                  <h3>112</h3>
                  <span>Members</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3 mb-3 mb-xl-0">
            <div class="card dash-widget border-0 shadow-sm">
              <div class="card-body">
                <span class="dash-widget-icon"
                  ><i class="fa-solid fa-cubes"></i
                ></span>
                <div class="dash-widget-info">
                  <h3>44</h3>
                  <span>Sections</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3 mb-3 mb-xl-0">
            <div class="card dash-widget border-0 shadow-sm">
              <div class="card-body">
                <span class="dash-widget-icon"
                  ><i class="fa-regular fa-dollar-sign"></i
                ></span>
                <div class="dash-widget-info">
                  <h3>37</h3>
                  <span>Payment</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3 mb-3 mb-xl-0">
            <div class="card dash-widget border-0 shadow-sm">
              <div class="card-body">
                <span class="dash-widget-icon"
                  ><i class="fa-solid fa-gem"></i
                ></span>
                <div class="dash-widget-info">
                  <h3>218</h3>
                  <span>Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-xl-4">
          <div class="col-12 col-lg-6 col-xl-4 d-flex mb-2 mb-lg-4">
            <div class="card flex-fill border-0 shadow-sm">
              <div class="card-body">
                <h4 class="card-title">
                  Admininistrators
                  <span class="badge bg-inverse-danger ms-2">5</span>
                </h4>
                <div class="leave-info-box">
                  <div class="media d-flex align-items-center">
                    <a href="profile.html" class="avatar"
                      ><img src="@/assets/img/user.jpg" alt="User Image"
                    /></a>
                    <div class="media-body flex-grow-1">
                      <div class="text-sm my-0">Victor Anih</div>
                    </div>
                  </div>
                  <div class="row align-items-center mt-3">
                    <div class="col-6">
                      <h6 class="mb-0">4 Sep 2019</h6>
                      <!-- <span class="text-sm text-muted">Leave Date</span> -->
                    </div>
                    <div class="col-6 text-end">
                      <span class="badge bg-inverse-success">Super Admin</span>
                    </div>
                  </div>
                </div>
                <div class="leave-info-box">
                  <div class="media d-flex align-items-center">
                    <a href="profile.html" class="avatar"
                      ><img src="@/assets/img/user.jpg" alt="User Image"
                    /></a>
                    <div class="media-body flex-grow-1">
                      <div class="text-sm my-0">Chukwunonso Egbo</div>
                    </div>
                  </div>
                  <div class="row align-items-center mt-3">
                    <div class="col-6">
                      <h6 class="mb-0">4 Sep 2019</h6>
                      <!-- <span class="text-sm text-muted">Leave Date</span> -->
                    </div>
                    <div class="col-6 text-end">
                      <span class="badge bg-inverse-success">Admin</span>
                    </div>
                  </div>
                </div>
                <div class="load-more text-center">
                  <a class="text-white bg-success" href="javascript:void(0);"
                    >Add New Admin</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 col-xl-4 d-flex mb-2 mb-lg-4">
            <div class="card flex-fill dash-statistics border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Statistics</h5>
                <div class="stats-list">
                  <div class="stats-info">
                    <p>
                      Total Debt <strong>4 <small>/ 65</small></strong>
                    </p>
                    <div class="progress">
                      <div
                        class="progress-bar bg-primary w-31"
                        role="progressbar"
                        aria-valuenow="31"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>  
                  <div class="stats-info">
                    <p>
                      Completed Payment
                      <strong>85 <small>/ 112</small></strong>
                    </p>
                    <div class="progress">
                      <div
                        class="progress-bar bg-success w-62"
                        role="progressbar"
                        aria-valuenow="62"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <div class="stats-info">
                    <p>
                      Open Tickets <strong>190 <small>/ 212</small></strong>
                    </p>
                    <div class="progress">
                      <div
                        class="progress-bar bg-danger w-62"
                        role="progressbar"
                        aria-valuenow="62"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <div class="stats-info">
                    <p>
                      Closed Tickets <strong>22 <small>/ 212</small></strong>
                    </p>
                    <div class="progress">
                      <div
                        class="progress-bar bg-info w-22"
                        role="progressbar"
                        aria-valuenow="22"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 col-xl-4 d-flex mb-2 mb-lg-4">
            <div class="card flex-fill border-0 shadow-sm">
              <div class="card-body">
                <h4 class="card-title">Task Statistics</h4>
                <div class="statistics">
                  <div class="row">
                    <div class="col-md-6 col-6 text-center">
                      <div class="stats-box mb-4">
                        <p>Total Tasks</p>
                        <h3>385</h3>
                      </div>
                    </div>
                    <div class="col-md-6 col-6 text-center">
                      <div class="stats-box mb-4">
                        <p>Overdue Tasks</p>
                        <h3>19</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="progress mb-4">
                  <div
                    class="progress-bar bg-purple w-30"
                    role="progressbar"
                    aria-valuenow="30"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    30%
                  </div>
                  <div
                    class="progress-bar bg-warning w-22"
                    role="progressbar"
                    aria-valuenow="18"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    22%
                  </div>
                  <div
                    class="progress-bar bg-success w-24"
                    role="progressbar"
                    aria-valuenow="12"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    24%
                  </div>
                  <div
                    class="progress-bar bg-danger w-21"
                    role="progressbar"
                    aria-valuenow="14"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    21%
                  </div>
                  <div
                    class="progress-bar bg-info w-10"
                    role="progressbar"
                    aria-valuenow="14"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    10%
                  </div>
                </div>
                <div>
                  <p>
                    <i class="fa-regular fa-circle-dot text-purple me-2"></i
                    >Completed Tasks <span class="float-end">166</span>
                  </p>
                  <p>
                    <i class="fa-regular fa-circle-dot text-warning me-2"></i
                    >Inprogress Tasks <span class="float-end">115</span>
                  </p>
                  <p>
                    <i class="fa-regular fa-circle-dot text-success me-2"></i
                    >On Hold Tasks <span class="float-end">31</span>
                  </p>
                  <p>
                    <i class="fa-regular fa-circle-dot text-danger me-2"></i
                    >Pending Tasks <span class="float-end">47</span>
                  </p>
                  <p class="mb-0">
                    <i class="fa-regular fa-circle-dot text-info me-2"></i
                    >Review Tasks <span class="float-end">5</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "@/store/authStore";
import { axiosUrl } from "@/env";
import Swal from "sweetalert2";

const loading = ref(false);
const user = ref("");
const authStore = useAuthStore();
const token = authStore.token;
const element = ref();
const element2 = ref();
const loggedInUser = authStore.loggedInUser;
const currentClub = authStore.currentClub;



onMounted(() => {
  if (window.innerWidth >= 1100)
    document.querySelectorAll(".page-header")[0].style.width = "1000px";

  // if (!token) {
  //   window.location.href = "/login";
  // }
});
</script>

<style scoped></style>