import React, { useEffect, useState } from "react";
import GithubLogo from "../images/GithubLogo";
import LinkedinLogo from "../images/LinkedInLogo";
import joey from "../images/Removal-127.png";
import ff_report from "../images/ff_report.pdf";
import { useLoaderData } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useDarkMode } from "../context/darkmode";
import { DarkToggle } from "../components/DarkToggle";
import { BlogCardSmall } from "../components/BlogCard";

let SECTIONS = ["", "about", "projects"];
let COURSES = [
	<>
		<a
			href="https://atcold.github.io/pytorch-Deep-Learning/"
			className="text-[#A76031] dark:text-[#f58282] underline"
		>
			Deep Learning
		</a>
		, Yann LeCun & Alfredo Canziani
	</>,
	"Machine Learning, Rajesh Ranganath ",
	"Machine Learning in Healthcare, Sumit Chopra",
	"Artificial Intellegence, Paul Bethe",
	"Natural Language Processing, He He",
	"Distributed Systems",
	"Computer Graphics",
];
let COURSE_ITEMS = COURSES.map((i) => <li key={i}>{i}</li>);

function Root() {
	const { isDarkMode, setIsDarkMode } = useDarkMode();

	const { blogs } = useLoaderData();

	return (
		<div className={`${isDarkMode ? "dark bg-gray-900" : ""}`}>
			<header className="fixed z-10 dark:text-[#FEFDFB] text-[#333531] dark:bg-gray-900 bg-[#FEFDFB] w-full">
				<div className="flex justify-between">
					<div className="flex flex-row gap-4">
						<div className="font-bold">
							<Link className="" to={"/#" + SECTIONS[0]}>
								{SECTIONS[0]}
							</Link>
						</div>
						<div className="font-bold">
							<Link className="" to={"/#" + SECTIONS[1]}>
								{SECTIONS[1]}
							</Link>
						</div>
						<div className="font-bold">
							<Link to="/projects">{SECTIONS[2]}</Link>
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
			{/* <div className="hover-container fixed top-0 left-0 items-center z-50" style={{width: 0, height: 0}}> */}
			<img
				src={joey}
				alt="Joey"
				className="lg:w-56 lg:h-56 md:w-32 md:h-32 sm:w-24 sm:h-24 w-24 h-24 rounded-full mt-4"
				style={{ position: "absolute", top: 12, right: 0 }}
			/>
			{/* </div> */}
			<div
				className={`dark:bg-gray-900 dark:text-[#FEFDFB] bg-[#FEFDFB] text-[#333531] pt-8`}
			>
				<section
					id={SECTIONS[0]}
					className="h-full w-full relative flex flex-col items-center content-center pl-4 pr-4"
				>
					<div className="flex flex-col content-center items-start m-0 text-sm lg:w-7/12 md:w-8/12 sm:w-9/12 lg:pt-4 pt-4 pb-4">
						<div
							// in a row
							className="flex flex-row items-center justify-between w-full"
						>
							{/* add break points for smaller screens */}
							<div className="flex flex-row items-center justify-between w-full pb-8">
								<div className="typing border-r-2 border-[#A76031] dark:border-[#f58282]">
									<h2>{`Welcome... 👋`}</h2>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					id={SECTIONS[1]}
					className="h-full w-full relative flex flex-col items-center content-center pl-4 pr-4"
				>
										<div className="flex flex-col content-center items-start m-0 text-sm lg:w-7/12 md:w-8/12 sm:w-9/12 pb-8">

					<div className="flex flex-col items-start justify-start w-full">
						<b>
							<h2 className="">read</h2>
						</b>

						<div className="flex flex-col justify-start w-full">
							{blogs.slice(0, 3).map((blog) => (
								<BlogCardSmall
									key={blog.id}
									title={blog.title}
									date={blog.date}
									slug={blog.id}
									index={blog.index}
									image={blog.image}
								/>
							))}
						</div>
					</div>
					</div>
				</section>

				<section
					id={SECTIONS[2]}
					className="h-full w-full relative flex flex-col items-center content-center pl-4 pr-4"
				>
					<div className="flex flex-col items-start justify-evenly m-auto space-y-1 pt-4 pb-8 text-sm lg:w-7/12 md:w-8/12 sm:w-9/12 ">
						<b>
							<h2 className="">projects</h2>
						</b>
						<ul className="pl-5 list-disc">
							<li>
								<a
									href={ff_report}
									target="_blank"
									rel="noreferrer"
									className="text-[#A76031] dark:text-[#f58282] underline"
								>
									Evaluation of the Forward-Forward Algorithm
									for Sentiment Classification
								</a>
							</li>
							<li>
								<a
									className="text-[#A76031] dark:text-[#f58282] underline"
									href="https://github.com/jedell/miruvor"
								>
									Distributed key-value store
								</a>{" "}
								in Elixir implementing the Raft consensus
								protocol
							</li>
							<li>
								Planet generator in C++ using{" "}
								<a
									className="text-[#A76031] dark:text-[#f58282] underline"
									href="https://www.raylib.com/"
								>
									raylib
								</a>
							</li>
							<li>
								Business formation rate predictions using LSTM
								networks in Python and{" "}
								<a
									className="text-[#A76031] dark:text-[#f58282] underline"
									href="https://www.tensorflow.org/"
								>
									Tensorflow
								</a>
							</li>
							<li>
								Generic{" "}
								<a
									className="text-[#A76031] dark:text-[#f58282] underline"
									href="https://en.wikipedia.org/wiki/Markov_decision_process"
								>
									Markov process
								</a>{" "}
								solver in C++
							</li>
							<li>
								Audio visualizer with React and{" "}
								<a
									className="text-[#A76031] dark:text-[#f58282] underline"
									href="https://threejs.org/"
								>
									Three.js
								</a>
							</li>
						</ul>
					</div>
				</section>
			</div>
			<div className="flex flex-col items-end content-center pl-8 pr-4 pb-1 dark:bg-gray-900 dark:text-[#FEFDFB] bg-[#FEFDFB] text-[#333531] fixed bottom-0 w-full">
				<footer className="">jre6163[at]nyu.edu {` `}</footer>
			</div>
		</div>
	);
}

export default Root;
