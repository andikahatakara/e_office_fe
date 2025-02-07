import Badge from "@/components/atoms/Badge";
import { SubDepartment } from "@/types/departmentType";
import { ColorKeys } from "@/types/themeTypes";
import React from "react";

const Subs = ({ subs }: { subs: SubDepartment[] }) => {
	return (
		<div className="flex flex-col space-y-1.5">
			{subs.map((sub) => (
				<Badge
					key={sub.id}
					value={sub.name}
					color={sub.color as ColorKeys}
					className="!w-fit"
				/>
			))}
		</div>
	);
};

export default Subs;
