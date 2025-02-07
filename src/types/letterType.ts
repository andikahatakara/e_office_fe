import { Disposition } from "./dispositionType";
import { Employee } from "./employeeType";
import { Actions } from "./globalType";
import { IUser } from "./userType";

interface IncomingLetter {
	id: number;
	employee: Employee;
	by: IUser;
	from: string;
	number: string;
	date: string;
	about: string;
	characteristic: string;
	file_url: string;
	actions: Actions;
	created_at: string;
	updated_at: string;
}

interface DetailIncomingLetter extends IncomingLetter {
	dispositions: Disposition[];
}

type IncomingRequest = {
	to: string;
	from: string;
	number: string;
	date: string;
	about: string;
	characteristic: string;
	file: File;
	type?: string;
};

type OutgoingLetter = {
	id: number;
	number: string;
	date: string;
	about: string;
	characteristic: string;
	file: string;
	file_url: string;
	actions: Actions;
	created_at: string;
	updated_at: string;
};

type OutgoingRequest = Omit<IncomingRequest, "to" | "from">;

export type {
	IncomingLetter,
	IncomingRequest,
	OutgoingLetter,
	OutgoingRequest,
	DetailIncomingLetter,
};
