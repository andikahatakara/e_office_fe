"use client";
import Loading from "@/components/atoms/Loading";
import useProfile from "@/controllers/authController";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { authBg, logo } from "../../assets";

type GuestLayoutProps = {
	children: ReactNode;
};

const GuestLayout = ({ children }: GuestLayoutProps) => {
	const { isLoading } = useProfile({
		redirectIfAuthenticated: "/",
		middleware: "guest",
	});
	return isLoading ? (
		<Loading />
	) : (
		<section className="bg-white dark:bg-gray-900">
			<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
				{/* banner section */}
				<section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
					<Image
						src={authBg}
						alt={"Auth Background"}
						className="absolute inset-0 h-full w-full object-cover z-10"
						priority
					/>
					{/* overlay */}
					<div className="absolute inset-0 h-full w-full object-cover z-20 bg-black/60 " />

					<div className="hidden lg:relative lg:block lg:p-12 z-30">
						<Link href={"/"} className="blcok text-white">
							<span className="sr-only">Home</span>
							<span className="relative flex h-10 sm:h-12">
								<Image
									src={logo}
									className="absolute h-full inset-0 object-cover"
									alt="Diskominfo Kuburaya"
								/>
							</span>
						</Link>

						<h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
							Welcome to E Office
						</h2>

						<p className="mt-4 leading-relaxed text-white/90">
							Aplikasi E Office Dinas Komunikasi dan Informasi Kabupaten Kubu
							Raya Kalimantan Barat
						</p>
					</div>
				</section>

				<main
					aria-label="Main"
					className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
				>
					<div className="w-full max-w-xl lg:max-w-3xl">
						{/* Show Only max w tab */}
						<div className="relative z-40 -mt-16 block lg:hidden ">
							<Link href={"/"} className="flex w-full">
								<span className="sr-only">Home</span>
								<span className="relative flex w-full h-12">
									<Image
										src={logo}
										className="absolute h-full  inset-0 object-cover"
										alt="Diskominfo Kuburaya"
									/>
								</span>
							</Link>

							<h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
								Welcome to E Office
							</h1>

							<p className="mt-4 leading-relaxed text-gray-700">
								Aplikasi E Office Dinas Komunikasi dan Informasi Kabupaten Kubu
								Raya Kalimantan Barat
							</p>
						</div>

						<div className="mt-8">{children}</div>
					</div>
				</main>
			</div>
		</section>
	);
};

export default GuestLayout;
