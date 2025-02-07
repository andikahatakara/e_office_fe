import { object, string } from "yup";
import rules from "./rules.json";

const employeeRequestSchema = object().shape({
	first_name: string().required(rules.required),
	last_name: string().required(rules.required),
	email: string().required(rules.required).email(rules.email),
	nip: string().required(rules.required),
	department_id: string().when("position", {
		is: (value: string) => (value ? true : false),
		then: () => string().required(rules.required),
	}),
	sub_id: string().nullable(),
	position: string().required(rules.required),
});

export { employeeRequestSchema };
