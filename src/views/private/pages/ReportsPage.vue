<template>
	<div class="">
		<loading
			:active="isLoading || isLoading2 || isLoading3 || isLoading4"
		/>

		<div
			class="mx-3 my-2 d-flex justify-content-between align-items-center"
		>
			<h2 class="mb-0">Reports</h2>

			<div>
				<button class="btn btn-primary" @click="openModal()">
					<i class="fa-solid fa-search me-1"></i>Filter
				</button>
			</div>
		</div>

		<div class="mx-3 pb-5" :key="reportsData">
			<table ref="myTable" class="text-start mb-3 shadow">
				<thead class="text-uppercase bg-secondary text-white">
					<tr>
						<th scope="col" class="p-1">Bar</th>
						<th scope="col" class="p-1">Channel</th>
						<th scope="col" class="p-1">Member</th>
						<th scope="col" class="p-1">Mode of Payment</th>
						<th scope="col" class="p-1">Type of Member</th>
						<th scope="col" class="p-1">Steward</th>
					</tr>
				</thead>
				<tbody class="" v-if="!isLoading">
					<tr
						v-for="data in reportsData"
						:key="data"
						class="border-bottom border-secondary-subtle"
					>
						<th
							scope="row"
							class="p-1"
							style="width: 20%; padding: 16px"
						>
							{{
								data["bar"]["name"]
									? data["bar"]["name"]
									: "N/A"
							}}
						</th>
						<td class="p-1" style="width: 15%">
							<span>{{
								data["channel"]["name"]
									? data["channel"]["name"]
									: "N/A"
							}}</span>
						</td>
						<td class="p-1" style="width: 25%">
							{{
								data["member"] !== null
									? data["member"]["first_name"] +
									  " " +
									  data["member"]["last_name"]
									: "N/A"
							}}
						</td>
						<td class="p-1" style="width: 10%">
							{{
								data["mode_of_payment"]
									? data["mode_of_payment"]
									: "N/A"
							}}
						</td>
						<td class="p-1" style="width: 10%">
							{{
								data["type_of_member"]
									? data["type_of_member"]
									: "N/A"
							}}
						</td>
						<td class="p-1" style="width: 20%">
							{{ data["steward"] ? data["steward"] : "N/A" }}
						</td>
					</tr>
				</tbody>
			</table>

			<div v-if="false">
				<!-- <div v-if="!isLoading" class="flex justify-center"> -->
				<button
					:disabled="isDisabledPrev(currentPage) || tableLoading"
					@click="firstPage()"
					:class="{
						'cursor-not-allowed opacity-30':
							isDisabledPrev(currentPage),
					}"
					class="px-4 py-1.5 mr-2 border border-gray-400 text-gray-400 text-xs"
				>
					<font-awesome-icon icon="fa-solid fa-backward-step" />
				</button>
				<button
					:disabled="isDisabledPrev(currentPage) || tableLoading"
					@click="prevPage()"
					:class="{
						'cursor-not-allowed opacity-30':
							isDisabledPrev(currentPage),
					}"
					class="px-4 py-1.5 mx-2 border border-gray-400 text-gray-400 text-xs"
				>
					<font-awesome-icon icon="fa-solid fa-angle-left" />
				</button>
				<button
					class="px-4 py-1.5 mx-2 border text-xs"
					:disabled="tableLoading"
					:class="
						pageNumber == currentPage
							? `border-AccessARMBrown text-AccessARMBrown page-${pageNumber}`
							: `page-${pageNumber} border-gray-400 text-gray-400`
					"
					v-for="pageNumber in paginateNumber.slice(
						paginateStart,
						paginateEnd
					)"
					:key="pageNumber"
					@click="goToPage(pageNumber)"
				>
					{{ pageNumber }}
				</button>
				<button
					:disabled="
						isDisabledNext(currentPage, lastFormPage) ||
						tableLoading ||
						nextPageUrl == null
					"
					@click="nextPage()"
					:class="{
						'cursor-not-allowed opacity-30': isDisabledNext(
							currentPage,
							lastFormPage
						),
					}"
					class="px-4 py-1.5 mx-2 border border-gray-400 text-gray-400 text-xs"
				>
					<font-awesome-icon icon="fa-solid fa-angle-right" />
				</button>
				<button
					:disabled="
						isDisabledNext(currentPage, lastFormPage) ||
						tableLoading ||
						nextPageUrl == null
					"
					@click="lastPage()"
					:class="{
						'cursor-not-allowed opacity-30': isDisabledNext(
							currentPage,
							lastFormPage
						),
					}"
					class="px-4 py-1.5 mx-2 border border-gray-400 text-gray-400 text-xs"
				>
					<font-awesome-icon icon="fa-solid fa-forward-step" />
				</button>
			</div>
		</div>

		<Modal name="section-modal" :title="modalParams.title">
			<ModalContent>
				<form @submit.prevent="getReportData()" class="container">
					<div class="col-12">
						<label class="col-form-label fs-6">Bars</label>
						<select v-model="payload.bar_code" class="form-control">
							<option value="null">-- Select Bar --</option>
							<option
								v-for="bar in bars"
								:key="bar"
								:value="bar.bar_code"
							>
								{{ bar["name"] }}
							</option>
						</select>
					</div>

					<div class="row">
						<div
							:class="
								payload.channel_id === 3 ||
								payload.channel_id === 1
									? 'col-12 col-md-6'
									: 'col-12'
							"
						>
							<label class="col-form-label fs-6">Channel</label>
							<select
								v-model="payload.channel_id"
								class="form-control"
								@change="payload.process_id = null"
							>
								<option value="null">-- Select Type--</option>
								<option
									v-for="data in channels"
									:key="data"
									:value="data.id"
								>
									{{ data["name"] }}
								</option>
							</select>
						</div>
						<div
							:class="
								payload.channel_id === 1
									? 'col-12 col-md-6'
									: 'col-12'
							"
							v-if="payload.channel_id === 1"
						>
							<label class="col-form-label fs-6">POS</label>
							<select
								v-model="payload.process_id"
								class="form-control"
							>
								<option value="null">-- Select Type--</option>
								<option
									v-for="data in pos"
									:key="data"
									:value="data.id"
								>
									{{ data["name"] }}
								</option>
							</select>
						</div>
						<div
							:class="
								payload.channel_id === 3
									? 'col-12 col-md-6'
									: 'col-12'
							"
							v-if="payload.channel_id === 3"
						>
							<label class="col-form-label fs-6">Bank</label>
							<select
								v-model="payload.process_id"
								class="form-control"
							>
								<option value="null">-- Select Type--</option>
								<option
									v-for="data in banks"
									:key="data"
									:value="data.id"
								>
									{{ data["bank_name"] }} -
									{{ data["account_number"] }}
								</option>
							</select>
						</div>
					</div>

					<div class="col-12">
						<label class="col-form-label fs-6">Users</label>
						<select v-model="payload.user_id" class="form-control">
							<option value="null">-- Select User --</option>
							<option
								v-for="user in users"
								:key="user"
								:value="user.id"
							>
								{{ user["username"] }}
							</option>
						</select>
					</div>

					<div class="row">
						<div class="col-12 col-md-6">
							<label class="col-form-label fs-6" for=""
								>Start Date</label
							>
							<input
								type="date"
								class="form-control"
								v-model="payload.start_date"
							/>
						</div>

						<div class="col-12 col-md-6">
							<label class="col-form-label fs-6" for=""
								>End Date</label
							>
							<input
								type="date"
								class="form-control"
								v-model="payload.end_date"
							/>
						</div>
					</div>

					<div>
						<button
							class="btn btn-primary account-btn w-100 my-3"
							type="submit"
						>
							Submit
						</button>
					</div>
				</form>
			</ModalContent>
		</Modal>
	</div>
