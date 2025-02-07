import { Employee } from "./employeeType";
import { IncomingLetter } from "./letterType";

type DispositionRequest = {
	department_id: string | number;
	note: null | string;
};

interface Disposition {
	id: number;
	employee_to: Employee;
	read_at?: string;
}

interface DispositionDetail {
	id: number;
	incoming: IncomingLetter;
	employee_to: Employee;
}

export type { DispositionRequest, Disposition, DispositionDetail };
