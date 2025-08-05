import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

type FollowType = {
	followingId: string
}

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;

	const userProfileId = searchParams.get("user");
	const page = searchParams.get("cursor");
	const LIMIT = 3;
	const SKIP = (Number(page) - 1) * LIMIT;

	const { userId } = await auth();

	if (!userId) return;

	const whereCondition =
		userProfileId !== "undefined"
			? { parentPostId: null, userId: userProfileId as string }
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
							).map((follow: FollowType) => follow.followingId),
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
		take: LIMIT,
		skip: SKIP,
	});

	const totalPosts = await prisma.post.count({ where: whereCondition });
	const hasMore = Number(page) * LIMIT < totalPosts;

	return Response.json({ posts, hasMore });
}
