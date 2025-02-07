import { DepartmentWithSub } from "@/types/departmentType";
import { Employee } from "@/types/employeeType";
import http from ".";

const getEmployees = async (url = "employees") =>
	await http<Employee[]>({
		url,
	});

const getEmployee = async (url: string) => await http<Employee>({ url });

const storeEmployee = async (data: object) =>
	await http<Employee>({ url: `employees`, method: "POST", data });

const updateEmployee = async (id: number | string, data: object) =>
	await http<Employee>({ url: `employees/${id}`, method: "PUT", data });

const deleteEmployee = async (id: number | string) =>
	await http<Employee>({ url: `employees/${id}`, method: "DELETE" });

const employeeDepartments = async (params?: object) =>
	await http<DepartmentWithSub[]>({
		url: "employees/departments",
		params,
	});

const employeeGetHead = async (url = "employees/head") =>
	await http<Employee[]>({ url });

export {
	getEmployees,
	getEmployee,
	storeEmployee,
	updateEmployee,
	deleteEmployee,
	employeeDepartments,
	employeeGetHead,
};
