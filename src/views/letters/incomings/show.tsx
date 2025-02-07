"use client";
import Alert from "@/components/atoms/Alert";
import BackButton from "@/components/atoms/BackButton";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import Item from "@/components/atoms/Item";
import RenderIf from "@/components/atoms/RenderIf";
import useIncomingLetterController from "@/controllers/incomingLetterController";
import { ColorKeys } from "@/types/themeTypes";
import { dateFormater } from "@/utils/globalUtil";
import Link from "next/link";

type ShowIncomingLetterProps = {
	id: number;
};

const ShowIncomingLetter = ({ id }: ShowIncomingLetterProps) => {
	const { useShow } = useIncomingLetterController();
	const { isLoading, data, error } = useShow(id);

	return (
		<div className="space-y-6">
			<Card>
				<Card.Header>
					<Heading isLoading={isLoading} title="Detail Surat" level="h3" />
					<BackButton isLoading={isLoading} />
				</Card.Header>
				<div className="space-y-1">
					<Item
						isLoading={isLoading}
						title={"Nomor Surat"}
						value={data?.number ?? ""}
					/>
					<Item
						isLoading={isLoading}
						title={"Perihal Surat"}
						value={data?.about ?? ""}
					/>
					<Item
						isLoading={isLoading}
						title={"Sifat Surat"}
						value={data?.characteristic ?? ""}
					/>
					<Item
						isLoading={isLoading}
						title={"Tanggal Surat"}
						value={data ? dateFormater(data.date, "DD MMMM YYYY") : ""}
					/>
					<Item
						isLoading={isLoading}
						title={"Pengirim Surat"}
						value={data?.from ?? ""}
					/>
					<Item
						isLoading={isLoading}
						title={"Nomor Surat"}
						value={id.toString()}
					/>
					<RenderIf when={data && data.dispositions.length > 0 ? true : false}>
						<div className="grid grid-cols-12 gap-2 md:gap-4 lg:gap-6">
							{/* title */}
							<div className="col-span-6 md:col-span-3">
								<span className="flex items-center justify-between font-semibold text-sm md:text-base text-gray-950 dark:text-gray-50">
									Disposisi <span>:</span>
								</span>
							</div>
							<div className="col-span-6 md:col-span-9">
								{data?.dispositions.map((disposition, index) => (
									<Link
										href={`/incoming-letters/dispositions/${disposition.id}`}
										key={index}
										className="flex flex-col"
									>
										<Badge
											color={
												disposition.employee_to.employeeable.color as ColorKeys
											}
											// href
											className="!w-fit"
											value={`${disposition.employee_to.employeeable.name} (${disposition.employee_to.user.full_name})`}
										/>
										<span
											className={`text-xs italic ${
												disposition.read_at
													? "text-success-500"
													: "text-red-500"
											}`}
										>
											{disposition.read_at
												? `Dilihat ${dateFormater(disposition.read_at)}`
												: "Belum dilihat"}
										</span>
									</Link>
								))}
							</div>
						</div>
					</RenderIf>
				</div>

				<RenderIf when={error ? true : false}>
					<Alert type="danger" message={error?.message} />
				</RenderIf>
			</Card>
			{data && (
				<Card>
					<iframe className="w-full h-96 aspect-auto" src={data.file_url} />
				</Card>
			)}
		</div>
	);
};

export default ShowIncomingLetter;
