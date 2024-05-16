<template>
  <div class="content-wrapper">
    <loading :active="isLoading" />

    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h2>
                <strong>{{ member.first_name }} {{ member.middle_name }} {{ member.last_name }} ({{ member.membership_id }})</strong>
            </h2>
        </div>
        <TabView>
            <TabPanel header="Personal Information">
                <div class="row m-0">
                    <div class="col-md-2 mb-3">
                        <img
                            :src="member.image"
                            alt=""
                            class="img-fluid"
                            style="height: 200px; width: 150px"
                        />
                    </div>
                    <div class="col-md-4 mb-3">
                        Name: {{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}<br>
                        Date of Birth: {{ member.dob }}<br>
                        Gender: {{ member.gender }}<br>
                        Email: {{ member.email }}<br>
                        Phone 1: {{ member.phone_1 }}<br>
                        Phone 2: {{ member.phone_2 }}<br>
                        Address: {{ member.address }}<br>
                        City: {{ member.city }}<br>
                        State: {{ member.state }}<br>
                        Country: {{ member.country }}<br>
                        Office Address: {{ member.office_address }}<br>
                        Home Town: {{ member.home_town }}<br>
                        State of Origin: {{ member.state_of_origin }}<br>
                        City Resident: {{ member.city_resident }}
                    </div>
                    <div class="col-md-4 mb-3">
                        Marital Status: {{ member.marital_status }}<br>
                        Spouse Name: {{ member.spouse_name }}<br>
                        Children: {{ member.children }}<br>
                        Kin Name: {{ additional.kin_name }}<br>
                        Kin Address: {{ additional.kin_address }}<br>
                        Kin Phone 1: {{ additional.kin_phone_1 }}<br>
                        Kin Phone 2: {{ additional.kin_phone_2 }}<br>
                        Kin Relationship: {{ additional.kin_relationship }}<br>
                        Beneficiary Name: {{ additional.beneficiary_name }}<br>
                        Beneficiary Address: {{ additional.beneficiary_address }}<br>
                        Beneficiary Phone 1: {{ additional.beneficiary_phone_1 }}<br>
                        Beneficiary Phone 2: {{ additional.beneficiary_phone_2 }}<br>
                        Beneficiary Relationship: {{ additional.beneficiary_relationship }}<br>
                        Sponsor 1: {{ additional.sponsor_1 }}<br>
                        Sponsor 2: {{ additional.sponsor_2 }}
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Additional Information">
                
            </TabPanel>
            <TabPanel header="Header III">
                <p class="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                    officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                </p>
            </TabPanel>
        </TabView>
    </div>

  </div>
</template>

<script setup>
    import { axiosUrl } from "@/env";
    import { ref, reactive, onMounted } from "vue";
    import { FilterMatchMode } from "primevue/api";
    import { useAuthStore } from "@/store/authStore";
    import { formatDate } from "@/components/myHelperFunction";
    import Swal from "sweetalert2";
    import router from '@/router';
    import { useRoute } from "vue-router";

    const isLoading = ref(false);
    const membership_id = ref();
    const route = useRoute();
    const member = ref({});
    const additional = ref({});
    const authStore = useAuthStore();

    const getMember = async () => {
        isLoading.value = true;

        await axiosUrl
        .get("/members/" + membership_id.value)
        .then((response) => {
            console.log(response.data.data[0])
            member.value = response.data.data[0].member;
            console.log(member.value)
            additional.value = response.data.data[0].additional;
            isLoading.value = false;
        })
        .catch((error) => {
        isLoading.value = false;
        });
    };
    onMounted(() => {
        try {
            membership_id.value = route.params.membershipID;
            getMember();
        } catch (error) {
             isLoading.value = false;
            Swal.fire(
                "Failed!",
                "Its not your fault, try again.",
                "warning"
            );
        } 
    });
</script>

<style scoped>
</style>