"use client";
import BackButton from "@/components/atoms/BackButton";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import useIncomingLetterController from "@/controllers/incomingLetterController";
import useRedirect from "@/controllers/redirectController";
import { useEffect } from "react";
import IncomingForm from "./Form";

const IncomingCreate = () => {
	const { redirectStatusCode } = useRedirect();
	const { cans } = useIncomingLetterController();

	// redirect for access denied
	useEffect(() => {
		if (cans && !cans["incoming-letters.store"]) {
			return redirectStatusCode(403);
		}
	}, [cans, redirectStatusCode]);

	return (
		<Card>
			<Card.Header>
				<Heading level="h3" title="Tambah Surat Masuk" />
				<BackButton />
			</Card.Header>

			<IncomingForm />
		</Card>
	);
};

export default IncomingCreate;
