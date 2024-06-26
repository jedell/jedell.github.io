// Page that displays a list of blog posts
//
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import LinkedinLogo from "../images/LinkedInLogo";
import { useDarkMode } from "../context/darkmode";
import GithubLogo from "../images/GithubLogo";
import { DarkToggle } from "../components/DarkToggle";
import BlogCard from "../components/BlogCard";
export default function BlogPage() {
	const { blogs } = useLoaderData();
	const { isDarkMode, setIsDarkMode } = useDarkMode();

	return (
		<div className={`${isDarkMode ? "dark bg-gray-900" : ""}`}>
			<header className="lg:fixed md:relative sm:relative pl-4 lg:bg-transparent lg:dark:bg-transparent z-10 dark:text-[#FEFDFB] text-[#333531] dark:bg-gray-900 bg-[#FEFDFB] w-full">
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
				className={`dark:bg-gray-900 dark:text-[#FEFDFB] bg-[#FEFDFB] text-[#333531] pt-2 ${
					isDarkMode ? "dark" : ""
				}`}
			>
				<section className="h-full w-full relative flex flex-col justify-center items-center pl-8 pr-8">
					<div className="flex flex-col content-center items-center text-md lg:w-10/12 md:w-10/12 sm:w-10/12 lg:pt-8 pt-2 pb-8">
						<div
							// if mobile, make it a single column, centered
							className={`flex flex-col justify-left
							gap-4 
							${isDarkMode ? "dark:bg-gray-900" : ""}`}
						>
							{blogs.map((blog, index) => (
								<BlogCard
									title={blog.title}
									image={blog.image}
									date={blog.date}
									slug={blog.id}
									index={index}
								/>
							))}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
