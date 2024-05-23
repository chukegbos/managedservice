<template>
  <div class="page-wrapper mx-3 pt-3">
    <div class="content container-fluid pb-0">
      <div class="page-header mb-sm-0">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">
              Welcome {{ loggedInUser["username"].toUpperCase() }}
            </h3>
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
        <div class="col-sm-12 col-lg-6 col-xl-4 d-flex mb-2 mb-lg-4">
          <div class="card flex-fill border-0 shadow-sm">
            <div class="card-body">
              <h4 class="card-title">
                Administrators
                <span class="badge bg-inverse-danger ms-2">5</span>
              </h4>
              <div class="leave-info-box">
                <div class="media d-flex align-items-center">
                  <a href="profile.html" class="avatar"
                    ><img src="@/assets/img/user.jpg" alt="User Image" width="50"
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
                    ><img src="@/assets/img/user.jpg" alt="User Image" width="50"
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
                <a class="text-decoration-none text-white bg-success" href="javascript:void(0);"
                  >Add New Admin</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-lg-6 col-xl-4 d-flex mb-2 mb-lg-4">
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
        <div class="col-sm-12 col-lg-6 col-xl-4 d-flex mb-2 mb-lg-4">
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
                  <i class="fa-regular fa-circle-dot text-success me-2"></i>On
                  Hold Tasks <span class="float-end">31</span>
                </p>
                <p>
                  <i class="fa-regular fa-circle-dot text-danger me-2"></i
                  >Pending Tasks <span class="float-end">47</span>
                </p>
                <p class="mb-0">
                  <i class="fa-regular fa-circle-dot text-info me-2"></i>Review
                  Tasks <span class="float-end">5</span>
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

