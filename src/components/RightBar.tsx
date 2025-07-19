import React from "react";
import Search from "./Search";
import PopularTags from "./PopularTags";
import Recommendations from "./Recommendations";
import Link from "next/link";

const RightBar = () => {
	return (
		<div className="flex flex-col gap-4 top-4 h-max sticky">
			<Search />
			<PopularTags />
			<Recommendations />
			<div className="text-textGray text-xs flex flex-wrap gap-x-4">
				<Link href="/">Terms of Services</Link>
				<Link href="/">Privacy Policy</Link>
				<Link href="/">Cookie Policy</Link>
				<Link href="/">Accessibility</Link>
				<Link href="/">Ads Info</Link>
				<span>© 2025 L Corp.</span>
			</div>
		</div>
	);
};

export default RightBar;
