<template>
  <div class="footer-tab-menu">
    <div class="tab-item">
      <router-link :to="'bar?id=' + id">
        <i class="fas fa-beer"></i>
        <span>Inventory</span>
      </router-link>
    </div>
    <div class="tab-item">
      <router-link :to="'sales?id=' + id">
        <i class="fas fa-dollar-sign"></i>
        <span>Sales</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useBarsStore } from "@/store/barsStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const id = ref();

onMounted(() => {
  id.value = localStorage.getItem("bar_id");
});
</script>

<style scoped>
a {
  font-weight: bolder;
  text-decoration: none !important;
}

.footer-tab-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #fff;
  background-color: #306cbd;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
}

.tab-item {
  text-align: center;
  flex: 1;
  border-left: 2px solid #fff; /* 2px width, solid style, black color */
}

.tab-item i {
  font-size: 20px;
  color: #fff;
}

.tab-item span {
  display: block;
  font-size: 12px;
  margin-top: 5px;
  color: #fff;
}

.tab-item:hover i,
.tab-item:hover span {
  color: #fff;
}
</style>