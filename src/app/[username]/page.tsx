import Feed from "@/components/Feed";
import { Image } from "@imagekit/next";
import Link from "next/link";
import React from "react";

const UserPage = () => {
	return (
		<div className="">
			{/* PROFILE TITLE */}
			<div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-black/50">
				<Link href="/">
					<Image
						src="/EchoHub/icons/back.svg"
						alt="back"
						width={24}
						height={24}
					/>
				</Link>
				<h1 className="font-bold text-lg">Lama Dev</h1>
			</div>
			{/* INFO */}
			<div className="">
				{/* COVER AND AVATAR CONTAINER */}
				<div className="relative w-full">
					{/* COVER */}
					<div className="w-full aspect-[3/1] relative">
						<Image
							src="/EchoHub/general/cover.jpg"
							alt="cover"
							fill
							transformation={[{ width: 600, height: 200 }]}
						/>
					</div>
					{/* AVATAR */}
					<div className="w-1/5 aspect-square absolute left-4 -translate-y-1/2 border-4 border-black bg-gray-300 rounded-full overflow-hidden">
						<Image
							src="/EchoHub/general/avatar.png"
							alt="cover"
							fill
							transformation={[{ width: 100, height: 100 }]}
						/>
					</div>
				</div>
				<div className="flex items-center justify-end w-full gap-2 p-2">
					<div className="w-9 h-9 flex items-center justify-center border-[1px] border-gray-500 rounded-full cursor-pointer">
						<Image
							src="/EchoHub/icons/more.svg"
							alt="more"
							width={20}
							height={20}
						/>
					</div>
					<div className="w-9 h-9 flex items-center justify-center border-[1px] border-gray-500 rounded-full cursor-pointer">
						<Image
							src="/EchoHub/icons/explore.svg"
							alt="more"
							width={20}
							height={20}
						/>
					</div>
					<div className="w-9 h-9 flex items-center justify-center border-[1px] border-gray-500 rounded-full cursor-pointer">
						<Image
							src="/EchoHub/icons/message.svg"
							alt="more"
							width={20}
							height={20}
						/>
					</div>
					<button className="py-2 px-4 bg-white text-black font-bold rounded-full cursor-pointer">
						Follow
					</button>
				</div>
				{/* USER DETAILS */}
				<div className="p-4 flex flex-col gap-2">
					{/* USERNAME & HANDLE */}
					<div className="">
						<h1 className="font-bold text-2xl">Lama Dev</h1>
						<span className="text-textGray text-sm">@lamaWebDev</span>
					</div>
					<p>Lama Dev YouTube Channel </p>
					{/* JOB & LOCATION & DATE */}
					<div className="flex gap-4 text-textGray text-[15px]">
						<div className="flex items-center gap-2">
							<Image
								src="/EchoHub/icons/userLocation.svg"
								alt="location"
								width={20}
								height={20}
							/>
							<span>India</span>
						</div>
						<div className="flex items-center gap-2">
							<Image
								src="/EchoHub/icons/date.svg"
								alt="location"
								width={20}
								height={20}
							/>
							<span>Joined Sep 2021</span>
						</div>
					</div>
					{/* FOLLOWINGS & FOLLOWERS */}
					<div className="flex items-center gap-4">
						<div className="flex gap-2 items-center">
							<span className="font-bold">100</span>
							<span className="text-textGray text-[15px]">Followers</span>
						</div>
						<div className="flex gap-2 items-center">
							<span className="font-bold">10K</span>
							<span className="text-textGray text-[15px]">Followings</span>
						</div>
					</div>
				</div>
			</div>
			{/* FEEDS */}
			<Feed />
		</div>
	);
};

export default UserPage;
