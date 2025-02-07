"use client";

import BackButton from "@/components/atoms/BackButton";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import React from "react";
import OutgoingForm from "./form";

const OutgoingCreateView = () => {
	return (
		<Card>
			<Card.Header>
				<Heading level="h3" title="Tambah Surat Keluar" />
				<BackButton />
			</Card.Header>
			<OutgoingForm />
		</Card>
	);
};

export default OutgoingCreateView;
