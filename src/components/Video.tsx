import { Video } from "@imagekit/next";

type VideoTypes = {
	src: string;
	className?: string;
};

export default function Page({ src, className }: VideoTypes) {
	return (
		<Video
			src={src}
			controls
			className={className}
			transformation={[{ width: "1920", height: "1080", quality: 90 }]}
		/>
	);
}
