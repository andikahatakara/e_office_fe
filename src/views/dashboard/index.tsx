"use client";
import Card from "@/components/atoms/Card";
import Overview from "@/components/atoms/dashboard/Overview";
import Bar from "@/components/molecules/charts/Bar";
import useDashboardController from "@/controllers/dashboardController";
import React from "react";

const DashboardView = () => {
	const { useOverview } = useDashboardController();

	const { isLoading, data } = useOverview();

	return (
		<div className="space-y-4 md:space-y-6">
			<div className="grid grid-cols-12 gap-4 md:gap-6">
				<div className="col-span-12 md:col-span-6">
					<Overview
						isLoading={isLoading}
						value={data?.countOfIncoming ?? 0}
						label="Surat Masuk Tahun Ini"
					/>
				</div>
				<div className="col-span-12 md:col-span-6">
					<Overview
						isLoading={isLoading}
						value={data?.countOfOutgoing ?? 0}
						label="Surat Keluar Tahun Ini"
						type="outgoing"
					/>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-4 md:gap-6">
				<div className="col-span-12 md:col-span-6">
					<Card>
						<Bar
							isLoading={isLoading}
							title={`Data Surat Masuk`}
							labels={data?.incoming.labels ?? []}
							datasets={data?.incoming.datasets ?? []}
						/>
					</Card>
				</div>
				<div className="col-span-12 md:col-span-6">
					<Card>
						<Bar
							isLoading={isLoading}
							title={`Data Surat Keluar`}
							labels={data?.outgoing.labels ?? []}
							datasets={data?.outgoing.datasets ?? []}
						/>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default DashboardView;
