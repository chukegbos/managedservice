<template>
  <Teleport to="body" v-if="isToggled">
    <Transition name="modal-fade">
      <div class="modal-wrapper">
        <div class="bg-white rounded-sm d-flex flex-column gap-3">
          <header
            class="d-flex justify-content-between align-items-center px-3 py-3 border-bottom"
          >
            <p class="fw-bold text-secondary mb-0">{{ title }}</p>
            <div class="cursor-pointer" @click="$emit('close')">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.01807 13.7346L13.0181 1.73462M1.01807 1.73462L13.0181 13.7346"
                  stroke="#333333"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </header>
          <section class="px-4 mb-4">
            <slot />
          </section>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: "ModalComp",
  emits: ["close"],
  components: {},
  props: {
    isToggled: { type: Boolean, default: false },
    title: { type: String, default: "" },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;

  z-index: 500;

  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);

  display: grid;
  place-items: center;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: 0.25s ease all;
}

.modal-wrapper > div {
  width: 95%;
}

@media only screen and (min-width: 1024px) {
  .modal-wrapper > div {
    width: 400px;
  }
}
</style>