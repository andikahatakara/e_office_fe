import { object, string } from "yup";
import rules from "./rules.json";

const storeDispositionSchema = object().shape({
	department_id: string().required(rules.required),
	note: string().nullable(),
});

export { storeDispositionSchema };
