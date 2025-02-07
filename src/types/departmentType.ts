import { Employee } from "@/types/employeeType";
import { Actions } from "./globalType";

interface Department {
	id: number;
	name: string;
	slug: string;
	level: string;
	color: string;
	actions: Actions;
	created_at: string;
	updated_at: string;
}

interface SubDepartment {
	id: number;
	name: string;
	slug: string;
	color: string;
	created_at: string;
	updated_at: string;
}

interface DepartmentWithSub extends Department {
	subs: SubDepartment[];
}

interface HeadOfDepartment extends Department {
	employee: Employee;
}

export type { Department, DepartmentWithSub, SubDepartment, HeadOfDepartment };
