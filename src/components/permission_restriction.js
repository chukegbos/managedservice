import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
const allRoles = authStore.allRoles;
const loggedInUser = authStore.loggedInUser;

export const canCreate = () => {
	const permissions = allRoles[loggedInUser.role_id]["permissions"];

	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Create"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};

export const canRead = () => {
	const permissions = allRoles[loggedInUser.role_id]["permissions"];

	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Read"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};

export const canUpdate = () => {
	const permissions = allRoles[loggedInUser.role_id]["permissions"];

	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Update"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};

export const canDelete = () => {
	const permissions = allRoles[loggedInUser.role_id]["permissions"];

	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Delete"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};

export const canApprove = () => {
	const permissions = allRoles[loggedInUser.role_id]["permissions"];

	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Approve"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};

export const canReject = () => {
	const permissions = allRoles[loggedInUser.role_id]["permissions"];

	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Reject"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};
