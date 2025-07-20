import LeftBar from "@/components/LeftBar";
import "./globals.css";
import RightBar from "@/components/RightBar";
import { ImageKitProvider } from "@imagekit/next";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body>
					<ImageKitProvider
						urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
					>
						{children}
					</ImageKitProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
