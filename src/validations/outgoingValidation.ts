import { object, string, mixed } from "yup";
import rules from "./rules.json";
import dayjs from "dayjs";

const outgoingSchema = object().shape({
	about: string().required(rules.required),
	number: string().required(rules.required),
	date: string().default(dayjs().format("YYYY-MM-DD")).required(rules.required),
	characteristic: string().required(rules.required),
	type: string().default("create"),
	file: mixed().when("type", {
		is: (value: string) => (value === "create" ? true : false),
		then: () => mixed().required(rules.required),
	}),
});

export { outgoingSchema };
