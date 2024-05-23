import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ title, slug }) {
	return (
		<div className="my-2">
			<Link
				to={`/projects/${slug}`}
				className="text-[#A76031] dark:text-[#f58282] transition duration-200 ease-in-out"
			>
				📄 {title}
			</Link>
		</div>
	);
}

export function BlogCardSmall({ title, slug }) {
	return (
		<div className="my-1">
			<Link
				to={`/projects/${slug}`}
				className="[#A76031] dark:text-[#f58282] transition duration-200 ease-in-out"
			>
				📄 {title}
			</Link>
		</div>
	);
}



