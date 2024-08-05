<template>
  <div class="content-wrapper">
    <loading :active="isLoading || isLoading2" />

    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h2>
          <strong v-if="!editMode">New Member</strong>
          <strong v-if="editMode">Update Member</strong>
        </h2>
      </div>
      <div class="card mt-2">
        <div class="card-body">
          <form-wizard @on-complete="editMode ? createUser() : createUser()">
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
                  <Calendar v-model="form.entrance_date" />
                </div>

                <div class="col-md-4 form-group mb-3">
                  <label
                    >Member's Types
                    <MiniSpinner v-if="typesLoader" />
                  </label>
                  <div>
                    <Dropdown
                      class="w-100"
                      v-model="form.member_type"
                      optionLabel="title"
                      optionValue="id"
                      :options="types"
                      placeholder=""
                    />
                  </div>
                </div>

                <div class="col-md-3 form-group mb-3">
                  <label
                    >Photo Image
                    <a
                      v-if="form.image && editMode"
                      :href="form.image"
                      target="_blank"
                      class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                      style="font-size: 14px"
                      >Click</a
                    ></label
                  >
                  <input
                    type="file"
                    @change="uploadImage"
                    accept="image/*"
                    name="image"
                    class="form-control"
                  />
                </div>

                <div class="col-md-3 form-group mb-3">
                  <label>Date of Birth</label>
                  <Calendar v-model="form.dob" />
                </div>

                <div class="col-md-3">
                  <label>Gender</label>
                  <div>
                    <Dropdown
                      class="w-100"
                      v-model="form.gender"
                      optionLabel="text"
                      optionValue="value"
                      :options="gender"
                      placeholder=""
                    />
                  </div>
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
                    class="form-control"
                    type="text"
                    name="phone_1"
                    v-model="form.phone_1"
                    maxlength="11"
                    @input="handleInput($error)"
                    placeholder=""
                  />
                </div>

                <div class="col-md-3 form-group mb-3">
                  <label>Phone Number (Alt)</label>
                  <input
                    class="form-control"
                    type="text"
                    name="phone_2"
                    v-model="form.phone_2"
                    maxlength="11"
                    @input="handleInput2($error)"
                    placeholder=""
                  />
                </div>

                <div class="col-md-3">
                  <label
                    >State of Origin
                    <MiniSpinner v-if="inputLoader3" />
                  </label>
                  <div>
                    <Dropdown
                      @change="onChange(form.state_of_origin)"
                      class="w-100"
                      v-model="form.state_of_origin"
                      optionLabel="title"
                      optionValue="id"
                      :options="states"
                      :disabled="inputLoader3 || states.length === 0"
                      placeholder=""
                    />
                  </div>
                </div>

                <div class="col-md-3">
                  <label
                    >LGA of Origin
                    <MiniSpinner v-if="inputLoader1" />
                  </label>
                  <div>
                    <Dropdown
                      class="w-100"
                      v-model="form.lga"
                      optionLabel="name"
                      optionValue="id"
                      :options="lgas"
                      :disabled="inputLoader1 || lgas.length === 0"
                      placeholder=""
                    />
                  </div>
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
                  <label>
                    State of Residence
                    <MiniSpinner v-if="inputLoader3" />
                  </label>
                  <div>
                    <Dropdown
                      @change="onChangeState(form.state)"
                      class="w-100"
                      v-model="form.state"
                      optionLabel="title"
                      optionValue="id"
                      :options="states"
                      :disabled="inputLoader3 || states.length === 0"
                      placeholder=""
                    />
                  </div>
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

                <!-- <div class="col-md-3">
                  <label>City of Residence</label>
                  <select v-model="form.city" class="form-control" required>
                    <option value="null">-- Select LGA --</option>
                    <option
                      v-for="option in lgah"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{ option.name }}
                    </option>
                  </select>
                </div> -->

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
              <div class="row">
                <div class="col-md-6 form-group mb-3">
                  <label>Marital Status</label>
                  <div>
                    <Dropdown
                      class="w-100"
                      v-model="form.marital_status"
                      optionLabel="text"
                      optionValue="value"
                      :options="marital_status"
                      :disabled="marital_status.length === 0"
                      placeholder=""
                    />
                  </div>
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
                    class="form-control"
                    type="text"
                    name="kin_phone_1"
                    v-model="form.kin_phone_1"
                    maxlength="11"
                    @input="handleInput3($error)"
                    placeholder=""
                  />
                </div>

                <div class="col-md-6 form-group mb-3">
                  <label>KIN Phone Number (Alt)</label>
                  <input
                    class="form-control"
                    type="text"
                    name="kin_phone_2"
                    v-model="form.kin_phone_2"
                    maxlength="11"
                    @input="handleInput4($error)"
                    placeholder=""
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
            </tab-content>

            <tab-content
              title="Additional Information"
              icon="fas fa-people-carry"
            >
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

                <!-- <div class="col-md-6 form-group mb-3">
                  <label>Beneficiary Name</label>
                  <input
                    v-model="form.beneficiary_name"
                    type="text"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-6 form-group mb-3">
                  <label>Beneficiary Relationship</label>
                  <input
                    v-model="form.beneficiary_relationship"
                    type="text"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-6 form-group mb-3">
                  <label>Beneficiary Phone Number 1</label>
                  <input
                    v-model="form.beneficiary_phone_1"
                    type="tel"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-6 form-group mb-3">
                  <label>Beneficiary Phone Number (Alt)</label>
                  <input
                    v-model="form.beneficiary_phone_2"
                    type="tel"
                    class="form-control"
                  />
                </div>

                <div class="col-md-12 form-group mb-3">
                  <label>Beneficiary Address</label>
                  <textarea
                    v-model="form.beneficiary_address"
                    required
                    class="form-control"
                  ></textarea>
                </div> -->
              </div>
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

            <tab-content title="Entrance Card" icon="fa fa-id-card">
              <div class="row">
                <div class="col-12 form-group mb-3">
                  <label>Card Number</label>
                  <input
                    v-model="form.card_number"
                    type="number"
                    class="form-control"
                  />
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
  formatDate2,
  formatPrice,
  swalErrorHandle,
  swalSuccessHandle,
} from "@/components/myHelperFunction";
import Swal from "sweetalert2";
// import router from "@/router";
import { useRoute, useRouter } from "vue-router";
import MiniSpinner from "@/components/MiniSpinner.vue";

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const isLoading2 = ref(false);
const inputLoader1 = ref(false);
const inputLoader2 = ref(false);
const inputLoader3 = ref(false);
const typesLoader = ref(false);
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
  // { value: null, text: "Select Gender" },
  { value: "male", text: "Male" },
  { value: "female", text: "Female" },
]);

