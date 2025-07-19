import { Image } from "@imagekit/next";

const Search = () => {
	return (
		<div className="bg-inputGray py-2 px-4 flex items-center gap-4 rounded-full">
			<Image
				src="/EchoHub/icons/explore.svg"
				width={16}
				height={16}
				alt="search"
			/>
			<input
				type="text"
				placeholder="Search"
				className="bg-transparent outline-none placeholder:text-textGray rounded-full"
			/>
		</div>
	);
};

export default Search;
