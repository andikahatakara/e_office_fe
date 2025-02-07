import { IRole } from "@/types/roleType";

const hasRole = (roles: IRole[], role: string): boolean => {
	const hasRole = roles.find(({ name }) => name === role);

	return hasRole ? true : false;
};

export { hasRole };
