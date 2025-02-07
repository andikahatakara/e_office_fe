import { Permission } from "@/types/roleType";
import http from ".";

const getPermissions = async (url = "permissions") =>
	await http<Permission[]>({ url });

const getPermissionByName = async (name: string) =>
	await http<Permission>({ url: `permissions/${name}` });

const storePermission = async (data: object) =>
	await http<Permission>({ url: "permissions", method: "POST", data });

const updatePermission = async (id: string | number, data: object) =>
	await http<boolean>({ url: `permissions/${id}`, method: "PUT", data });

const deletePermission = async (id: string | number) =>
	await http<boolean>({ url: `permissions/${id}`, method: "DELETE" });

export {
	getPermissions,
	getPermissionByName,
	storePermission,
	updatePermission,
	deletePermission,
};
