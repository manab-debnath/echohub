import Comments from "@/components/Comments";
import Post from "@/components/Post";
import { Image } from "@imagekit/next";
import Link from "next/link";

const StatusPage = () => {
	return (
		<div className="">
			<div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-black/50">
				<Link href="/">
					<Image
						src="/EchoHub/icons/back.svg"
						alt="back"
						width={24}
						height={24}
					/>
				</Link>
				<h1 className="font-bold text-lg">Lama Dev</h1>
			</div>
			<Post type="status" />
			<Comments />
		</div>
	);
};

export default StatusPage;
