import { Image } from "@imagekit/next";
import Link from "next/link";
import React from "react";
import Socket from "./Socket";
import Notification from "./Notification";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/prisma";

const menuList = [
	{ id: 1, name: "Home", link: "/", icon: "home.svg" },
	{ id: 2, name: "Explore", link: "/", icon: "explore.svg" },
	// { id: 3, name: "Notification", link: "/", icon: "notification.svg" },
	{ id: 4, name: "Message", link: "/", icon: "message.svg" },
	{ id: 5, name: "Bookmarks", link: "/", icon: "bookmark.svg" },
	{ id: 6, name: "Jobs", link: "/", icon: "job.svg" },
	{ id: 7, name: "Communities", link: "/", icon: "community.svg" },
	{ id: 8, name: "Premium", link: "/", icon: "logo.svg" },
	{ id: 9, name: "Profile", link: `/lamadev`, icon: "profile.svg" },
	{ id: 10, name: "More", link: "/", icon: "more.svg" },
];

const LeftBar = async () => {
	const { userId } = await auth();

	if (!userId) return;

	const user = await prisma.user.findFirst({ where: { id: userId } });

	return (
		<div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
			{/* LOGO, MENU, BUTTON */}
			<div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
				{/* LOGO */}
				<Link href="/" className="p-2 rounded-full hover:bg-[#181818]">
					<Image
						src="/EchoHub/icons/logo.svg"
						alt="logo"
						width={24}
						height={24}
					/>
				</Link>
				{/* MENU LIST */}
				<div className="flex flex-col gap-4">
					{menuList.map((item, index) => (
						<div key={item.id || index}>
							{index === 2 && (
								<div>
									<Notification />
								</div>
							)}
							<Link
								href={
									item.name === "Profile" ? `/${user?.username}` : item.link
								}
								className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
							>
								<Image
									src={`/EchoHub/icons/${item.icon}`}
									width={24}
									height={24}
									alt={item.name}
								/>
								<span className="hidden xxl:inline">{item.name}</span>
							</Link>
						</div>
					))}
				</div>
				{/* BUTTON */}
				<Link
					href="/compose/post"
					className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center xxl:hidden"
				>
					<Image
						src="/EchoHub/icons/post.svg"
						width={24}
						height={24}
						alt="new post"
					/>
				</Link>
				<Link
					href="/compose/post"
					className="hidden xxl:block bg-white text-black rounded-full font-bold py-2 px-20"
				>
					Post
				</Link>
			</div>
			<Socket />
			{/* USER */}
			<div className="flex items-center justify-between rounded-full cursor-pointer xxl:hover:bg-[#181818]">
				<div className="flex items-center gap-2 xxl:m-4">
					<div className="w-10 h-10 relative rounded-full overflow-hidden">
						<Image
							src="/EchoHub/general/avatar.png"
							alt="lama dev"
							fill
							transformation={[{ width: 100, height: 100 }]}
						/>
					</div>
					<div className="hidden xxl:flex flex-col">
						<span className="font-bold">Lama Dev</span>
						<span className="text-sm text-textGray">@lamaWebDev</span>
					</div>
				</div>
				<div className="hidden xxl:block cursor-pointer font-bold xxl:m-4">
					<Image
						src="/EchoHub/icons/more.svg"
						width={24}
						height={24}
						alt="more"
					/>
				</div>
			</div>
		</div>
	);
};

export default LeftBar;
