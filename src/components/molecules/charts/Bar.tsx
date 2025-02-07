"use client";
import React, { useMemo } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

import { Bar as ChartBar } from "react-chartjs-2";
import Skeleton from "@/components/atoms/Skeleton";
import { Datasets } from "@/types/dashboardType";
import { chartColor } from "@/themes/colorTheme";
import { ColorKeys } from "@/types/themeTypes";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

type BarProps = {
	title: string;
	labels: string[];
	datasets: Datasets;
	isLoading?: boolean;
};

const Bar = ({ title, labels, datasets, isLoading }: BarProps) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: title,
			},
		},
	};

	const data = useMemo(() => {
		return {
			labels: labels,
			datasets: datasets.map((dataset) => {
				return {
					label: dataset.label,
					data: dataset.data,
					backgroundColor:
						chartColor[(dataset.color as ColorKeys) ?? "default"],
				};
			}),
		};
	}, [datasets, labels]);

	return isLoading ? (
		<Skeleton className="h-20" />
	) : (
		<ChartBar options={options} data={data} />
	);
};

export default Bar;
