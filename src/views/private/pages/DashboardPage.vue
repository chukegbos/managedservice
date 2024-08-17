<template>
  <div class="mx-3 pt-3">
    <Loading :active="loading" />

    <div class="container-fluid pb-0">
      <div class="page-header mb-3 text-center">
        <h2 class="page-title">
          Welcome {{ loggedInUser["username"].toUpperCase() }}
        </h2>
        <h4>Manage a bar</h4>
      </div>

      <div class="row mb-xl-4">
        <div
          v-for="(bar, index) in bars"
          :key="bar"
          @click="navigateToBar(index)"
          class="col-12 mb-3 p-3 d-flex align-items-center shadow-lg text-decoration-none cursor-pointer"
        >
          <div class="dash-widget-icon me-3">
            <i class="fa-solid fa-wine-bottle"></i>
          </div>
          <div>
            <h4 class="mb-0">{{ bar["name"] }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/store/authStore";
import { useBarsStore } from "@/store/barsStore";
import { axiosUrl } from "@/env";
import { storeToRefs } from "pinia";
import { formatDate, swalErrorHandle } from "@/components/myHelperFunction";
import { useRoute, useRouter } from "vue-router";

const loading = ref(false);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const barsStore = useBarsStore();
const loggedInUser = authStore.loggedInUser;
const { bars, members, channels, banks, pos, sales } = storeToRefs(barsStore);

const getData = async () => {
  loading.value = true;
  await axiosUrl
    .get("/bars/mobile")
    .then((response) => {
      bars.value = response.data?.data;
      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;
      swalErrorHandle(error);
    });
};

const getMembers = async () => {
  await axiosUrl
    .get("/members/mobile")
    .then((response) => {
      members.value = response.data?.data;
      console.log(members.value);
    })
    .catch((error) => {
      swalErrorHandle(error);
    });
};

const getSales = async () => {
  await axiosUrl
    .get("/sale")
    .then((response) => {
      sales.value = response.data.data;
    })
    .catch((error) => {
      swalErrorHandle(error);
    });
};

const getChannel = async () => {
  await axiosUrl
    .get("/payments/channels")
    .then((response) => {
      channels.value = response.data.data;
    })
    .catch((error) => {
    });
};

const getBanks = async () => {
  await axiosUrl
    .get("/payments/bank")
    .then((response) => {
      banks.value = response.data.data;
    })
    .catch((error) => {
    });
};

const getPOS = async () => {
  await axiosUrl
    .get("/payments/pos")
    .then((response) => {
      pos.value = response.data.data;
    })
    .catch((error) => {
    });
};

const navigateToBar = (index) => {
  localStorage.setItem("bar_id", index);
  router.push({
    path: 'bar', query: { id: index }
  });
};

onMounted(() => {
  if (window.innerWidth >= 1100)
    document.querySelectorAll(".page-header")[0].style.width = "1000px";

  if (bars.value.length === 0) {
    getData();
  }
  if (members.value.length === 0) {
    getMembers();
  }

  if (sales.value.length === 0) {
    getSales();
  }

  if (channels.value.length === 0) {
    getChannel();
  }
  if (banks.value.length === 0) {
    getBanks();
  }
  if (pos.value.length === 0) {
    getPOS();
  }
});
</script>

<style scoped>
.dash-widget-icon {
  background-color: #004aad;
  color: #ffffff;
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