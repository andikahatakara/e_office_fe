import { object, string } from "yup";
import rules from "./rules.json";

const roleAndPermissionSchema = object().shape({
	title: string().required(rules.required),
	name: string().required(rules.required),
});

export { roleAndPermissionSchema };
