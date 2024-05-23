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

/* Customized Scrollbar */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar-thumb {
  background: #004badbe;
  border: 0px none #004AAD;
  border-radius: 0px;
}

::-webkit-scrollbar-thumb:hover {
  background: #004AAD;
}

::-webkit-scrollbar-thumb:active {
  background: #004AAD;
}

::-webkit-scrollbar-track {
  background: #f5f7fa;
  border: 0px none #f5f7fa;
  border-radius: 0px;
}

::-webkit-scrollbar-track:hover {
  background: #f5f7fa;
}

::-webkit-scrollbar-track:active {
  background: #f5f7fa;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>