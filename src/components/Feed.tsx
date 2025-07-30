import React from "react";
import Post from "./Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import InfiniteFeed from "./InfiniteFeed";

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
	const { userId } = await auth();

	if (!userId) return;

	const whereCondition = userProfileId
		? { parentPostId: null, userId: userProfileId }
		: {
				parentPostId: null, // REMOVES COMMENTS
				userId: {
					in: [
						userId,
						...(
							await prisma.follow.findMany({
								where: { followerId: userId },
								select: { followingId: true },
							})
						).map((follow) => follow.followingId),
					],
				},
		  };

	const postIncludeQuery = {
		user: { select: { displayName: true, username: true, image: true } },
		_count: { select: { likes: true, comments: true, rePosts: true } },
		likes: { where: { userId: userId }, select: { id: true } },
		rePosts: { where: { userId: userId }, select: { id: true } },
		saves: { where: { userId: userId }, select: { id: true } },
	};

	const posts = await prisma.post.findMany({
		where: whereCondition,
		include: {
			rePost: {
				include: postIncludeQuery,
			},
			...postIncludeQuery,
		},
		take: 3,
		skip: 0,
		orderBy: { createdAt: "desc" },
	});

	// FETCH POSTS FROM THE CURRENT USER AND FOLLOWINGS

	return (
		<div>
			{posts.map((post) => (
				<div key={post.id}>
					<Post post={post} />
				</div>
			))}
			<InfiniteFeed />
		</div>
	);
};

export default Feed;
