import Feed from "@/components/Feed";
import FollowButton from "@/components/FollowButton";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { Image } from "@imagekit/next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { format } from "timeago.js";

const UserPage = async ({
	params,
}: {
	params: Promise<{ username: string }>;
}) => {
	const username = (await params).username;
	const { userId } = await auth();

	const user = await prisma.user.findUnique({
		where: {
			username: username,
		},
		include: {
			_count: { select: { followers: true, followings: true } },
			followings: userId ? { where: { followerId: userId } } : undefined,
		},
	});

	if (!user) return notFound();

	// console.log("username", user);

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
							src={user.coverImage || "/EchoHub/general/noCover.jpg"}
							alt="cover"
							fill
							transformation={[{ width: 600, height: 200 }]}
						/>
					</div>
					{/* AVATAR */}
					<div className="w-1/5 aspect-square absolute left-4 -translate-y-1/2 border-4 border-black bg-gray-300 rounded-full overflow-hidden">
						<Image
							src={user.image || "/EchoHub/general/noAvatar.png"}
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
					{userId && (
						<FollowButton
							userId={user.id}
							isFollowed={!!user.followings.length}
						/>
					)}
				</div>
				{/* USER DETAILS */}
				<div className="p-4 flex flex-col gap-2">
					{/* USERNAME & HANDLE */}
					<div className="">
						<h1 className="font-bold text-2xl">{user.displayName}</h1>
						<span className="text-textGray text-sm">@{user.username}</span>
					</div>
					{user.bio && <p>{user.bio} </p>}
					{/* JOB & LOCATION & DATE */}
					<div className="flex gap-4 text-textGray text-[15px]">
						{user.location && (
							<div className="flex items-center gap-2">
								<Image
									src="/EchoHub/icons/userLocation.svg"
									alt="location"
									width={20}
									height={20}
								/>
								<span>{user.location}</span>
							</div>
						)}
						<div className="flex items-center gap-2">
							<Image
								src="/EchoHub/icons/date.svg"
								alt="location"
								width={20}
								height={20}
							/>
							<span>
								Joined{" "}
								{new Date(user.createdAt.toString()).toLocaleDateString(
									"en-US",
									{ month: "long", year: "numeric" }
								)}
							</span>
						</div>
					</div>
					{/* FOLLOWINGS & FOLLOWERS */}
					<div className="flex items-center gap-4">
						<div className="flex gap-2 items-center">
							<span className="font-bold">{user._count.followers}</span>
							<span className="text-textGray text-[15px]">Followers</span>
						</div>
						<div className="flex gap-2 items-center">
							<span className="font-bold">{user._count.followings}</span>
							<span className="text-textGray text-[15px]">Followings</span>
						</div>
					</div>
				</div>
			</div>
			{/* FEEDS */}
			<Feed userProfileId={user.id} />
		</div>
	);
};

export default UserPage;
