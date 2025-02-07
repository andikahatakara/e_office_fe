"use client";
import BackButton from "@/components/atoms/BackButton";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import useOutgoingLetterController from "@/controllers/outgoingLetterController";
import useRedirect from "@/controllers/redirectController";
import React, { useEffect } from "react";
import OutgoingForm from "./form";

type UpdateOutgoingLetterViewProps = {
	id: number;
};

const UpdateOutgoingLetterView = ({ id }: UpdateOutgoingLetterViewProps) => {
	const { redirectStatusCode } = useRedirect();
	const { useShowById, cans } = useOutgoingLetterController();
	const { isLoading, data } = useShowById(id);

	useEffect(() => {
		if (cans && !cans["outgoing-letters.update"]) {
			redirectStatusCode(403);
		}
	}, [cans, redirectStatusCode]);

	return (
		<Card>
			<Card.Header>
				<Heading
					level={"h3"}
					isLoading={isLoading}
					title="Ubah Data Surat Keluar"
				/>
				<BackButton isLoading={isLoading} />
			</Card.Header>
			<OutgoingForm outgoing={data} />
		</Card>
	);
};

export default UpdateOutgoingLetterView;
