"use client";

import { addPost } from "@/action";
import { Image } from "@imagekit/next";
import NextImage from "next/image";
import React, { useActionState, useEffect, useRef, useState } from "react";
import ImageEditor from "./ImageEditor";
import { useUser } from "@clerk/nextjs";

const Share = () => {
	const [media, setMedia] = useState<File | null>(null);
	const [isEditorOpen, setIsEditorOpen] = useState(false);
	const [settings, setSettings] = useState<{
		type: "original" | "wide" | "square";
		sensitive: boolean;
	}>({
		type: "original",
		sensitive: false,
	});
	console.log("media", media);

	const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setMedia(e.target.files[0]);
		}
	};

	const previewURL = media ? URL.createObjectURL(media) : null;

	const { user } = useUser();
	const [state, formAction, isPending] = useActionState(addPost, {
		success: false,
		error: false,
	});

	const formRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		if (state.success) {
			formRef.current?.reset();
			setMedia(null);
			setSettings({ type: "original", sensitive: false });
		}
	}, [state]);

	return (
		<form ref={formRef} className="p-4 flex gap-4" action={formAction}>
			{/* AVATAR */}
			<div className="relative w-10 h-10 rounded-full overflow-hidden">
				<Image
					src={user?.imageUrl || "/EchoHub/general/avatar.png"}
					alt=""
					fill
					transformation={[{ width: 100, height: 100 }]}
				/>
			</div>
			{/* OTHERS */}
			<div className="flex flex-col flex-1 gap-4">
				<input
					type="text"
					name="imageType"
					value={settings.type}
					hidden
					readOnly
				/>
				<input
					type="text"
					name="isSensitive"
					value={settings.sensitive ? "true" : "false"}
					hidden
					readOnly
				/>
				<input
					type="text"
					name="desc"
					placeholder="What is happening?!"
					className="bg-transparent outline-none placeholder:text-textGray text-xl"
				/>
				{/* PREVIEW IMAGE */}
				{media?.type.includes("image") && previewURL && (
					<div className="relative rounded-xl overflow-hidden">
						<NextImage
							src={previewURL}
							width={600}
							height={600}
							alt=""
							className={`w-full ${
								settings.type === "original"
									? "h-full object-contain"
									: settings.type === "square"
									? "aspect-square object-cover"
									: "aspect-video object-cover"
							}}`}
						/>
						<div
							className="absolute top-2 left-2 bg-black/50 text-white font-bold py-1 px-4 text-sm rounded-2xl cursor-pointer"
							onClick={() => setIsEditorOpen(true)}
						>
							Edit
						</div>
						<div
							className="absolute top-2 right-2 bg-black/50 text-white font-bold p-2 rounded-full cursor-pointer"
							onClick={() => setMedia(null)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
							>
								<path
									fill="white"
									d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"
								/>
							</svg>
						</div>
					</div>
				)}
				{media?.type.includes("video") && previewURL && (
					<div className="relative">
						<video src={previewURL} controls />
						<div
							className="flex justify-center items-center absolute top-2 right-2 h-8 w-8 text-white font-bold text-sm bg-black/50 rounded-full cursor-pointer"
							onClick={() => setMedia(null)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
							>
								<path
									fill="white"
									d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"
								/>
							</svg>
						</div>
					</div>
				)}
				{isEditorOpen && previewURL && (
					<ImageEditor
						onClose={() => setIsEditorOpen(false)}
						previewURL={previewURL}
						settings={settings}
						setSettings={setSettings}
					/>
				)}
				<div className="flex justify-between items-center flex-wrap gap-4">
					{/* ICONS */}
					<div className="flex flex-wrap gap-4">
						<input
							type="file"
							onChange={handleMediaChange}
							className="hidden"
							id="file"
							name="file"
							accept="image/*,video/*"
						/>
						<label htmlFor="file">
							<Image
								src="/EchoHub/icons/image.svg"
								alt=""
								width={20}
								height={20}
								className="cursor-pointer"
							/>
						</label>
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
					{/* BUTTON */}
					<button
						className="bg-white text-black font-bold rounded-full px-4 py-2 cursor-pointer disabled:cursor-not-allowed"
						disabled={isPending}
					>
						{isPending ? "Posting" : "Post"}
					</button>
					{state.error && (
						<span className="text-red-300 p-4">Something went wrong!</span>
					)}
				</div>
			</div>
		</form>
	);
};

export default Share;
