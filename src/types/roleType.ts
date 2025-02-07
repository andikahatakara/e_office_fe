import { Actions } from "./globalType";
import { IUser } from "./userType";

interface IRole {
	id: number;
	guard_name: string;
	name: string;
	title: string;
	actions: Actions;
	created_at: string;
	updated_at: string;
}

interface Permission {
	id: number;
	guard_name: string;
	name: string;
	title: string;
	actions: Actions;
	created_at: string;
	updated_at: string;
}

type RoleAndPermissionRequest = {
	title: string;
	name: string;
};

interface RoleWithUser extends IRole {
	users: IUser[];
}

interface RoleHasPermission {
	role: RoleWithUser;
	hasPermissions: Record<string, boolean>;
}

export type { IRole, Permission, RoleAndPermissionRequest, RoleHasPermission };
