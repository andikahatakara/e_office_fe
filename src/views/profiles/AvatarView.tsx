"use client";
import RenderIf from "@/components/atoms/RenderIf";
import Skeleton from "@/components/atoms/Skeleton";
import IconButton from "@/components/atoms/buttons/IconButton";
import Field from "@/components/atoms/inputs/Field";
import useUserController from "@/controllers/userController";
import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type AvatarViewProps = {
	src: string;
	alt: string;
	isLoading?: boolean;
	callback: () => void;
};

const AvatarView = ({
	src,
	alt,
	isLoading = false,
	callback,
}: AvatarViewProps) => {
	const { useChangeAvatar } = useUserController();

	const {
		imageSource,
		image,
		imageRef,
		errors,
		handleChooseImage,
		handleRemoveImage,
		handleChangeAvatar,
	} = useChangeAvatar(callback, src);

	return isLoading ? (
		<Skeleton circle className="h-14 w-14" />
	) : (
		<div className="flex w-full justify-center items-center flex-col ">
			<label htmlFor="avatar" className="cursor-pointer ">
				<div className="relative h-28 w-28 rounded-full">
					<Image
						src={imageSource}
						alt={alt}
						fill
						className="absolute inset-0 h-auto w-auto rounded-full min-h-full min-w-full object-cover z-10"
						unoptimized
					/>
					<RenderIf when={!image}>
						<div className="absolute z-20 left-20 bottom-0 flex items-center rounded-full justify-center h-8 w-8 bg-gray-300 dark:bg-gray-700">
							<PencilIcon className="text-gray-950 h-5 w-5 dark:text-gray-50" />
						</div>
					</RenderIf>
					<Field
						type="file"
						accept="image/jpeg, image/png"
						id="avatar"
						className="hidden"
						ref={imageRef}
						onChange={handleChooseImage}
					/>
				</div>
			</label>
			<RenderIf when={image ? true : false}>
				<div className="space-x-2 my-1.5">
					<IconButton
						onClick={() => handleChangeAvatar()}
						icon={<CheckIcon className="text-inherit h-5 w-5" />}
					/>
					<IconButton
						color="danger"
						icon={<XMarkIcon className="text-inherit h-5 w-5" />}
						onClick={() => handleRemoveImage()}
					/>
				</div>
			</RenderIf>
			<RenderIf when={!errors}>
				<span className="mt-1.5 text-xs font-medium text-gray-500 dark:text-gray-300">
					Maksimal ukuran file 1 Mb dan Ekstensi PNG/JPG
				</span>
			</RenderIf>
			<RenderIf when={errors ? true : false}>
				<span className="mt-1.5 input-error-message">{errors}</span>
			</RenderIf>
		</div>
	);
};

export default AvatarView;
