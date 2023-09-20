import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ title, image, date, index, slug }) {
	// tailwind styles
	// top border unless index is 0
	return (
		<div
			className={`max-w-sm rounded overflow-hidden shadow-lg ${
				index !== 0 ? "border-t-2" : ""
			} dark:shadow-slate-800 dark:bg-gray-900 z-10`}
		>
			<img
				className="w-full h-48 object-cover"
				src={image}
				alt="blog img"
			/>
			<div className="px-6 py-4">
				<div className="font-bold text-l mb-0">{title}</div>
				<p className="text-gray-700 text-base">{date}</p>
			</div>
			<div className="px-6 pt-2 pb-2 flex justify-start">
				<Link
					to={`/blog/${slug}`}
					className="inline-block dark:bg-[#f58282] bg-[#A76031] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
				>
					Read More
				</Link>
			</div>
		</div>
	);
}

export function BlogCardSmall({ title, image, date, index, slug }) {
	// small thin blog card span, thin with image on the left, title along single line
	return (
		<div className="flex flex-row gap-4 w-full justify-between shadow-lg rounded-lg p-4 mb-4 dark:shadow-slate-800 dark:bg-gray-900 z-10">
			<div className="flex flex-row gap-2 content-center items-center">
				<img
					className="w-full h-24 object-cover rounded-lg"
					src={image}
					alt="blog img"
				/>
			</div>
			{/* left align title, date, and read more link */}
			<div className="flex flex-col gap-2 w-full">
				<div className="font-bold text-l">{title}</div>
				<p className="text-gray-700 text-base">{date}</p>
				<Link
					to={`/blog/${slug}`}
					className="inline-block dark:bg-[#f58282] bg-[#A76031] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 self-end"
				>
					Read More
				</Link>
			</div>
		</div>
	);
}
