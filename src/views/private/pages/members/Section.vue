<template>
    <div class="content-wrapper">
        <loading :active="isLoading" :is-full-page="fullPage"></loading>
        <div class="container">
            <div class="mb-3">
                <h3>Member Sections  
                  
                <span class="float-end ms-auto">
                    <button @click="open('add-section')" class="btn add-btn"><i class="fa-solid fa-plus"></i> Add Section</button>
                    <Modal name="add-section" title="Add Section">
                        <ModalContent>
                            <form @submit.prevent="onSubmit()">
                                <div class="input-block mb-4">
                                    <label class="col-form-label">Name</label>
                                    <input class="form-control" type="text" v-model="form.name">
                                </div>

                                <div class="d-grid">
                                    <button class="btn btn-primary account-btn" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </ModalContent>
                    </Modal>
                </span></h3>
            </div>
         
            <div class="mt-5">
                <div  v-if="items.length > 0">
                    <DataTable class="shadow" :value="items" showGridlines paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
                        <Column style="width: 5%">
                            <template #header="">
                                <input type="checkbox" v-model="selectAll">
                            </template>
                            <template #body="slotProps">
                                <input type="checkbox" v-model="selected" :value="slotProps.data.id" number>
                            </template>
                        </Column>
                        <Column field="name" header="Name" style="width: 25%"></Column>
                        <Column header="Date Created" style="width: 25%">
                            <template #body="slotProps">
                                {{ formatDate(slotProps.data.created_at) }}
                            </template>
                        </Column>
                        <Column header="Action" style="width: 25%">
                            <template #body="slotProps">
                                <button @click="onEdit(slotProps.data.id)" class="btn btn-warning btn-sm m-1">Edit</button>
                                <button @click="onDelete(slotProps.data.id)" class="btn btn-danger btn-sm m-1">Delete</button>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div v-else>
                    <div class="card card-body">
                        <div class="alert alert-warning" role="alert">
                            <p class="text-center">No section available</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, computed, onMounted } from 'vue';
    import { useAuthStore } from '@/store/authStore';
    import { axiosUrl } from "@/env";
    import Swal from 'sweetalert2';
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/css/index.css';
    import "@dimsog/vue-modal/dist/style.css";
    import { Modal, ModalContent, open, close } from "@dimsog/vue-modal";   
    import moment from 'moment';

    const isLoading = ref(false);
    const user = ref("");
    const authStore = useAuthStore();
    const token = authStore.token
    const loggedInUser = authStore.loggedInUser;
    const items = ref([]);
    const selected = ref([]);

    const form = reactive({
        name: "",
        club_code:  loggedInUser.club_code
    });

    onMounted(() => {
        getSection();
    });

    const getSection = async () => {
        isLoading.value = true;
        const response = await axiosUrl.get('/sections');
        items.value = response.data.data;
        isLoading.value = false
    };

    function formatDate(value) {
        return moment(value).format('MMM Do YY');
    };

    const onSubmit = async () => {
        isLoading.value = true;
        close('add-section');
        if (form.name == '') {
            isLoading.value = false
            Swal.fire(
            "Failed!",
            "Put name of section.",
            "warning"
            );
        } 
        else {
            await axiosUrl.post("sections/create", form)
            .then((response) => {
                isLoading.value = false
                getSection();
            })
            .catch((error) => {
                isLoading.value = false
            });

        }
    };

    // You can also use setters in computed properties
    const selectAll = computed({
        get() {
            return items.value ? selected.value.length == items.value.length : false;
        },
        set (data) {
            const selected = [];

            if (data) {
                items.value.forEach(function (room) {
                    selected.push(room.id);
                });
            }
        }
    });
</script>

<style scoped>

</style>