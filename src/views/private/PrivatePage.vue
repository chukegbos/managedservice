<template>
  <div>
    <div class="body">
      <div class="main-wrapper">
        <AppHeader />
        <AppSidebar />
        <router-view />
        <AppFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from "@/components/AppSidebar.vue"
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
</script>

<style scoped></style>