import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { Image } from "@imagekit/next";
import Link from "next/link";
import React from "react";

const Recommendations = async () => {
	const { userId } = await auth();

	if (!userId) return;

	const followingIds = await prisma.follow.findMany({
		where: { followerId: userId },
		select: { followingId: true },
	});

	const followedUserIds = followingIds.map((f) => f.followingId);

	const friendRecommendations = await prisma.user.findMany({
		where: {
			id: { not: userId, notIn: followedUserIds },
			followings: { some: { followerId: { in: followedUserIds } } },
		},
		take: 3,
		select: { id: true, displayName: true, username: true, image: true },
	});

	return (
		<div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
			{/* USER CARD */}
			{friendRecommendations.map((recommendedFriend) => (
				<Link
					href={`/${recommendedFriend.username}`}
					className="flex items-center justify-between group"
					key={recommendedFriend.id}
				>
					{/* IMAGE AND USER INFO */}
					<div className="flex gap-2 items-center">
						<div className="relative w-10 h-10 rounded-full overflow-hidden">
							<Image
								src={recommendedFriend.image || "/EchoHub/general/noAvatar.png"}
								alt={recommendedFriend.username}
								transformation={[{ width: 100, height: 100 }]}
								fill
							/>
						</div>
						<div className="">
							<h1 className="text-white font-bold text-md group-hover:underline">
								{recommendedFriend.displayName || recommendedFriend.username}
							</h1>
							<span className="text-textGray text-sm">
								@{recommendedFriend.username}
							</span>
						</div>
					</div>
					{/* BUTTON */}
					<button className="px-4 py-1 rounded-full bg-white text-black font-semibold cursor-pointer">
						Follow
					</button>
				</Link>
			))}
			<Link href="/" className="text-iconBlue cursor-pointer">
				Show more
			</Link>
		</div>
	);
};

export default Recommendations;
