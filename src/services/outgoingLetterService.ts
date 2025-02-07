import { OutgoingLetter } from "@/types/letterType";
import http from ".";

const getOutgoingLetters = async (url = "outgoing_letters") =>
	await http<OutgoingLetter[]>({ url });

const getOutgoingLetter = async (url: string) =>
	await http<OutgoingLetter>({ url });

const storeOutgoingLetter = async (data: object) =>
	await http<OutgoingLetter>({ url: `outgoing_letters`, method: "POST", data });

const updateOutgoingLetter = async (data: object, id: number) =>
	await http<boolean>({
		url: `outgoing_letters/${id}`,
		method: "POST",
		data,
		params: { _method: "PUT" },
	});

export {
	getOutgoingLetters,
	getOutgoingLetter,
	storeOutgoingLetter,
	updateOutgoingLetter,
};
