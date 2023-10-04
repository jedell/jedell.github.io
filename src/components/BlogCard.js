import React from "react";
import { Link } from "react-router-dom";

// New Button component
const ReadMoreButton = ({ slug }) => (
	<Link
		to={`/blog/${slug}`}
		className="inline-block border-2 border-[#A76031] dark:border-[#f58282] rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 self-end transition duration-200"
	>
		Read More
	</Link>
);

export default function BlogCard({ title, image, date, index, slug }) {
	// tailwind styles
	// top border unless index is 0
	// added neomorphic shadows for both light and dark mode
	return (
		<div
			className={`max-w-sm rounded overflow-hidden shadow-lg ${
				index !== 0 ? "border-t-2" : ""
			} dark:shadow-slate-800 dark:bg-gray-900 bg-[#FEFDFB] z-11 dark:shadow-2xl shadow-2xl`}
		>
			<img
				className="w-full h-48 object-cover"
				src={image}
				alt="blog img"
			/>
			<div className="px-6 py-4">
				<div className="font-bold text-l mb-0 h-14">
					<p className="line-clamp-2 overflow-ellipsis">{title}</p>
				</div>
			</div>
			<div className="px-6 pt-2 pb-2 flex justify-start">
				<ReadMoreButton slug={slug} />
			</div>
		</div>
	);
}

export function BlogCardSmall({ title, image, date, index, slug }) {
	// small thin blog card span, thin with image on the left, title along single line
	return (
		<div className="flex flex-row gap-4 w-full justify-between shadow-lg rounded-lg p-4 mb-4 dark:shadow-slate-800 dark:bg-gray-900 bg-[#FEFDFB] z-1 items-center">
			<div className="flex flex-row gap-2 content-center items-center">
				<img
					className="w-full h-24 object-cover rounded-lg"
					src={image}
					alt="blog img"
				/>
			</div>
			{/* left align title, date, and read more link */}
			<div className="flex flex-col gap-2 w-full justify-center">
				<div className="font-bold text-l">{title}</div>
				<ReadMoreButton slug={slug} />
			</div>
		</div>
	);
}


