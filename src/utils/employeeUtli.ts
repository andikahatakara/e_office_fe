import { ColorKeys } from "@/themes/colorTheme";
import { Department, SubDepartment } from "@/types/departmentType";

const getPosition = (
	employee: Department | SubDepartment,
	is_head: boolean
): string => {
	const levels: Record<string, string> = {
		"kepala dinas": "Kepala Dinas",
		sekretaris: "Sekretaris",
		bidang: "Kepala Bidang",
	};

	const department = employee as Department;
	const sub = employee as SubDepartment;

	if (!is_head) {
		return "Anggota";
	}

	const level = levels[department.level];
	return level ?? "Kepala Seksi/Bagian";
};

const getColorEmployee = (employee: Department | SubDepartment): ColorKeys => {
	return employee.color as ColorKeys;
};

export { getPosition, getColorEmployee };
