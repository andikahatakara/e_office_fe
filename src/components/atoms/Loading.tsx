"use client";
import React from "react";

const Loading = () => {
	return (
		<>
			<div className="fixed h-screen flex !z-full top-0 left-0 right-0 justify-center items-center">
				<span className="loader" />
			</div>

			{/* overlay */}
			<div className="fixed z-100 bg-gray-900/20 dark:bg-gray-900/80 inset-0" />
		</>
	);
};

export default Loading;
