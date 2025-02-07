import rules from "./rules.json";
import { object, string, mixed } from "yup";

const incomingSchema = object().shape({
	about: string().required(rules.required),
	from: string().required(rules.required),
	number: string().required(rules.required),
	date: string().required(rules.required),
	characteristic: string().required(rules.required),
	to: string().required(rules.required),
	type: string().default("create"),
	file: mixed().when("type", {
		is: (value: string) => (value === "create" ? true : false),
		then: () => mixed().required(rules.required),
	}),
});

export { incomingSchema };
