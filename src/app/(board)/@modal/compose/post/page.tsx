"use client";

import { Image } from "@imagekit/next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PostModal = () => {
	const router = useRouter();

	const closeModal = () => {
		router.back();
	};

	// Use useEffect to manage body scroll
	useEffect(() => {
		// Prevent body scroll when the modal is mounted
		document.body.style.overflow = "hidden";

		// Re-enable body scroll when the modal is unmounted
		return () => {
			document.body.style.overflow = "unset"; // 'unset' removes the inline style, reverting to default
		};
	}, []);

	return (
		<div className="fixed w-screen h-screen top-0 left-0 bg-[#293139a6] z-30 flex justify-center">
			<div className="py-4 px-8 bg-black rounded-xl w-[600px] h-max mt-12 flex flex-col gap-4">
				{/* TOP */}
				<div className="flex items-center justify-between">
					<div className="cursor-pointer" onClick={closeModal}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path
								fill="white"
								d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"
							/>
						</svg>
					</div>
					<div className="text-iconBlue font-semibold">Draft</div>
				</div>
				{/* CENTER */}
				<div className="py-4 flex gap-4">
					<div className="relative w-10 h-10 rounded-full overflow-hidden">
						<Image
							src="/EchoHub/general/avatar.png"
							alt="avatar"
							fill
							transformation={[{ width: 100, height: 100 }]}
						/>
					</div>
					<input
						type="text"
						placeholder="What is happening?!"
						className="flex-1 bg-transparent text-textGray text-lg outline-none"
					/>
				</div>
				{/* BOTTOM */}
				<div className="flex justify-between items-center flex-wrap gap-4 border-t border-borderGray pt-4">
					<div className="flex flex-wrap gap-4">
						<Image
							src="/EchoHub/icons/image.svg"
							alt=""
							width={20}
							height={20}
							className="cursor-pointer"
						/>
						<Image
							src="/EchoHub/icons/gif.svg"
							alt=""
							width={20}
							height={20}
							className="cursor-pointer"
						/>
						<Image
							src="/EchoHub/icons/poll.svg"
							alt=""
							width={20}
							height={20}
							className="cursor-pointer"
						/>
						<Image
							src="/EchoHub/icons/emoji.svg"
							alt=""
							width={20}
							height={20}
							className="cursor-pointer"
						/>
						<Image
							src="/EchoHub/icons/schedule.svg"
							alt=""
							width={20}
							height={20}
							className="cursor-pointer"
						/>
						<Image
							src="/EchoHub/icons/location.svg"
							alt=""
							width={20}
							height={20}
							className="cursor-pointer"
						/>
					</div>
					<button className="bg-white text-black font-bold rounded-full px-4 py-2 cursor-pointer">
						Post
					</button>
				</div>
			</div>
		</div>
	);
};

export default PostModal;