<style scoped>
.dash-widget .card-body {
  flex-flow: wrap;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.dash-widget .card-body .dash-widget-icon {
  background-color: rgba(255, 155, 68, 0.2);
  color: #004aad;
  font-size: 30px;
  height: 60px;
  line-height: 60px;
  margin-right: 10px;
  text-align: center;
  width: 60px;
  border-radius: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  justify-content: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
}

.dash-widget .card-body .dash-widget-info {
  text-align: right;
  width: calc(100% - 70px);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: flex-end;
  -ms-flex-direction: column;
  flex-direction: column;
}

.dash-widget .card-body .dash-widget-info h3 {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 8px;
}

.dash-widget .card-body .dash-widget-info span {
  font-size: 16px;
}

.page-wrapper .content .page-header .page-title {
  color: #212529;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 5px;
}

@media (max-width: 575px) {
  .page-wrapper .content .page-header .page-title {
    font-size: 20px;
  }
}

.page-header .breadcrumb .breadcrumb-item.active {
  color: #4d5154;
}
.card-title p {
  font-size: 15px;
  margin-bottom: 0;
  margin-top: 5px;
}

.leave-info-box {
  border: 1px solid #e9e9ea;
  margin: 0 0 15px;
  padding: 15px;
}

.load-more a {
  background-color: #fff;
  border: 1px solid #e9e9ea;
  display: inline-block;
  font-size: 14px;
  padding: 5px 15px;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}
.load-more-btn a {
  display: inline-flex;
  align-items: center;
}

.load-more-btn a i {
  border-width: 2px;
  color: #fff;
  width: 16px;
  height: 16px;
  margin-left: 5px;
}

.dash-statistics .stats-list {
  height: auto;
}

.dash-statistics .stats-info {
  margin-bottom: 5px;
  background-color: #fff;
  border: 1px solid #e9e9ea;
  text-align: center;
  padding: 15px;
  border-radius: 4px;
}

.dash-statistics .stats-info p {
  font-size: 12px;
  margin-bottom: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -ms-flex-pack: space-between;
}

.dash-statistics .progress {
  height: 4px;
}

.dash-statistics .stats-list {
  height: auto;
}

.dash-statistics .stats-info {
  margin-bottom: 5px;
  background-color: #fff;
  border: 1px solid #e9e9ea;
  text-align: center;
  padding: 15px;
  border-radius: 4px;
}

.dash-statistics .stats-info p {
  font-size: 12px;
  margin-bottom: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -ms-flex-pack: space-between;
}

.dash-statistics .progress {
  height: 4px;
}

.dash-statistics .stats-list {
  height: auto;
}

.dash-statistics .stats-info {
  margin-bottom: 5px;
  background-color: #fff;
  border: 1px solid #e9e9ea;
  text-align: center;
  padding: 15px;
  border-radius: 4px;
}

.dash-statistics .stats-info p {
  font-size: 12px;
  margin-bottom: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -ms-flex-pack: space-between;
}

.att-statistics .progress {
  height: 4px;
}

.att-statistics .stats-info {
  background-color: #fff;
  border: 1px solid #e9e9ea;
  text-align: center;
  border-radius: 4px;
  margin: 0 0 5px;
  padding: 15px;
}

.att-statistics .stats-info p {
  font-size: 12px;
  margin: 0 0 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -ms-flex-pack: space-between;
}

.dash-statistics .stats-info {
  margin-bottom: 5px;
  background-color: #fff;
  border: 1px solid #e9e9ea;
  text-align: center;
  padding: 15px;
  border-radius: 4px;
}

.dash-statistics .stats-info p {
  font-size: 12px;
  margin-bottom: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -ms-flex-pack: space-between;
}

.stats-info {
  background-color: #fff;
  border: 1px solid #e9e9ea;
  text-align: center;
  border-radius: 4px;
  margin: 0 0 20px;
  padding: 15px;
}

.stats-info h6 {
  color: #212529;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  margin-bottom: 5px;
}

.stats-info h4 {
  font-size: 24px;
  margin-bottom: 0;
}

.stats-info h4 span {
  color: #646669;
  font-size: 12px;
}

@keyframes progress-animate {
  0% {
    width: 0;
  }
}

.progress-animate {
  position: relative;
  border-radius: 0.625rem;
}

.progress-animate .progress-bar {
  position: relative;
  border-radius: 0.625rem;
  animation: 2s progress-animate;
}

.progress-custom {
  overflow: visible;
  position: relative;
}

.progress-custom .progress-bar {
  position: relative;
  overflow: visible;
}

.progress-custom .progress-bar:after {
  content: "";
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 50%;
  box-shadow: 0 0.313rem 0.313rem rgba(255, 144, 47, 0.5);
  background: #fff;
  position: absolute;
  inset-inline-end: -0.375rem;
  inset-block-start: -0.375rem;
  border: 0.25rem solid #004aad;
}

.progress-custom .progress-bar.bg-secondary:after {
  border: 0.25rem solid #212529;
  box-shadow: 0 0.313rem 0.313rem rgba(33, 37, 41, 0.2);
}

.progress-custom .progress-bar.bg-warning:after {
  border: 0.25rem solid #ffbc34;
  box-shadow: 0 0.313rem 0.313rem rgba(255, 188, 52, 0.2);
}

.progress-custom .progress-bar.bg-info:after {
  border: 0.25rem solid #009efb;
  box-shadow: 0 0.313rem 0.313rem rgba(var(--info-rgb), 0.2);
}

.progress-custom .progress-bar.bg-success:after {
  border: 0.25rem solid #55ce63;
  box-shadow: 0 0.313rem 0.313rem rgba(var(--success-rgb), 0.2);
}

.progress-custom .progress-bar.bg-danger:after {
  border: 0.25rem solid #fc133d;
  box-shadow: 0 0.313rem 0.313rem rgba(var(--danger-rgb), 0.2);
}

.progress-vertical {
  min-height: 250px;
  height: 250px;
  width: 10px;
  position: relative;
  display: inline-block;
  margin-bottom: 0;
  margin-right: 20px;
}

.progress-vertical .progress-bar {
  width: 100%;
}

.progress-vertical-bottom .progress-bar {
  width: 100%;
  bottom: 0;
  position: absolute;
}

.custom-progress-3 {
  overflow: visible;
  border-radius: 0.625rem;
}

.custom-progress-3 .progress-bar {
  position: relative;
  overflow: visible;
  margin: 0.313rem;
  border-radius: 0.25rem;
}

.custom-progress-3 .progress-bar:before {
  content: "";
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  inset-inline-start: 0.125rem;
  background-color: #fff;
  border-radius: 50%;
}

.custom-progress-3 .progress-bar .progress-bar-value {
  border: 0.125rem solid #004aad;
  width: 2.5rem;
  height: 1.563rem;
  line-height: 1.313rem;
  border-radius: 3.125rem;
  background: #fff;
  font-size: 0.625rem;
  font-weight: 600;
  color: #004aad;
  text-align: center;
  position: absolute;
  inset-inline-end: -0.625rem;
}

.custom-progress-3 .progress-bar .progress-bar-value.secondary {
  border: 0.125rem solid #212529;
  color: #212529;
}

.custom-progress-3 .progress-bar .progress-bar-value.warning {
  border: 0.125rem solid #ffbc34;
  color: #ffbc34;
}

.custom-progress-3 .progress-bar .progress-bar-value.info {
  border: 0.125rem solid #009efb;
  color: #009efb;
}

.custom-progress-3 .progress-bar .progress-bar-value.success {
  border: 0.125rem solid #55ce63;
  color: #55ce63;
}

.custom-progress-3 .progress-bar .progress-bar-value.danger {
  border: 0.125rem solid #fc133d;
  color: #fc133d;
}

.progress-xs {
  height: 4px;
}

.progress .progress-bar {
  background-color: #25628f;
}

.progress-bar.w-40 {
  width: 40%;
}

.progress-bar.w-65 {
  width: 65%;
}

.progress-bar.w-15 {
  width: 15%;
}

.progress-bar.w-88 {
  width: 88%;
}

.progress-bar.w-70 {
  width: 70%;
}

.progress-bar.w-31 {
  width: 31%;
}

.progress-bar.w-62 {
  width: 62%;
}

.progress-bar.w-22 {
  width: 22%;
}

.progress-bar.w-24 {
  width: 24%;
}

.progress-bar.w-30 {
  width: 30%;
}

.progress-bar.w-26 {
  width: 26%;
}

.progress-bar.w-10 {
  width: 10%;
}

.progress-bar.w-21 {
  width: 21%;
}

.progress-bar.w-20 {
  width: 20%;
}

.progress.height-5 {
  height: 5px;
}

.progress-bar.w-73 {
  width: 73%;
}

.progress-bar.height-10 {
  height: 10px;
}

.kanban-cont .kanban-list.kanban-danger .progress-bar {
  background-color: #fc133d;
}

.kanban-cont .kanban-list.kanban-info .progress-bar {
  background-color: #42a5f5;
}
.kanban-cont .kanban-list.kanban-success .progress-bar {
  background-color: #55ce63;
}
.kanban-cont .kanban-list.kanban-purple .progress-bar {
  background-color: #9368e9;
}
.kanban-cont .kanban-list.kanban-warning .progress-bar {
  background-color: #ffbc34;
}
.pipeline-progress .progress .progress-bar.progress-bar-danger {
  background: #fc133d;
}

.pipeline-progress .progress .progress-bar.progress-bar-success {
  background: #55ce63;
}

.pipeline-progress .progress .progress-bar.progress-bar-violet {
  background: #9368e9;
}

.pipeline-progress .progress .progress-bar.progress-bar-info {
  background: #009efb;
}

.pipeline-progress .progress .progress-bar.progress-bar-warning {
  background: #ffbc34;
}

.pipeline-progress .progress .progress-bar.progress-bar-pink {
  background: #fc6075;
}

.pipeline-progress .progress .progress-bar.progress-bar-danger {
  background: #fc133d;
}
.pipeline-progress .progress .progress-bar {
  width: 70px;
  height: 5px;
  border-radius: 5px;
}
.punch-btn-section .stats-box {
  background-color: #f9f9f9;
  border: 1px solid #e2e4e6;
  margin: 0 0 15px;
  padding: 5px;
}

.punch-btn-section .stats-box p {
  font-size: 12px;
  margin: 0;
}

.punch-btn-section .stats-box h6 {
  margin: 0;
}
.dash-statistics .progress {
  height: 4px;
}

.punch-status .stats-box {
  margin-bottom: 0;
}

.stats-box {
  background-color: #f9f9f9;
  border: 1px solid #e2e4e6;
  margin: 0 0 15px;
  padding: 5px;
}

.stats-box h3 {
  margin-bottom: 0;
}

.stats-box p {
  margin: 0;
  font-size: 12px;
}

/* @media (min-width: 992px) {
    .col-lg-6 {
        flex: 0 0 auto;
        width: 50%;
    }
}
@media (min-width: 1200px) {
    .col-xl-4 {
        flex: 0 0 auto;
        width: 33.33333333%;
    }
} */
</style>