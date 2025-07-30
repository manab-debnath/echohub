import LeftBar from "@/components/LeftBar";
import "./globals.css";
import RightBar from "@/components/RightBar";
import { ImageKitProvider } from "@imagekit/next";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/QueryProvider";


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<QueryProvider>
				<html lang="en" suppressHydrationWarning>
					<body>
						<ImageKitProvider
							urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
						>
							{children}
						</ImageKitProvider>
					</body>
				</html>
			</QueryProvider>
		</ClerkProvider>
	);
}
