<template>
  <router-view />
</template>

<script setup>
</script>

<style>
.my-input {
  width: 100%;
  display: block;
}

.modal-header {
  border: none;
  padding: 8px 16px;
}

.modal-header__title {
  font-size: 18px;
  font-weight: 700;
  color: #fb7500;
  text-align:center
}

.modal-visible {
  height: auto !important;
}

@media only screen and (min-width: 768px) {
  .my-input {
    width: 350px;
  }
}
</style>