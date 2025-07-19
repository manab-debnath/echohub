import { Image } from "@imagekit/next";
import React from "react";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import { imageKit } from "@/utils";
import Video from "./Video";
import Link from "next/link";

interface FileDetailsResponse {
	width: number;
	height: number;
	filePath: string;
	url: string;
	fileType: string;
	customMetadata?: { sensitive: boolean };
}

const Post = async ({ type }: { type?: "status" | "comment" }) => {
	const getFileDetails = async (
		fileId: string
	): Promise<FileDetailsResponse> => {
		return new Promise((resolve, reject) => {
			imageKit.getFileDetails(fileId, function (error, result) {
				if (error) reject(error);
				else resolve(result as FileDetailsResponse);
			});
		});
	};

	const fileDetails = await getFileDetails("68794c555c7cd75eb8a68f9f");
	console.log("fileDetails \n", fileDetails);

	return (
		<div className="p-4 border-y-[1px] border-borderGray">
			{/* POST TYPE */}
			<div className="flex items-center gap-2 text-sm text-textGray mb-2 font-bold">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
				>
					<path
						fill="#71767b"
						d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
					/>
				</svg>
				<span>Lama Dev reposted</span>
			</div>
			{/* POST CONTENT */}
			{/* <div className="flex gap-4"> */}
			<div className={`flex gap-4 ${type === "status" && "flex-col"}`}>
				{/* AVATAR */}
				<div
					className={`${
						type === "status" && "hidden"
					} relative w-10 h-10 rounded-full overflow-hidden`}
				>
					<Image
						src="/EchoHub/general/avatar.png"
						alt="lama dev"
						fill
						transformation={[{ width: 100, height: 100 }]}
					/>
				</div>
				{/* CONTENT */}
				<div className="flex flex-col flex-1 gap-2">
					{/* TOP */}
					<div className="w-full flex justify-between">
						<Link href={`/lamaWebDev`} className="flex gap-4">
							<div
								className={`${
									type !== "status" && "hidden"
								} relative w-10 h-10 rounded-full overflow-hidden`}
							>
								<Image
									src="/EchoHub/general/avatar.png"
									alt="lama dev"
									fill
									transformation={[{ width: 100, height: 100 }]}
								/>
							</div>
							<div
								className={`flex items-center gap-2 flex-wrap ${
									type === "status" && "flex-col !gap-0 !items-start"
								}`}
							>
								<h1 className="text-md font-bold">Lama Dev</h1>
								<span className="text-textGray text-sm">@lamadev</span>
								{type !== "status" && (
									<span className="text-textGray text-sm">1 day ago</span>
								)}
							</div>
						</Link>
						<PostInfo />
					</div>
					{/* TEXT & MEDIA */}
					<Link href={`/lamaDev/status/123`}>
						<p className={`${type === "status" && "text-lg"}`}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Exercitationem velit eos, ipsam nisi ad tempora, quos nam minima,
							accusamus eius numquam molestias adipisci consequuntur dignissimos
							tenetur quaerat amet. Porro, ducimus!
						</p>
					</Link>
					{fileDetails && fileDetails.fileType === "image" ? (
						<Image
							src={fileDetails.filePath}
							width={fileDetails.width}
							height={fileDetails.height}
							alt=""
							loading="eager"
							className={`rounded-lg ${
								fileDetails.customMetadata?.sensitive ? "blur-lg" : ""
							}`}
						/>
					) : (
						<Video
							src={fileDetails.filePath}
							className={`rounded-lg ${
								fileDetails.customMetadata?.sensitive ? "blur-lg" : ""
							}`}
						/>
					)}
					{type === "status" && (
						<span className="text-textGray text-sm">8:41 PM · Dec 5, 2024</span>
					)}
					<PostInteractions />
				</div>
			</div>
		</div>
	);
};

export default Post;
