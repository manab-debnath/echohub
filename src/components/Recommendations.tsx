import { Image } from "@imagekit/next";
import Link from "next/link";
import React from "react";

const Recommendations = () => {
	return (
		<div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
			{/* USER CARD */}
			<div className="flex items-center justify-between">
        {/* IMAGE AND USER INFO */}
				<div className="flex gap-2 items-center">
					<div className="relative w-10 h-10 rounded-full overflow-hidden">
						<Image
							src="/EchoHub/general/avatar.png"
							alt="Jhon Doe"
							transformation={[{ width: 100, height: 100 }]}
							fill
						/>
					</div>
					<div className="">
						<h1 className="text-white font-bold text-md">Jhon Doe</h1>
						<span className="text-textGray text-sm">@jhonDoe</span>
					</div>
				</div>
        {/* BUTTON */}
        <button className="px-4 py-1 rounded-full bg-white text-black font-semibold cursor-pointer">Follow</button>
			</div>
      	<div className="flex items-center justify-between">
        {/* IMAGE AND USER INFO */}
				<div className="flex gap-2 items-center">
					<div className="relative w-10 h-10 rounded-full overflow-hidden">
						<Image
							src="/EchoHub/general/avatar.png"
							alt="Jhon Doe"
							transformation={[{ width: 100, height: 100 }]}
							fill
						/>
					</div>
					<div className="">
						<h1 className="text-white font-bold text-md">Jhon Doe</h1>
						<span className="text-textGray text-sm">@jhonDoe</span>
					</div>
				</div>
        {/* BUTTON */}
        <button className="px-4 py-1 rounded-full bg-white text-black font-semibold cursor-pointer">Follow</button>
			</div>
      	<div className="flex items-center justify-between">
        {/* IMAGE AND USER INFO */}
				<div className="flex gap-2 items-center">
					<div className="relative w-10 h-10 rounded-full overflow-hidden">
						<Image
							src="/EchoHub/general/avatar.png"
							alt="Jhon Doe"
							transformation={[{ width: 100, height: 100 }]}
							fill
						/>
					</div>
					<div className="">
						<h1 className="text-white font-bold text-md">Jhon Doe</h1>
						<span className="text-textGray text-sm">@jhonDoe</span>
					</div>
				</div>
        {/* BUTTON */}
        <button className="px-4 py-1 rounded-full bg-white text-black font-semibold cursor-pointer">Follow</button>
			</div>
			<Link href="/" className="text-iconBlue cursor-pointer">
				Show more
			</Link>
		</div>
	);
};

export default Recommendations;
