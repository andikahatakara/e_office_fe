import { RoleHasPermission } from "@/types/roleType";

const checkRoleHasUser = (userId: number, role?: RoleHasPermission) => {
	if (!role) {
		return false;
	}

	const find = role.role.users.find((user) => user.id === userId);

	return find ? true : false;
};

export { checkRoleHasUser };
