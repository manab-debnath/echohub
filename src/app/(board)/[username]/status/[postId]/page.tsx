import Comments from "@/components/Comments";
import Post from "@/components/Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { Image } from "@imagekit/next";
import Link from "next/link";
import { notFound } from "next/navigation";

const StatusPage = async ({
	params,
}: {
	params: Promise<{ username: string; postId: string }>;
}) => {
	const postId = (await params).postId;
	const username = (await params).username;
	const { userId } = await auth();

	if (!userId) return;

	const post = await prisma.post.findFirst({
		where: { id: Number(postId) },
		include: {
			user: { select: { displayName: true, username: true, image: true } },
			_count: { select: { likes: true, comments: true, rePosts: true } },
			likes: { where: { userId: userId }, select: { id: true } },
			rePosts: { where: { userId: userId }, select: { id: true } },
			saves: { where: { userId: userId }, select: { id: true } },
			comments: {
				orderBy: { createdAt: "desc" },
				include: {
					user: { select: { displayName: true, username: true, image: true } },
					_count: { select: { likes: true, comments: true, rePosts: true } },
					likes: { where: { userId: userId }, select: { id: true } },
					rePosts: { where: { userId: userId }, select: { id: true } },
					saves: { where: { userId: userId }, select: { id: true } },
				},
			},
		},
	});

	if (!post) return notFound();

	return (
		<div className="">
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
			<Post type="status" post={post} />
			<Comments comments={post.comments} postId={post.id} username={username} />
		</div>
	);
};

export default StatusPage;
