import { object, string, number, ref } from "yup";
import rules from "./rules.json";

const changePersonalSchema = object().shape({
	first_name: string().required(rules.required),
	last_name: string().required(rules.required),
	nip: number().positive().integer().required(rules.required),
});

const changePasswordSchema = object().shape({
	password: string().required(rules.required),
	password_confirmation: string()
		.required(rules.required)
		.oneOf([ref("password")], `${rules.match} password`),
});

export { changePersonalSchema, changePasswordSchema };
