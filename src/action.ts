"use server";

import { auth } from "@clerk/nextjs/server";
import { imageKit } from "./utils";
import { prisma } from "./prisma";
import { success, z } from "zod";
import { revalidatePath } from "next/cache";
import { UploadResponse } from "@imagekit/next";

export const likePost = async (postId: number) => {
	try {
		const { userId } = await auth();

		if (!userId) return;

		const existingLike = await prisma.like.findFirst({
			where: { userId: userId, postId: postId },
		});

		if (existingLike) {
			await prisma.like.delete({ where: { id: existingLike.id } });
		} else {
			await prisma.like.create({ data: { postId, userId } });
		}
	} catch (error) {
		console.error("Error: Could not like the post:", error);
	}
};

export const rePost = async (postId: number) => {
	try {
		const { userId } = await auth();
		if (!userId) return;

		const existingRePost = await prisma.post.findFirst({
			where: {
				userId: userId,
				rePostId: postId,
			},
		});

		if (existingRePost) {
			await prisma.post.delete({
				where: {
					id: existingRePost.id,
				},
			});
		} else {
			await prisma.post.create({
				data: {
					userId: userId,
					rePostId: postId,
				},
			});
		}
	} catch (error) {
		console.error("Error: Could not repost:", error);
	}
};

export const savePost = async (postId: number) => {
	try {
		const { userId } = await auth();
		if (!userId) return;

		const existingSavedPost = await prisma.savedPosts.findFirst({
			where: {
				userId: userId,
				postId: postId,
			},
		});

		if (existingSavedPost) {
			await prisma.savedPosts.delete({
				where: {
					id: existingSavedPost.id,
				},
			});
		} else {
			await prisma.savedPosts.create({
				data: {
					userId,
					postId,
				},
			});
		}
	} catch (error) {
		console.error("Error: Could not save the post:", error);
	}
};

export const addComment = async (
	prevState: { success: boolean; error: boolean },
	formData: FormData
) => {
	const { userId } = await auth();

	if (!userId) return { success: false, error: true };

	const postId = formData.get("postId");
	const username = formData.get("username");
	const desc = formData.get("desc");

	const Comment = z.object({
		parentPostId: z.number(),
		desc: z.string().max(140),
	});

	const validatedFields = Comment.safeParse({
		parentPostId: Number(postId),
		desc: desc,
	});

	if (!validatedFields.success) {
		console.log(validatedFields.error.flatten().fieldErrors);
		return { success: false, error: true };
	}

	try {
		await prisma.post.create({
			data: {
				...validatedFields.data,
				userId: userId,
			},
		});

		revalidatePath(`/${username}/status/${postId}`);

		return { success: true, error: false };
	} catch (err) {
		console.log("Error while saving comment: ", err);
		return { success: false, error: true };
	}
};

export const addPost = async (
	prevState: { success: boolean; error: boolean },
	formData: FormData
) => {
	const { userId } = await auth();

	if (!userId) return { success: false, error: true };

	const desc = formData.get("desc");
	const file = formData.get("file") as File;
	const isSensitive = formData.get("isSensitive") as string;
	const imageType = formData.get("imageType");

	const uploadFile = async (file: File): Promise<UploadResponse> => {
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const transformation = `w-600,${
			imageType === "square" ? "ar-1-1" : imageType === "wide" ? "ar-16-9" : ""
		}`;

		return new Promise((resolve, reject) => {
			imageKit.upload(
				{
					file: buffer,
					fileName: file.name,
					folder: "/EchoHub/posts",
					...(file.type.includes("image") && {
						transformation: {
							pre: transformation,
						},
					}),
				},
				function (error, result) {
					if (error) reject(error);
					else resolve(result as UploadResponse);
				}
			);
		});
	};

	const Post = z.object({
		desc: z.string().max(140),
		isSensitive: z.boolean().optional(),
	});

	const validatedFields = Post.safeParse({
		desc: desc,
		isSensitive: JSON.parse(isSensitive),
	});

	if (!validatedFields.success) {
		console.log(validatedFields.error.flatten().fieldErrors);
		return { success: false, error: true };
	}

	let image = "";
	let imageHeight = 0;
	let video = "";

	if (file.size) {
		const result: UploadResponse = await uploadFile(file);

		if (result.fileType === "image") {
			image = result.filePath || "";
			imageHeight = result.height ?? 0;
		} else {
			video = result.filePath || "";
		}
	}

	try {
		await prisma.post.create({
			data: {
				...validatedFields.data,
				userId,
				image,
				imageHeight,
				video,
			},
		});

		revalidatePath(`/`);

		return { success: true, error: false };
	} catch (err) {
		console.log("Error while saving comment: ", err);
		return { success: false, error: true };
	}
};

export const followUser = async (targetUserId: string) => {
	try {
		const { userId } = await auth();

		if (!userId) return;

		const existingFollow = await prisma.follow.findFirst({
			where: { followerId: userId, followingId: targetUserId },
		});

		if (existingFollow) {
			await prisma.follow.delete({ where: { id: existingFollow.id } });
		} else {
			await prisma.follow.create({
				data: { followerId: userId, followingId: targetUserId },
			});
		}
	} catch (error) {
		console.error("Error: Could not like the post:", error);
	}
};
