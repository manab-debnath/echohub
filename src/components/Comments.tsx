import React from "react";
import Post from "./Post";
import { Image } from "@imagekit/next";

const Comments = () => {
	return (
		<div className="">
			<form className="flex justify-between items-center gap-4 p-4">
				<div className="relative w-10 h-10 rounded-full overflow-hidden">
					<Image
						src="/EchoHub/general/avatar.png"
						alt="avatar"
						fill
						transformation={[{ width: 100, height: 100 }]}
					/>
				</div>
				<input
					type="text"
                    placeholder="Post your reply"
					className="flex-1 bg-transparent outline-none p-2 text-xl"
				/>
				<button className="py-2 px-4 text-black bg-white font-bold rounded-full">
					Reply
				</button>
			</form>
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
		</div>
	);
};

export default Comments;
