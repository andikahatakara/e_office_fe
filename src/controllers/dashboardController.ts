import { getOverview } from "@/services/dashboardService";
import { Overview } from "@/types/dashboardType";
import { ErrorResponse } from "@/types/globalType";
import useSWR, { Fetcher } from "swr";

export default function useDashboardController() {
	const useNotification = () => {};

	const useOverview = () => {
		const fetcher: Fetcher<Overview, string> = async (url) => {
			const { statusCode, data, message } = await getOverview(url);

			if (statusCode === 200) {
				return data;
			}

			throw {
				statusCode,
				message,
			};
		};

		const result = useSWR<Overview, ErrorResponse>(
			"dashboard/overview",
			fetcher
		);
		return result;
	};

	return {
		useOverview,
		useNotification,
	};
}
