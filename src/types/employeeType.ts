import { Department, SubDepartment } from "./departmentType";
import { Actions } from "./globalType";
import type { IUser } from "./userType";

type Employee = {
	user: IUser;
	employeeable: Department | SubDepartment;
	is_head: boolean;
	actions: Actions;
};

type EmployeeRequest = {
	first_name: string;
	last_name: string;
	email: string;
	nip: string;
	department_id: string;
	position: string;
};

export type { Employee, EmployeeRequest };
