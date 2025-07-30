"use client";

import { followUser } from "@/action";
import { useOptimistic, useState } from "react";

const FollowButton = ({
	userId,
	isFollowed,
}: {
	userId: string;
	isFollowed: boolean;
}) => {
	const [state, setState] = useState(isFollowed);
	const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
		state,
		(prev) => !prev
	);

	const followAction = async () => {
		switchOptimisticFollow("");
		await followUser(userId);

		setState((prev) => !prev);
	};

	return (
		<form action={followAction}>
			<button
				className={`py-2 px-4 font-bold rounded-full cursor-pointer ${
					optimisticFollow
						? "bg-transparent text-white border-[1px] border-gray-700"
						: "bg-white text-black"
				}`}
			>
				{optimisticFollow ? "Unfollow" : "Follow"}
			</button>
		</form>
	);
};

export default FollowButton;
