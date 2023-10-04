// Base component for generic blog posts

import React from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Link, useLoaderData } from "react-router-dom";
import { useDarkMode } from "../context/darkmode";
import LinkedinLogo from "../images/LinkedInLogo";
import GithubLogo from "../images/GithubLogo";
import { DarkToggle } from "../components/DarkToggle";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	materialDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

// Header Section Component
const HeaderSection = ({ isDarkMode, setIsDarkMode }) => (
	<header className="fixed bg-transparent pl-4 z-20 dark:text-[#FEFDFB] text-[#333531] dark:bg-gray-900 bg-[#FEFDFB] w-full">
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
						fillColor={`${isDarkMode ? "#111827" : "#FEFDFB"}`}
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
);

// Link Card Component
const LinkCard = ({ link }) => {
	const { isDarkMode } = useDarkMode();
	const url = new URL(link);
	const siteTitle = url.hostname;

	return (
		<a href={link} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-start border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4">
			<img src={`https://www.google.com/s2/favicons?domain=${link}`} alt="Link icon" className="w-8 h-8 mr-4" />
			<div className="text-sm dark:text-white">{siteTitle}</div>
		</a>
	);
};



// Title Component
const Title = ({ blog }) => (
	<div className="flex flex-col items-start justify-between w-full pb-4 pt-4">
		<ReactMarkdown>{"# " + blog.title}</ReactMarkdown>
		<LinkCard
		link={"https://github.com/jedell/transformers/blob/10c57f601571d739d3359b4779fc46365c17bb5b/src/transformers/generation/utils.py#L2324C5-L2324C5"}
		/>
	</div>
);

// Content Component
const Content = React.forwardRef(({ paragraph }, ref) => {
	const { isDarkMode } = useDarkMode();
	const markdownRef = React.useRef(ref || null);

	React.useEffect(() => {
		if (markdownRef.current) {
			const pElements = markdownRef.current.querySelectorAll("p");
			pElements.forEach((p) => {
				const katexSpans = p.querySelectorAll(".katex");
				katexSpans.forEach((span) => {
					if (span.textContent === p.textContent) {
						span.style.display = "flex";
						span.style.justifyContent = "center";
						span.style.alignItems = "center";
						
					}
				});
			});
		}
	}, []);

	return (
		<>
			{paragraph.text && (
				<div ref={markdownRef}>
					<ReactMarkdown
						remarkPlugins={[remarkMath]}
						rehypePlugins={[rehypeKatex]}
						components={{
							code({
								node,
								inline,
								className,
								children,
								...props
							}) {
								const match = /language-(\w+)/.exec(
									className || ""
								);
								return !inline && match ? (
									<SyntaxHighlighter
										{...props}
										children={String(children).replace(
											/\n$/,
											""
										)}
										style={
											isDarkMode
												? materialDark
												: materialDark
										}
										language={match[1]}
										wrapLines={true}
										lineProps={{
											style: {
												wordBreak: "break-all",
												whiteSpace: "pre-wrap",
											},
										}}
										showLineNumbers={false}								
										customStyle={{
											borderRadius: "0.375rem",
											padding: "1.5rem",
										}}

										PreTag="div"
									/>
								) : (
									<code {...props} className={className}>
										{children}
									</code>
								);
							},
						}}
					>
						{paragraph.text}
					</ReactMarkdown>
				</div>
			)}
			{paragraph.latex && <Latex>{paragraph.latex}</Latex>}
			{paragraph.image && (
				<img
					className="pb-4 w-full h-auto"
					src={paragraph.image}
					alt="blog post"
				/>
			)}
			{paragraph.code && (
				<pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4">
					<code className="text-sm">{paragraph.code}</code>
				</pre>
			)}
			{paragraph.list && (
				<ul className="list-disc list-inside">
					{paragraph.list.map((listItem, index) => (
						<li key={index} className="text-sm">
							{listItem}
						</li>
					))}
				</ul>
			)}
			{paragraph.link && (
				<a className="text-sm" href={paragraph.link}>
					{paragraph.linkText}
				</a>
			)}
		</>
	);
});

// Body Section Component
const BodySection = ({ blog }) => (
	<div
		className={`dark:bg-gray-900 dark:text-[#FEFDFB] bg-[#FEFDFB] text-[#333531] `}
	>
		<section className="h-full w-full relative flex flex-col items-center content-center pl-4 pr-4">
			<div className="flex flex-col content-center items-start m-0 text-md w-full pt-2 pb-8">
				{/* <div
					// in a row
					className="flex flex-col items-center justify-between w-full"
				>
					<img
						className="pb-4 w-1/2 h-auto" // Changed w-full to w-1/2 to make the image smaller
						src={blog.image}
						alt="blog post"
					/>
				</div> */}
				<Title blog={blog} />
				<div className="flex flex-col items-start justify-between w-full">
					{blog.content.map((paragraph, index) => (
						<div
							key={index}
							className="flex flex-col items-start justify-between w-full"
						>
							<Content paragraph={paragraph} />
						</div>
					))}
				</div>
			</div>
		</section>
	</div>
);

export default function Blog() {
	const { blog } = useLoaderData();
	const { isDarkMode, setIsDarkMode } = useDarkMode();
	return (
		<div
			className={`dark:bg-gray-900 dark:text-[#FEFDFB] bg-[#FEFDFB] text-[#333531] ${
				isDarkMode ? "dark bg-gray-900" : ""
			}`}
		>
			<HeaderSection
				isDarkMode={isDarkMode}
				setIsDarkMode={setIsDarkMode}
			/>
			<BodySection blog={blog} />
		</div>
	);
}
