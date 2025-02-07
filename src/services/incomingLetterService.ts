import { DetailIncomingLetter, IncomingLetter, IncomingRequest } from "@/types/letterType";
import http from ".";
import { Department, HeadOfDepartment } from "@/types/departmentType";

const getIncomingLetters = async (url = "incoming_letters") =>
	await http<IncomingLetter[]>({ url });

const getIncoming = async (url: string, serverToken?: string) =>
	await http<DetailIncomingLetter>({ url, serverToken });

const storeIncomingLetter = async (data: object) =>
	await http<IncomingLetter>({
		url: `incoming_letters`,
		method: "POST",
		data,
		asFormData: true,
	});

const updateIncomingLetter = async (data: object, id: number) =>
	await http<boolean>({
		url: `incoming_letters/${id}`,
		method: "POST",
		data,
		asFormData: true,
		params: {
			_method: "PUT",
		},
	});

const getDepartmentLists = async () => {
	return http<HeadOfDepartment[]>({
		url: "incoming_letters/department-lists",
	});
};

export {
	getIncomingLetters,
	getIncoming,
	storeIncomingLetter,
	updateIncomingLetter,
	getDepartmentLists,
};
