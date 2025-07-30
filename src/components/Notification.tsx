"use client";

import { socket } from "@/socket";
import { Image } from "@imagekit/next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type NotificationType = {
	id: string;
	senderUsername: string;
	type: "LIKE" | "REPOST" | "COMMENT" | "FOLLOW";
	link: string;
};

const Notification = () => {
	const [notifications, setNotifications] = useState<NotificationType[]>([]);
	const [open, setOpen] = useState(false);

	const router = useRouter();

	useEffect(() => {
		socket.on("getNotification", (data: NotificationType) => {
			setNotifications((prev) => [...prev, data]);
		});
	}, []);

	const reset = () => {
		setNotifications([]);
		setOpen(false);
	};

	const handleClick = (notification: NotificationType) => {
		const filteredList = notifications.filter((n) => n.id !== notification.id);
		setNotifications(filteredList);
		setOpen(false);

		router.push(notification.link);
	};

	return (
		<div className="relative">
			<div
				className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4 cursor-pointer"
				onClick={() => setOpen((prev) => !prev)}
			>
				<div className="relative">
					<Image
						src={`/EchoHub/icons/notification.svg`}
						width={24}
						height={24}
						alt="Notification"
					/>
					{notifications.length > 0 && (
						<div className="absolute -top-4 -right-4 w-6 h-6 bg-iconBlue p-2 rounded-full flex items-center justify-center text-white text-sm">
							{notifications.length}
						</div>
					)}
				</div>
				<span className="hidden xxl:inline">Notification</span>
			</div>
			{notifications.length > 0 && open && (
				<div className="absolute -right-full p-4 rounded-lg bg-white text-black flex flex-col gap-4 w-max z-30">
					<h1 className="text-xl text-textGray">Notifications</h1>
					{notifications.map((notification) => (
						<div
							key={notification.id}
							className="cursor-pointer"
							onClick={() => handleClick(notification)}
						>
							<b>{notification.senderUsername}</b>{" "}
							{notification.type === "LIKE"
								? "liked your post"
								: notification.type === "COMMENT"
								? "replied your post"
								: notification.type === "FOLLOW"
								? "followed you"
								: "re-Posted your post"}
						</div>
					))}
					<button
						onClick={reset}
						className="bg-black text-white rounded-lg p-2 text-sm cursor-pointer"
					>
						Mark as read
					</button>
				</div>
			)}
		</div>
	);
};

export default Notification;
