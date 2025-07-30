"use client";

import React, { useActionState, useEffect } from "react";
import Post from "./Post";
import { Image } from "@imagekit/next";
import { Post as PostType } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { addComment } from "@/action";
import { socket } from "@/socket";

type CommentWithDetails = PostType & {
	user: {
		displayName: string | null;
		username: string;
		image: string | null;
	};
	_count: {
		likes: number;
		rePosts: number;
		comments: number;
	};
	likes: { id: number }[];
	rePosts: { id: number }[];
	saves: { id: number }[];
};

const Comments = ({
	comments,
	postId,
	username,
}: {
	comments: CommentWithDetails[];
	postId: number;
	username: string;
}) => {
	const { isLoaded, isSignedIn, user } = useUser();

	const [state, formAction, isPending] = useActionState(addComment, {
		success: false,
		error: false,
	});

	useEffect(() => {
		if (state.success) {
			socket.emit("sendNotification", {
				receiverUsername: username,
				data: {
					senderUsername: user?.username,
					type: "COMMENT",
					link: `${username}/status/${postId}`,
				},
			});
		}
	}, [state.success, username, user?.username, postId]);

	return (
		<div className="">
			{user && (
				<form
					action={formAction}
					className="flex justify-between items-center gap-4 p-4 border-b-[1px] border-borderGray"
				>
					<div className="relative w-10 h-10 rounded-full overflow-hidden">
						<Image
							src={user?.imageUrl || "/EchoHub/general/avatar.png"}
							alt="avatar"
							fill
							transformation={[{ width: 100, height: 100 }]}
						/>
					</div>
					<input type="number" name="postId" hidden readOnly value={postId} />
					<input
						type="string"
						name="username"
						hidden
						readOnly
						value={username}
					/>
					<input
						type="text"
						name="desc"
						placeholder="Post your reply"
						className="flex-1 bg-transparent outline-none p-2 text-xl"
					/>
					<button
						disabled={isPending}
						className="py-2 px-4 text-black bg-white font-bold rounded-full cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200"
					>
						{isPending ? "Replying" : "Reply"}
					</button>
				</form>
			)}

			{state.error && (
				<span className="text-red-300 p-4">Something went wrong!</span>
			)}

			{comments.map((comment) => (
				<div key={comment.id}>
					<Post type="comment" post={comment} />
				</div>
			))}
		</div>
	);
};

export default Comments;
