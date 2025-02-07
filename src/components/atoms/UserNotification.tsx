/*
 * File: UserNotification.tsx
 * Project: fe_e_office
 * File Created: Friday, 9th June 2023 8:41:45 am
 * Author: Emon Krismon (emonkrismon98@gmail.com)
 * Github: https://github.com/krismonsemanas
 * -----
 * Last Modified: Friday, 9th June 2023 8:42:16 am
 * Modified By: Emon Krismon (emonkrismon98@gmail.com>)
 * -----
 * Copyright 2023, Kris Dev
 */

"use client";

import useUserController from "@/controllers/userController";
import React from "react";
import IconButton from "./buttons/IconButton";
import { BellIcon } from "@heroicons/react/24/outline";

const UserNotification = () => {
	const { useNotification } = useUserController();

	const { data, isLoading } = useNotification();

	return (
		<IconButton
			variant="ghost"
			color="dark"
			icon={<BellIcon className="icon5" />}
		/>
	);
};

export default UserNotification;
