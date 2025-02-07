"use client";
import BackButton from "@/components/atoms/BackButton";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import React, { useEffect } from "react";
import useEmployeeController from "@/controllers/employeeController";
import useIncomingLetterController from "@/controllers/incomingLetterController";
import useRedirect from "@/controllers/redirectController";
import IncomingForm from "./Form";

const UpdateIncomingView = ({ id }: { id: number }) => {
	const { cans, useShow } = useIncomingLetterController();
	const { data, isLoading } = useShow(id);
	const { redirectStatusCode } = useRedirect();

	useEffect(() => {
		if (cans && !cans["incoming-letters.update"]) {
			return redirectStatusCode(403);
		}
	}, [cans, redirectStatusCode]);

	return (
		<Card>
			<Card.Header>
				<Heading
					isLoading={isLoading}
					level={"h3"}
					title={`Ubah Surat Masuk`}
				/>
				<BackButton isLoading={isLoading} />
			</Card.Header>
			<IncomingForm incoming={data} loading={isLoading} />
		</Card>
	);
};

export default UpdateIncomingView;
