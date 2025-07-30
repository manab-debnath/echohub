import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ik.imagekit.io",
				port: "",
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "50mb",
		},
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
