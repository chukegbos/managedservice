import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
const allRoles = authStore.allRoles;
const loggedInUser = authStore.loggedInUser;

export const canCreate = () => {
	const role = allRoles.find(role => role.id == loggedInUser.role_id);
	const permissions = role["permissions"];
	
	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Create"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};

export const canRead = () => {
	const role = allRoles.find(role => role.id == loggedInUser.role_id);
	const permissions = role["permissions"];

	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Read"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};

export const canUpdate = () => {
	const role = allRoles.find(role => role.id == loggedInUser.role_id);
	const permissions = role["permissions"];
	// console.log(permissions)
	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Update"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};

export const canDelete = () => {
	const role = allRoles.find(role => role.id == loggedInUser.role_id);
	const permissions = role["permissions"];

	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Delete"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};

export const canApprove = () => {
	const role = allRoles.find(role => role.id == loggedInUser.role_id);
	const permissions = role["permissions"];

	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Approve"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};

export const canAccept = () => {
	const role = allRoles.find(role => role.id == loggedInUser.role_id);
	const permissions = role["permissions"];

	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Accept"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};

export const canReject = () => {
	const role = allRoles.find(role => role.id == loggedInUser.role_id);
	const permissions = role["permissions"];

	// Find the permission object with the name 'Create'
	const createPermission = permissions.find(
		(permission) => permission.name === "Reject"
	);

	// Return true if 'Create' is found, otherwise false
	return createPermission ? true : false;
};
