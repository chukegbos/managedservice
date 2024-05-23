<template>
  <div class="content-wrapper">
    <loading :active="isLoading && isLoading2" />

    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h2>
          <strong v-show="!editMode">New Member</strong>
          <strong v-show="editMode">Update Member</strong>
        </h2>
      </div>
      <div class="card mt-2">
        <div class="card-body">
          <form-wizard @on-complete="editMode ? updateUser() : createUser()">
            <tab-content title="Login Detail" icon="fa fa-user">
              <div class="row">
                <div class="col-md-4 form-group mb-3">
                  <label>First Name</label>
                  <input
                    v-model="form.first_name"
                    type="text"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-4 form-group mb-3">
                  <label>Middle Name</label>
                  <input
                    v-model="form.middle_name"
                    type="text"
                    class="form-control"
                  />
                </div>

                <div class="col-md-4 form-group mb-3">
                  <label>Last Name</label>
                  <input
                    v-model="form.last_name"
                    type="text"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-4 form-group mb-3">
                  <label>Membership ID</label>
                  <input
                    v-model="form.membership_id"
                    type="text"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-4 form-group mb-3">
                  <label>Admission Date</label>
                  <input
                    v-model="form.entrance_date"
                    type="date"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-4 form-group mb-3">
                  <label>Member's Types</label>
                  <select
                    v-model="form.member_type"
                    class="form-control"
                    required
                  >
                    <option value="null">-- Select Type--</option>
                    <option
                      v-for="option in types"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{ option.title }}
                    </option>
                  </select>
                </div>

                <div class="col-md-3">
                  <div class="form-group mb-3">
                    <label>Photo Image</label>
                    <input
                      type="file"
                      @change="uploadImage"
                      accept="image/*"
                      name="image"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-3 form-group mb-3">
                  <label>Date of Birth</label>
                  <input v-model="form.dob" type="date" class="form-control" />
                </div>

                <div class="col-md-3">
                  <b-form-group class="">
                    <label>Gender</label>
                    <select v-model="form.gender" class="form-control" required>
                      <option value="null">-- Select Type--</option>
                      <option
                        v-for="option in gender"
                        :value="option.value"
                        :key="option.value"
                      >
                        {{ option.text }}
                      </option>
                    </select>
                  </b-form-group>
                </div>

                <div class="col-md-3 form-group mb-3">
                  <label>Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-3 form-group mb-3">
                  <label>Phone Number(Home)</label>
                  <input
                    v-model="form.phone_1"
                    type="tel"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-3 form-group mb-3">
                  <label>Phone Number (Alt)</label>
                  <input
                    v-model="form.phone_2"
                    type="tel"
                    class="form-control"
                  />
                </div>

                <div class="col-md-3">
                  <b-form-group class="">
                    <label>State of Origin</label>
                    <select
                      v-model="form.state_of_origin"
                      class="form-control"
                      @change="onChange($event)"
                      required
                    >
                      <option value="null">-- Select State --</option>
                      <option
                        v-for="option in states"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.title }}
                      </option>
                    </select>
                  </b-form-group>
                </div>

                <div class="col-md-3">
                  <b-form-group class="">
                    <label>LGA of Origin</label>
                    <select v-model="form.lga" class="form-control" required>
                      <option value="null">-- Select LGA --</option>
                      <option
                        v-for="option in lgas"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </b-form-group>
                </div>

                <div class="col-md-3 form-group mb-3">
                  <label>Home Town</label>
                  <input
                    v-model="form.home_town"
                    type="text"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-3">
                  <div class="form-group mb-3">
                    <label>Country of Residence</label>
                    <input
                      v-model="form.country"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>
                </div>

                <div class="col-md-3">
                  <b-form-group class="">
                    <label>State of Residence</label>
                    <select
                      v-model="form.state"
                      class="form-control"
                      required
                      @change="onChangeState($event)"
                    >
                      <option value="null">-- Select State --</option>
                      <option
                        v-for="option in states"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.title }}
                      </option>
                    </select>
                  </b-form-group>
                </div>

                <div class="col-md-3 form-group mb-3">
                  <label>City</label>
                  <input
                    v-model="form.city_resident"
                    type="text"
                    required
                    class="form-control"
                  />
                </div>

                <!--<div class="col-md-3">
                                <b-form-group class="">
                                    <label>City of Residence</label>
                                    <select v-model="form.city" class="form-control" required>
                                    <option value=null> -- Select LGA -- </option>
                                    <option v-for="option in lgah" :value="option.id" :key="option.id">
                                        {{ option.name }}
                                    </option>
                                    </select>
                                </b-form-group>
                            </div>-->

                <div class="col-md-6 form-group mb-3">
                  <label>Residential Address</label>
                  <textarea
                    v-model="form.address"
                    class="form-control"
                    required
                  ></textarea>
                </div>

                <div class="col-md-6 form-group mb-3">
                  <label>Office Address</label>
                  <textarea
                    v-model="form.office_address"
                    class="form-control"
                  ></textarea>
                </div>
              </div>
            </tab-content>

            <tab-content
              title="Relationship Details"
              icon="fas fa-user-friends"
            >
              <b-card no-body>
                <b-card-body>
                  <div class="row">
                    <div class="col-md-6 form-group mb-3">
                      <label>Marital Status</label>
                      <select
                        v-model="form.marital_status"
                        class="form-control"
                        required
                      >
                        <option value="null">-- Select --</option>
                        <option
                          v-for="option in marital_status"
                          :value="option.value"
                          :key="option.value"
                        >
                          {{ option.text }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-6 form-group mb-3">
                      <label>Spouse Name</label>
                      <input
                        v-model="form.spouse_name"
                        type="text"
                        class="form-control"
                      />
                    </div>

                    <div class="col-md-12 form-group mb-3">
                      <label>Children (If any)</label>
                      <textarea
                        v-model="form.children"
                        class="form-control"
                      ></textarea>
                    </div>

                    <div class="col-md-6 form-group mb-3">
                      <label>Next of Kin {{ form.kin_name }}</label>
                      <input
                        v-model="form.kin_name"
                        type="text"
                        class="form-control"
                        required
                      />
                    </div>

                    <div class="col-md-6 form-group mb-3">
                      <label>Next of Kin Relationship</label>
                      <input
                        v-model="form.kin_relationship"
                        type="text"
                        class="form-control"
                        required
                      />
                    </div>

                    <div class="col-md-6 form-group mb-3">
                      <label>KIN Phone Number 1</label>
                      <input
                        v-model="form.kin_phone_1"
                        type="tel"
                        required
                        class="form-control"
                      />
                    </div>

                    <div class="col-md-6 form-group mb-3">
                      <label>KIN Phone Number (Alt)</label>
                      <input
                        v-model="form.kin_phone_2"
                        type="tel"
                        class="form-control"
                      />
                    </div>

                    <div class="col-md-12 form-group mb-3">
                      <label>Next of Kin Address</label>
                      <textarea
                        v-model="form.kin_address"
                        required
                        class="form-control"
                      ></textarea>
                    </div>
                  </div>
                </b-card-body>
              </b-card>
            </tab-content>

            <tab-content
              title="Additional Information"
              icon="fas fa-people-carry"
            >
              <b-card no-body>
                <b-card-body>
                  <div class="row">
                    <div class="col-md-6 form-group mb-3">
                      <label>First Sponsor</label>
                      <input
                        v-model="form.sponsor_1"
                        type="text"
                        class="form-control"
                      />
                    </div>

                    <div class="col-md-6 form-group mb-3">
                      <label>Second Sponsor</label>
                      <input
                        v-model="form.sponsor_2"
                        type="text"
                        class="form-control"
                      />
                    </div>

                    <!--<div class="col-md-6 form-group mb-3">
                                        <label>Beneficiary Name</label>
                                        <input v-model="form.beneficiary_name" type="text" required class="form-control">
                                    </div>

                                    <div class="col-md-6 form-group mb-3">
                                        <label>Beneficiary Relationship</label>
                                        <input v-model="form.beneficiary_relationship" type="text" required class="form-control">
                                    </div>

                                    <div class="col-md-6 form-group mb-3">
                                        <label>Beneficiary Phone Number 1</label>
                                        <input v-model="form.beneficiary_phone_1" type="tel" required  class="form-control">
                                    </div>

                                    <div class="col-md-6 form-group mb-3">
                                        <label>Beneficiary Phone Number (Alt)</label>
                                        <input v-model="form.beneficiary_phone_2" type="tel" class="form-control">
                                    </div>

                                    <div class="col-md-12 form-group mb-3">
                                        <label>Beneficiary Address</label>
                                        <textarea v-model="form.beneficiary_address" required class="form-control"></textarea>
                                    </div>-->
                  </div>
                </b-card-body>
              </b-card>
            </tab-content>

            <tab-content title="Member Sections" icon="fa fa-check">
              <div class="row">
                <div
                  class="col-md-3"
                  v-for="section in sections"
                  :key="section.id"
                >
                  <div class="m-1">
                    <input
                      type="checkbox"
                      v-model="form.sections"
                      :value="section.id"
                      number
                    />
                    {{ section.name }}
                  </div>
                </div>
              </div>
            </tab-content>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { axiosUrl } from "@/env";
import { ref, reactive, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useAuthStore } from "@/store/authStore";
import {
  formatDate,
  formatPrice,
  swalErrorHandle,
  swalSuccessHandle,
} from "@/components/myHelperFunction";
import Swal from "sweetalert2";
// import router from "@/router";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const isLoading2 = ref(false);
const editMode = ref(false);
const authStore = useAuthStore();
const loggedInUser = authStore.loggedInUser;
const items = ref([]);
const types = ref([]);
const sections = ref([]);
const states = ref([]);
const selected = ref([]);
const selectAll = ref("");
const currentEditID = ref();
const lgas = ref([]); // Define reactive reference for lgas
const lgah = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const gender = ref([
  { value: null, text: "Select Gender" },
  { value: "male", text: "Male" },
  { value: "female", text: "Female" },
]);

const marital_status = ref([
  { value: null, text: "--Select--" },
  { value: "Single", text: "Single" },
  { value: "Married", text: "Married" },
  { value: "Widow", text: "Widow" },
  { value: "Widower", text: "Widower" },
  { value: "Divorced", text: "Divorced" },
]);

const level = ref([
  { value: null, text: "--Select--" },
  { value: "High School", text: "High School" },
  { value: "University", text: "University" },
]);

const degree = ref([
  { value: null, text: "--Select--" },
  { value: "BSc", text: "BSc" },
  { value: "MSc", text: "MSc" },
  { value: "MBA", text: "MBA" },
  { value: "PhD", text: "PhD" },
  { value: "Others", text: "Others" },
]);

const form = ref({
  id: "",
  first_name: "",
  last_name: "",
  middle_name: "",
  email: "",
  phone_1: "",
  phone_2: "",
  address: "",
  state: null,
  city: null,
  city_resident: null,
  office_address: "",
  credit_unit: "",
  c_person: "",
  member_type: null,
  card_numbers: [],
  entrance_date: "",
  image: "",
  gender: null,
  dob: "",
  state_of_origin: null,
  lga: null,
  home_town: "",
  country: "Nigeria",
  marital_status: null,
  children: "",
  spouse_name: "",
  kin_name: "",
  kin_addres: "",
  kin_relationship: "Father",
  kin_phone_1: "",
  kin_phone_2: "",
  beneficiary_name: "",
  beneficiary_addres: "",
  beneficiary_relationship: "Father",
  beneficiary_phone_1: "",
  beneficiary_phone_2: "",
  sponsor_1: "",
  sponsor_2: "",
  educationItems: [],
  sections: [],
  membership_id: "",
});

const toggleAll = () => {
  if (selectAll.value)
    for (let i = 0; i < items.value.length; i++)
      selected.value.push(items.value[i].id);
  else selected.value = [];
};

const getType = async () => {
  await axiosUrl
    .get("/members/types/all")
    .then((response) => {
      types.value = response.data.data;
    })
    .catch((error) => {});
};

const getSection = async () => {
  await axiosUrl
    .get("/sections")
    .then((response) => {
      sections.value = response.data.data;
    })
    .catch((error) => {});
};

const getStates = async () => {
  await axiosUrl
    .get("/states")
    .then((response) => {
      states.value = response.data;
    })
    .catch((error) => {});
};

const onChange = async (event) => {
  let id = event.target.value;
  await axiosUrl.get("/lga/" + id).then(({ data }) => {
    lgas.value = data; // Update lgas using ref
  });
};

const onChangeState = async (event) => {
  let id = event.target.value;
  await axiosUrl.get("/lga/" + id).then(({ data }) => {
    lgah.value = data; // Update lgah using ref
  });
};

const uploadImage = (e) => {
  let file = e.target.files[0];
  let reader = new FileReader();
  if (file["size"] < 8388608) {
    reader.onloadend = () => {
      form.value.image = reader.result; // Update form.image using ref
      console.log(form.value.image);
    };
    reader.readAsDataURL(file);
  } else {
    Swal(
      "Failed!",
      "Oops, You are uploading a large file, try again. Upload file less than 8MB",
      "warning"
    );
  }
};

const createUser = async () => {
  // console.log(form.value)
  isLoading.value = true;

  if (route.query.edit === "true") {
    await axiosUrl
      .post("members/edit/" + route.query.id, form.value)
      .then((response) => {
        isLoading.value = false;
        swalSuccessHandle("Member Created Successful.");
        router.push({
          path: "/members/view/" + response.data.data.membership_id,
        });
      })
      .catch(() => {
        isLoading.value = false;
        Swal.fire(
          "Failed!",
          "Ops, Something went wrong, try again. Likely that you need to fill all the inputs",
          "warning"
        );
      });
  } else {
    await axiosUrl
      .post("members", form.value)
      .then((response) => {
        isLoading.value = false;
        swalSuccessHandle("Member Created Successful.");
        router.push({
          path: "/members/view/" + response.data.data.membership_id,
        });
      })
      .catch(() => {
        isLoading.value = false;
        Swal.fire(
          "Failed!",
          "Ops, Something went wrong, try again. Likely that you need to fill all the inputs",
          "warning"
        );
      });
  }
};

const getMember = async (id) => {
  isLoading2.value = true;

  await axiosUrl
    .get("/members/" + id)
    .then((response) => {
      
      form.value = response.data.data[0].member;
      form.value["kin_address"] = response.data.data[0].additional.kin_address;
      form.value["kin_name"] = response.data.data[0].additional.kin_name;
      form.value["kin_phone_1"] = response.data.data[0].additional.kin_phone_1;
      form.value["kin_phone_2"] = response.data.data[0].additional.kin_phone_2;
      form.value["kin_relationship"] = response.data.data[0].additional.kin_relationship;
      form.value["sponsor_1"] = response.data.data[0].additional.sponsor_1;
      form.value["sponsor_2"] = response.data.data[0].additional.sponsor_2;

      onChange()
      // additional.value = response.data.data[0].additional;
      // wallet.value = response.data.data[0].wallet;
      // totalDebt.value = response.data.data[0].totalDebt;

      // payments.value = response.data.data[0].payments;
      // debts.value = response.data.data[0].debts;
      isLoading2.value = false;
    })
    .catch((error) => {
      isLoading2.value = false;
    });
};

onMounted(() => {
  try {
    if (route.query.edit === "true") {
      getMember(route.query.id);
    }
    isLoading.value = true;
    getType();
    getSection();
    getStates();
    // isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    Swal.fire("Failed!", "Its not your fault, try again.", "warning");
  }
});
</script>

<style scoped>
</style>