const marital_status = ref([
  // { value: null, text: "--Select--" },
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
  card_number: null,
});

const handleInput = (event) => {
  // Remove non-digit characters
  form.value.phone_1 = event.target.value.replace(/\D/g, "").slice(0, 11);
};

const handleInput2 = (event) => {
  // Remove non-digit characters
  form.value.phone_2 = event.target.value.replace(/\D/g, "").slice(0, 11);
};

const handleInput3 = (event) => {
  // Remove non-digit characters
  form.value.kin_phone_1 = event.target.value.replace(/\D/g, "").slice(0, 11);
};

const handleInput4 = (event) => {
  // Remove non-digit characters
  form.value.kin_phone_2 = event.target.value.replace(/\D/g, "").slice(0, 11);
};

const getType = async () => {
  typesLoader.value = true;
  await axiosUrl
    .get("/members/types/all")
    .then((response) => {
      types.value = response.data.data;
      typesLoader.value = false;
    })
    .catch((error) => {
      swalErrorHandle(error);
      typesLoader.value = false;
    });
};

const getSection = async () => {
  await axiosUrl
    .get("/sections")
    .then((response) => {
      sections.value = response.data.data;
    })
    .catch((error) => {
      swalErrorHandle(error);
    });
};

const getStates = async () => {
  inputLoader3.value = true;

  await axiosUrl
    .get("/states")
    .then((response) => {
      states.value = response.data;

      if (editMode.value) {
        if (typeof form.value["lga"] === "string")
          onChange(parseInt(form.value["lga"]));
      }
      inputLoader3.value = false;
    })
    .catch((error) => {
      inputLoader3.value = false;
      swalErrorHandle(error);
    });
};

