import { Overview } from "@/types/dashboardType";
import http from ".";

const getNotification = async (url = "dashboard/notifications") =>
	await http<[]>({ url });
const getOverview = async (url = "dashboard/overview") =>
	await http<Overview>({ url });

export { getNotification, getOverview };
