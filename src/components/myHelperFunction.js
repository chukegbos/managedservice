import moment from "moment";
import Swal from "sweetalert2";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
const allRoles = authStore.allRoles;
const loggedInUser = authStore.loggedInUser;

export const canCreate = () => {
    const permissions = allRoles[loggedInUser.role_id]['permissions'];

    // Find the permission object with the name 'Create'
    const createPermission = permissions.find(permission => permission.name === 'Create');

    // Return true if 'Create' is found, otherwise false
    return createPermission ? true : false;
};

export const canRead = () => {
    const permissions = allRoles[loggedInUser.role_id]['permissions'];

    // Find the permission object with the name 'Create'
    const createPermission = permissions.find(permission => permission.name === 'Read');

    // Return true if 'Create' is found, otherwise false
    return createPermission ? true : false;
};

export const canUpdate = () => {
    const permissions = allRoles[loggedInUser.role_id]['permissions'];

    // Find the permission object with the name 'Create'
    const createPermission = permissions.find(permission => permission.name === 'Update');

    // Return true if 'Create' is found, otherwise false
    return createPermission ? true : false;
};

export const canDelete = () => {
    const permissions = allRoles[loggedInUser.role_id]['permissions'];

    // Find the permission object with the name 'Create'
    const createPermission = permissions.find(permission => permission.name === 'Delete');

    // Return true if 'Create' is found, otherwise false
    return createPermission ? true : false;
};

export const canApprove = () => {
    const permissions = allRoles[loggedInUser.role_id]['permissions'];

    // Find the permission object with the name 'Create'
    const createPermission = permissions.find(permission => permission.name === 'Approve');

    // Return true if 'Create' is found, otherwise false
    return createPermission ? true : false;
};

export const canReject = () => {
    const permissions = allRoles[loggedInUser.role_id]['permissions'];

    // Find the permission object with the name 'Create'
    const createPermission = permissions.find(permission => permission.name === 'Reject');

    // Return true if 'Create' is found, otherwise false
    return createPermission ? true : false;
};

export const findEmptyKeys = (obj) => {
	return Object.keys(obj).find(
		(key) => obj[key] === null || obj[key] === "" || obj[key] === undefined
	);
};

export const formatPayloadErrorKey = (key) => {
	let name = "";
	switch (key) {
		case "supplier_name":
			name = "Supplier Name";
			break;
		case "contact_person":
			name = "Contact Person";
			break;
		case "email":
			name = "Email";
			break;
		case "phone":
			name = "Phone Number";
			break;
		case "address":
			name = "Address";
			break;
		case "bank_name":
			name = "Bank Name";
			break;
		case "bank_account":
			name = "Account Number";
			break;
		default:
			break;
	}

	return name;
};

export const isObjectEmpty = (obj) => {
	if (obj != undefined) {
		return Object.keys(obj).length === 0;
	} else {
		return true;
	}
};

export const formatDate2 = (value) => {
	if (!isNaN(new Date(value))) return moment(value).format("YYYY-MM-DD");
	else return "N/A";
};

export const formatDate = (value) => {
	if (!isNaN(new Date(value))) return moment(value).format("MMMM Do YYYY");
	// return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");
	else return "N/A";
};

export const formatDay = (value) => {
	if (!isNaN(new Date(value))) return moment(value).format("MMMM Do");
	// return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");
	else return "N/A";
};

export const formatPrice = (value) => {
	let val = (value / 1).toFixed(2).replace(",", ".");
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const swalErrorHandle = (error) => {
	console.log(error.response.data.message);
	if (
		error?.response?.status === 401 ||
		error?.response?.data?.message ===
			'Attempt to read property "club_code" on null'
	) {
		localStorage.clear();
		window.location.href = "/login";
	} else {
		let text = "";
		if (error.code == "ERR_NETWORK") {
			text = error.message;
		} else if (typeof error.response.data.message == "string") {
			text = error.response.data.message;
		} else {
			text = "Check Internet Connection";
		}
		let icon = "error";
		let color = "#F27474";

		let title = "Error!!!";
		Swal.fire({
			title: title,
			text: text,
			icon: icon,
			confirmButtonColor: color,
			confirmButtonText: "Ok!",
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
		});
	}
};

export const swalSuccessHandle = (text) => {
	let icon = "success";
	let color = "green";
	let title = "Success!!!";
	Swal.fire({
		title: title,
		text: text,
		icon: icon,
		confirmButtonColor: color,
		confirmButtonText: "Ok!",
		allowOutsideClick: false,
		allowEscapeKey: false,
		allowEnterKey: false,
	});
};

export const swalHandler = (title, text, icon, confirmButtonColor) => {
	Swal.fire({ title, text, icon, confirmButtonColor });
};

export const swalConfirmDelete = (
	confirmCallback = () => {},
	dismissCallback = () => {}
) => {
	Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
	}).then((result) => {
		if (result.isConfirmed) {
			confirmCallback();
		} else if (result.isDismissed) {
			dismissCallback();
		}
	});
};
