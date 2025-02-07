"use client";

import BackButton from "@/components/atoms/BackButton";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import Item from "@/components/atoms/Item";
import RenderIf from "@/components/atoms/RenderIf";
import useDispoitionController from "@/controllers/dispositionController";
import { ColorKeys } from "@/types/themeTypes";
import { dateFormater } from "@/utils/globalUtil";

const ShowDisposition = ({ id }: { id: number }) => {
	const { useGetDisposition } = useDispoitionController();

	const { data, isLoading, error } = useGetDisposition(id);

	return (
		<div className="space-y-6">
			<Card>
				<Card.Header>
					<Heading level="h3" title="Detail Disposisi" isLoading={isLoading} />
					<BackButton isLoading={isLoading} />
				</Card.Header>
				<div className="space-y-1">
					<Item
						title="Nomor Surat"
						value={data?.incoming.number ?? ""}
						isLoading={isLoading}
					/>
					<Item
						title="Perihal Surat"
						value={data?.incoming.about ?? ""}
						isLoading={isLoading}
					/>
					<Item
						title="Sifat Surat"
						value={data?.incoming.characteristic ?? ""}
						isLoading={isLoading}
					/>
					<Item
						title="Tanggal Surat"
						value={data ? dateFormater(data.incoming.date, "DD MMMM YYYY") : ""}
						isLoading={isLoading}
					/>
					<Item
						title="Tujuan Surat"
						value={
							data
								? `${data.incoming.employee.employeeable.name} (${data.incoming.employee.user.full_name})`
								: ""
						}
						isLoading={isLoading}
						asBadge
						badgeColor={data?.incoming.employee.employeeable.color as ColorKeys}
					/>
					<Item
						title="Di Disposisikan"
						value={
							data
								? `${data.employee_to.employeeable.name} (${data.employee_to.user.full_name})`
								: ""
						}
						isLoading={isLoading}
						asBadge
						badgeColor={data?.employee_to.employeeable.color as ColorKeys}
					/>
				</div>
			</Card>
			<RenderIf when={data ? true : false}>
				<Card>
					<iframe
						className="w-full h-96 aspect-auto"
						src={data?.incoming.file_url}
					/>
				</Card>
			</RenderIf>
		</div>
	);
};

export default ShowDisposition;
