// Base component for generic blog posts

import React from "react";
import Latex from "react-latex-next";
import { Link, useLoaderData } from "react-router-dom";
import "katex/dist/katex.min.css";
import { useDarkMode } from "../context/darkmode";
import LinkedinLogo from "../images/LinkedInLogo";
import GithubLogo from "../images/GithubLogo";
import { DarkToggle } from "../components/DarkToggle";

export default function Blog() {
	const { blog } = useLoaderData();
	const { isDarkMode, setIsDarkMode } = useDarkMode();
	return (
		<div
			className={`dark:bg-gray-900 dark:text-[#FEFDFB] bg-[#FEFDFB] text-[#333531] ${
				isDarkMode ? "dark bg-gray-900" : ""
			}`}
		>
			<header className="lg:fixed md:relative sm:relative lg:bg-transparent lg:dark:bg-transparent pl-4 z-10 dark:text-[#FEFDFB] text-[#333531] dark:bg-gray-900 bg-[#FEFDFB] w-full">
				<div className="flex justify-between pb-2">
					<div className="flex flex-row gap-4">
						<div className="font-bold">
							<Link to="/">home</Link>
						</div>
					</div>
					<div className="flex flex-row gap-4 pt-2 pr-4">
						<a
							target="_blank"
							rel="noreferrer"
							href="https://www.linkedin.com/in/joseph-edell-63b267139/"
						>
							<LinkedinLogo
								color={`${isDarkMode ? "#FEFDFB" : "#333531"}`}
								fillColor={`${
									isDarkMode ? "#111827" : "#FEFDFB"
								}`}
							/>
						</a>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://github.com/jedell"
						>
							<GithubLogo
								color={`${isDarkMode ? "#FEFDFB" : "#333531"}`}
							/>
						</a>
						<DarkToggle onToggle={setIsDarkMode} on={isDarkMode} />
					</div>
				</div>
			</header>
			<div
				className={`dark:bg-gray-900 dark:text-[#FEFDFB] bg-[#FEFDFB] text-[#333531] `}
			>
				<section className="h-full w-full relative flex flex-col items-center content-center pl-8 pr-8">
					<div className="flex flex-col content-center items-start m-0 text-md lg:w-7/12 md:w-8/12 sm:w-9/12 lg:pt-8 pt-2 pb-8">
						<div
							// in a row
							className="flex flex-col items-center justify-between w-full"
						>
							<img
								className="pb-4 w-1/2 h-1/2"
								src={blog.image}
								alt="blog post"
							/>
						</div>
						<div className="flex flex-col items-start justify-between w-full">
							<h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
								{blog.title}
							</h1>
							<div className="flex flex-row gap-4">
								{/* date */}
								<div className="text-sm text-base">
									{blog.date}
								</div>
							</div>
						</div>
						<div className="flex flex-col items-start justify-between w-full">
							{blog.content.map((paragraph, index) => (
								<div
									key={index}
									className="flex flex-col items-start justify-between w-full"
								>
									<Latex>{paragraph.text}</Latex>

									<div className="flex flex-row gap-4">
										{paragraph.image && (
											<img
												className="pb-4 w-1/2 h-1/2"
												src={paragraph.image}
												alt="blog post"
											/>
										)}

										{paragraph.code && (
											<pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4">
												<code className="text-sm">
													{paragraph.code}
												</code>
											</pre>
										)}

										{paragraph.list && (
											<ul className="list-disc list-inside">
												{paragraph.list.map(
													(listItem, index) => (
														<li
															key={index}
															className="text-sm"
														>
															{listItem}
														</li>
													)
												)}
											</ul>
										)}

										{paragraph.link && (
											<a
												className="text-sm"
												src={paragraph.link}
											>
												{paragraph.linkText}
											</a>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
