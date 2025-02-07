import { DispositionDetail } from "@/types/dispositionType";
import http from ".";

const createDisposition = async (data: object, id: string | number) =>
	await http<boolean>({
		url: `incoming_letters/${id}/disposition`,
		method: "POST",
		data,
	});

const getDisposition = async (url: string) =>
	await http<DispositionDetail>({
		url,
	});

export { createDisposition, getDisposition };
