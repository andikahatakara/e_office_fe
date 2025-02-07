import { object, string, boolean } from "yup";
import rules from "./rules.json";

const loginSchema = object().shape({
	email: string().email(rules.email).required(rules.required),
	password: string().required(rules.required),
	remember: boolean().default(false).nullable(),
});

export { loginSchema };
