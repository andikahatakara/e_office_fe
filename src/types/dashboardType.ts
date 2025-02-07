type Dataset = {
	data: [];
	label: string;
	color: string;
};

type Datasets = Dataset[];
type OverviewChart = {
	labels: string[];
	datasets: Dataset[];
};
type Overview = {
	countOfOutgoing: number;
	countOfIncoming: number;
	outgoing: OverviewChart;
	incoming: OverviewChart;
};

export type { Overview, Datasets };
