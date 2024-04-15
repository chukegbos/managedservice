<template>
    <div class="page-wrapper">
        <loading :active="isLoading" :is-full-page="fullPage"></loading>
        <div class="content container-fluid pb-0">
            <div class="page-header mb-3">
                <div class="row">
                    <div class="col">
                        <h3 class="page-title">Member Sections </h3>
                    </div>
                    <div class="col-auto float-end ms-auto">
                        <button @click="open('modal-name')" class="btn add-btn"><i class="fa-solid fa-plus"></i> Add Employee</button>
                        <Modal name="modal-name" title="Modal title">
                            <ModalContent>
                                Modal content
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
            </div>
            
            <div  v-if="items.lenght > 0">
                <v-card flat>
                    <v-card-title class="d-flex align-center pe-2">
                        <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;

                        <v-spacer></v-spacer>

                        <v-text-field
                            v-model="search"
                            density="compact"
                            label="Search"
                            prepend-inner-icon="mdi-magnify"
                            variant="solo-filled"
                            flat
                            hide-details
                            single-line
                        ></v-text-field>
                    </v-card-title>

                    <v-data-table v-model:search="search" :items="items">
                        <!--<template v-slot:header.stock>
                            <div class="text-end">Stock</div>
                        </template>

                        <template v-slot:item.image="{ item }">
                            <v-card class="my-2" elevation="2" rounded>
                            <v-img
                                :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.image}`"
                                height="64"
                                cover
                            ></v-img>
                            </v-card>
                        </template>

                        <template v-slot:item.rating="{ item }">
                            <v-rating
                            :model-value="item.rating"
                            color="orange-darken-2"
                            density="compact"
                            size="small"
                            readonly
                            ></v-rating>
                        </template> -->

                    </v-data-table>
                </v-card>
            </div>

            <div v-else>
                <div class="alert alert-warning" role="alert">
                    <p class="text-center">No section available</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { useAuthStore } from '@/store/authStore';
    import { axiosUrl } from "@/env";
    import Swal from 'sweetalert2';
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/css/index.css';
    import "@dimsog/vue-modal/dist/style.css";
    import { Modal, ModalContent, open } from "@dimsog/vue-modal";

    const isLoading = ref(false);
    const user = ref("");
    const authStore = useAuthStore();
    const token = authStore.token
    const items = ref([]);
    const search = ref('');

    onMounted(() => {
        maxWidth();
        getSection();
    });
    
    const maxWidth = () => {
        // if (window.innerWidth >= 1100) {
        //     document.querySelectorAll('.page-header')[0].style.width = "1000px"
        // }
    };

    const getSection = async () => {
        isLoading.value = true;
        const response = await axiosUrl.get('/sections');
        items.value = response.data;
        isLoading.value = false
    };
</script>

<style scoped></style>