const onChange = async (id) => {
  if (id === null || id === undefined) return;
  inputLoader1.value = true;
  await axiosUrl
    .get("/lga/" + id)
    .then(({ data }) => {
      lgas.value = data; // Update lgas using ref
      inputLoader1.value = false;
    })
    .catch((error) => {
      inputLoader1.value = false;
      swalErrorHandle(error);
    });
};

const onChangeState = async (id) => {
  if (id === null || id === undefined) return;
  inputLoader2.value = true;
  await axiosUrl
    .get("/lga/" + id)
    .then(({ data }) => {
      lgah.value = data; // Update lgah using ref
      inputLoader2.value = false;
    })
    .catch((error) => {
      inputLoader2.value = false;
      swalErrorHandle(error);
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
  console.log(form.value);
  isLoading.value = true;

  form.value["entrance_date"] = formatDate2(form.value["entrance_date"]);
  form.value["dob"] = formatDate2(form.value["dob"]);

  if (editMode.value) {
    await axiosUrl
      .post("members/edit", form.value)
      .then((response) => {
        isLoading.value = false;
        // swalSuccessHandle("Member Created Successful.");
        router.push({
          path: "/members/view/",
          query: { id: response.data.data.membership_id },
        });
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  } else {
    await axiosUrl
      .post("members", form.value)
      .then((response) => {
        isLoading.value = false;
        // swalSuccessHandle("Member Created Successful.");
        router.push({
          path: "/members/view/",
          query: { id: response.data.data.membership_id },
        });
      })
      .catch((error) => {
        isLoading.value = false;
        swalErrorHandle(error);
      });
  }
};

const getMember = async (id) => {
  isLoading2.value = true;

  await axiosUrl
    .get("/members/view?member=" + id)
    // .get("/members/" + id)
    .then((response) => {
      let data = response.data.data[0];
      form.value = data?.member;

      form.value["id"] = data?.member?.id;
      form.value["kin_address"] = data?.additional?.kin_address;
      form.value["kin_name"] = data?.additional?.kin_name;
      form.value["kin_phone_1"] = data?.additional?.kin_phone_1;
      form.value["kin_phone_2"] = data?.additional?.kin_phone_2;
      form.value["kin_relationship"] = data?.additional?.kin_relationship;
      form.value["sponsor_1"] = data?.additional?.sponsor_1;
      form.value["sponsor_2"] = data?.additional?.sponsor_2;
      form.value["sections"] = [];

      if (typeof data?.member?.member_type === "string")
        form.value["member_type"] = parseInt(data?.member?.member_type);

      onChange(data?.member?.state_of_origin);

      // additional.value = data?.additional;
      // wallet.value = data?.wallet;
      // totalDebt.value = data?.totalDebt;

      // payments.value = data?.payments;
      // debts.value = data?.debts;
      isLoading2.value = false;
    })
    .catch((error) => {
      isLoading2.value = false;
      swalErrorHandle(error);
      // Swal.fire("Failed!", "Its not your fault, try again.", "warning");
    });
};

onMounted(() => {
  if (route.query.edit === "true") {
    getMember(route.query.id);
    editMode.value = true;
  }
  getType();
  getSection();
  getStates();
});
</script>

<style>
.p-calendar {
  width: 100% !important;
}

.p-inputtext {
  padding: 6px 12px !important;
}
</style>