</template>

<script>
import { axiosUrl } from "@/env";
import { onMounted, ref, reactive } from "vue";
import { Modal, ModalContent, open, close } from "@dimsog/vue-modal";
import { swalErrorHandle } from "@/components/myHelperFunction";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons/js/buttons.colVis";

export default {
	name: "Reports",
	components: { Modal, ModalContent },
	setup() {
		const fileName = "Reports";
		const smsSampleFile = "";
		const reportsData = ref([]);
		const myTable = ref(null);
		const rowsPerPage = ref(null); // Number of rows to display per page
		let currentPage = ref(1); // Current page number
		const lastFormPage = ref(null);
		const totalFormPages = ref(null);
		const paginateNumber = ref([]);
		const paginateStart = ref(0);
		const paginateEnd = ref(3);
		const paginateFrom = ref(0);
		const paginateTo = ref(0);
		const nextPageUrl = ref(null);
		const isLoading = ref(false);
		const isLoading2 = ref(false);
		const isLoading3 = ref(false);
		const isLoading4 = ref(false);
		const tableLoading = ref(false);
		const formattedDateTime = ref("");
		const startDate = ref(null);
		const endDate = ref(null);
		const document_ = ref(null);
		const filter = ref(false);
		const bars = ref([]);
		const pos = ref([]);
		const channels = ref([]);
		const banks = ref([]);
		const users = ref([]);
		const payload = ref({
			bar_code: "",
			channel_id: null,
			process_id: null,
			user_id: null,
			start_date: "",
			end_date: "",
		});
		const modalParams = reactive({
			title: "",
		});

		const openModal = () => {
			modalParams.title = "Filter Records";
			open("section-modal");
		};

		const initDataTable = (
			fileName,
			table,
			sortNum = 0,
			sortHow = "asc"
		) => {
			$(table).DataTable({
				dom: "Bfrtip", // Specify the buttons to be shown
				paging: false,
				buttons: [
					"copy", // Add copy button
					// Add PDF download button
					{
						extend: "pdfHtml5",
						text: "PDF",
						filename: fileName,
						title: fileName,
						customize: function (doc) {
							// Customize the PDF document, if needed
							doc.defaultStyle.fontSize = 12;
						},
					},
					// Add CSV download button
					{
						extend: "csvHtml5",
						text: "CSV",
						filename: fileName, // Replace 'custom_filename' with your desired file name
						title: fileName,
					},
					// Add Excel download button
					{
						extend: "excelHtml5",
						text: "Excel",
						filename: fileName, // Replace 'custom_filename' with your desired file name
						title: fileName,
						customize: function (xlsx) {
							var sheet = xlsx.xl["styles.xml"];
							var tagName = sheet.getElementsByTagName("sz");
							for (let i = 0; i < tagName.length; i++) {
								tagName[i].setAttribute("val", "12");
							}
						},
					},
				],

				language: {
					buttons: {
						copy: "Copy", // Set copy button label
						print: "Print", // Set print button label
					},
				},

				order: [[sortNum, sortHow]],
			});
		};

		const getChannelData = async () => {
			isLoading2.value = true;
			await axiosUrl
				.get("/payments/channels")
				.then((response) => {
					channels.value = response.data.data;
					isLoading2.value = false;
				})
				.catch((error) => {
					isLoading2.value = false;
					swalErrorHandle(error);
				});
		};

		const getPOSData = async () => {
			isLoading3.value = true;
			await axiosUrl
				.get("/payments/pos")
				.then((response) => {
					isLoading3.value = false;
					// console.log(response.data.data);
					pos.value = response.data.data;
				})
				.catch((error) => {
					swalErrorHandle(error);
					isLoading3.value = false;
				});
		};

		const getBankData = async () => {
			isLoading4.value = true;
			await axiosUrl
				.get("/payments/bank")
				.then((response) => {
					isLoading4.value = false;
					// console.log(response.data.data);
					banks.value = response.data.data;
				})
				.catch((error) => {
					swalErrorHandle(error);
					isLoading4.value = false;
				});
		};

		const getReportData = async () => {
			isLoading.value = true;

			await axiosUrl
				.post("/report/sales", payload.value)
				.then((response) => {
					// console.log(response);
					let responseData = response?.data?.data;
					bars.value = responseData.bars;
					users.value = responseData.stewards;
					reportsData.value = responseData.sales;

					isLoading.value = false;
				})
				.catch((error) => {
					isLoading.value = false;
					swalErrorHandle(error);
				});

			setTimeout(() => {
				initDataTable(fileName, myTable.value, 0, "desc");
				let buttons = document.getElementsByClassName("dt-button");

				if (buttons.length > 0) {
					for (let i = 0; i < buttons.length; i++) {
						buttons[i].classList.add(
							"btn",
							"btn-outline-secondary",
							"me-2"
						);
					}
				}
				if (
					document.querySelector("input.form-control.form-control-sm")
				) {
					document
						.querySelector("input.form-control.form-control-sm")
						.classList.remove("form-control-sm");
				}
				if (
					[...document.querySelectorAll("label")].find(
						(l) => l.textContent.trim() === "Search:"
					)
				) {
					[...document.querySelectorAll("label")]
						.find((l) => l.textContent.trim() === "Search:")
						.classList.add("d-none");
				}
				close("section-modal");
			}, 100);
		};

		onMounted(() => {
			getReportData();
			getChannelData();
			getPOSData();
			getBankData();
		});

		return {
			fileName,
			smsSampleFile,
			reportsData,
			myTable,
			rowsPerPage,
			currentPage,
			lastFormPage,
			totalFormPages,
			paginateNumber,
			paginateStart,
			paginateEnd,
			paginateFrom,
			paginateTo,
			nextPageUrl,
			isLoading,
			isLoading2,
			isLoading3,
			isLoading4,
			tableLoading,
			formattedDateTime,
			startDate,
			endDate,
			document_,
			filter,
			modalParams,
			payload,
			bars,
			users,
			pos,
			banks,
			channels,
			openModal,
			getReportData,
		};
	},
};
</script>

<style scoped>
@import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
</style>

<style>
.dt-search {
	float: right;
}
.dt-buttons {
	float: left;
}
.dt-buttons,
.dt-search {
	height: 70px;
	display: flex;
	align-items: center;
}
</style>
