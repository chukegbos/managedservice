<template>
  <div class="mx-3 pt-3">
    <div class="container-fluid pb-0">
      <div class="page-header mb-sm-0">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">
              Welcome {{ loggedInUser["username"].toUpperCase() }}
            </h3>
            <p>Bars </p>
          </div>
        </div>
      </div>

      <div class="row mb-xl-4">
        <router-link :to="{ name: 'BarPage', params: { id: '0' } }"
          class="col-12 mb-3 p-3 d-flex align-items-center shadow-lg text-decoration-none">
          <div class="dash-widget-icon me-3"><i class="fa-solid fa-wine-bottle"></i></div>
          <div>
            <h4 class="mb-0">Bar 1</h4>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "@/store/authStore";
import { axiosUrl } from "@/env";
// import { formatDate, swalErrorHandle } from "@/components/myHelperFunction";

const loading = ref(false);
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;

onMounted(() => {
  if (window.innerWidth >= 1100)
    document.querySelectorAll(".page-header")[0].style.width = "1000px";
});

const getData = async () => {
  loading.value = true;

  await axiosUrl
    .get("/dashboard")
    .then((response) => {

      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;
      swalErrorHandle(error);
    });
};

onMounted(() => {
  // getData();
});
</script>

<style scoped>
.dash-widget-icon {
  background-color: #004aad;
  color: #FFFFFF;
  font-size: 20px;
  height: 40px;
  line-height: 60px;
  margin-right: 10px;
  text-align: center;
  width: 40px;
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
</style>