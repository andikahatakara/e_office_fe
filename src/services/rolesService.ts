import {
	IRole,
	RoleAndPermissionRequest,
	RoleHasPermission,
} from "@/types/roleType";
import http from ".";

const getRoles = async (url = "roles") => await http<IRole[]>({ url });
const getRole = async (url: string) => await http<RoleHasPermission>({ url });
const syncRoleAndPermissionService = async (
	role: string | number,
	permission: string | number
) =>
	await http<boolean>({
		url: `roles/${role}/permissions/${permission}`,
		method: "PUT",
	});

const storeRole = async (data: RoleAndPermissionRequest) =>
	await http<IRole>({
		url: `roles`,
		method: "POST",
		data,
	});

const updateRole = async (
	id: string | number,
	data: RoleAndPermissionRequest
) =>
	await http<boolean>({
		url: `roles/${id}`,
		method: "PUT",
		data,
	});

const syncRoleAndUserService = async (
	role: string | number,
	user: string | number
) =>
	await http<boolean>({
		url: `roles/${role}/users/${user}`,
		method: "PUT",
	});

export {
	getRoles,
	getRole,
	syncRoleAndPermissionService,
	storeRole,
	updateRole,
	syncRoleAndUserService,
};
