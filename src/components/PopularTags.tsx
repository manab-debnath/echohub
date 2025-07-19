import { Image } from "@imagekit/next";
import Link from "next/link";
import React from "react";

const PopularTags = () => {
	return (
		<div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
			<h1 className="text-xl font-bold text-textGrayLight">
				{"What's"} Happening
			</h1>
			{/* TREND EVENT */}
			<div className="flex gap-4">
				<div className="relative w-20 h-20 rounded-xl overflow-hidden">
					<Image
						src="/EchoHub/general/post.jpeg"
						alt="event"
						fill
						transformation={[{ width: 120, height: 120 }]}
					/>
				</div>
				<div className="flex-1">
					<h1 className="font-bold text-textGrayLight">
						Lorem ipsum dolor sit.
					</h1>
					<span className="text-sm text-textGray">Last Night</span>
				</div>
			</div>
			{/* TOPICS */}
			<div className="">
				<div className="flex items-center justify-between">
					<span className="text-textGray text-sm">Technology • Trends</span>
					<Image
						src="/EchoHub/icons/infoMore.svg"
						width={16}
						height={16}
						alt="info"
					/>
				</div>
				<h2 className="text-textGrayLight font-bold">OpenAi</h2>
				<span className="text-sm text-textGray">20K posts</span>
			</div>
			<div className="">
				<div className="flex items-center justify-between">
					<span className="text-textGray text-sm">Technology • Trends</span>
					<Image
						src="/EchoHub/icons/infoMore.svg"
						width={16}
						height={16}
						alt="info"
					/>
				</div>
				<h2 className="text-textGrayLight font-bold">OpenAi</h2>
				<span className="text-sm text-textGray">20K posts</span>
			</div>
			<div className="">
				<div className="flex items-center justify-between">
					<span className="text-textGray text-sm">Technology • Trends</span>
					<Image
						src="/EchoHub/icons/infoMore.svg"
						width={16}
						height={16}
						alt="info"
					/>
				</div>
				<h2 className="text-textGrayLight font-bold">OpenAi</h2>
				<span className="text-sm text-textGray">20K posts</span>
			</div>
			<div className="">
				<div className="flex items-center justify-between">
					<span className="text-textGray text-sm">Technology • Trends</span>
					<Image
						src="/EchoHub/icons/infoMore.svg"
						width={16}
						height={16}
						alt="info"
					/>
				</div>
				<h2 className="text-textGrayLight font-bold">OpenAi</h2>
				<span className="text-sm text-textGray">20K posts</span>
			</div>
			<Link href="/" className="text-iconBlue cursor-pointer">
				Show more
			</Link>
		</div>
	);
};

export default PopularTags;
