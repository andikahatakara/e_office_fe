import { DepartmentWithSub } from "@/types/departmentType";
import http from ".";

const getDepartments = async (url = "departments") =>
	await http<DepartmentWithSub[]>({ url });

export { getDepartments };
