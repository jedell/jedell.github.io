import GithubLogo from "../images/GithubLogo";
import LinkedinLogo from "../images/LinkedInLogo";
import joey from "../images/Removal-127.png";
import ff_report from "../images/ff_report.pdf";
import { useLoaderData } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
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

// smaller svgs for mobile
let SVG_BREAKPOINTS = [
	"m 20 10 h 134.7 l 11.2 0 a 14.7 12.5 90 0 0 -10 14.7 v 82.3 a 14.7 12.5 90 0 1 -12.5 14.7 h -123.4 a 14.7 12.5 90 0 1 -12.5 -14.7 v -82.3 a 14.7 12.5 90 0 1 12.5 -14.7 z",
	"m 14 7 h 94.3 l 7.8 0 a 10.3 8.7 90 0 0 -7 10.3 v 57.6 a 10.3 8.7 90 0 1 -8.8 10.3 h -86.4 a 10.3 8.7 90 0 1 -8.8 -10.3 v -57.6 a 10.3 8.7 90 0 1 8.8 -10.3 z",
	"m 9.8 4.9 h 66 l 5.5 0 a 7.2 6.1 90 0 0 -4.9 7.2 v 40.3 a 7.2 6.1 90 0 1 -6.2 7.2 h -60.5 a 7.2 6.1 90 0 1 -6.2 -7.2 v -40.3 a 7.2 6.1 90 0 1 6.2 -7.2 z",
];

let TEXTBOX_FONT_SIZES = ["7", "8", "10", "15"];

function getSVGbyScreenSize() {
	let width = window.innerWidth;
	if (width < 640) return SVG_BREAKPOINTS[2];
	if (width < 768) return SVG_BREAKPOINTS[1];
	return SVG_BREAKPOINTS[0];
}

function getFontSizeByScreenSize() {
	let width = window.innerWidth;
	if (width < 640) return TEXTBOX_FONT_SIZES[0];
	if (width < 768) return TEXTBOX_FONT_SIZES[1];
	if (width < 1024) return TEXTBOX_FONT_SIZES[2];
	return TEXTBOX_FONT_SIZES[3];
}

function Root() {
	const { isDarkMode, setIsDarkMode } = useDarkMode();

	const { blogs } = useLoaderData();

	return (
		<div className={`${isDarkMode ? "dark bg-gray-900" : ""}`}>
			<header className="fixed pl-4 z-10 dark:text-[#FEFDFB] text-[#333531] dark:bg-gray-900 bg-[#FEFDFB] w-full">
				<div className="flex justify-between pb-2">
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
			<div
				className={`dark:bg-gray-900 dark:text-[#FEFDFB] bg-[#FEFDFB] text-[#333531] `}
			>
				<section
					id={SECTIONS[0]}
					className="h-full w-full relative flex flex-col items-center content-center pl-4 pr-4"
				>
					<div className="flex flex-col content-center items-start m-0 text-md lg:w-7/12 md:w-8/12 sm:w-9/12 lg:pt-8 pt-4 pb-8">
						<div
							// in a row
							className="flex flex-row items-center justify-between w-full"
						>
							{/* add break points for smaller screens */}
							<div className="typing border-r-2 border-[#A76031] dark:border-[#f58282]">
								Hi, I'm Joey!
							</div>
							<div className="hover-container flex flex-row items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="hover-text-box"
								>
									<path
										d={getSVGbyScreenSize()}
										fill="none"
										stroke={
											isDarkMode ? "#f58282" : "#A76031"
										}
										strokeWidth="2"
									/>
									<text
										x="0%"
										y="5%"
										lengthAdjust="spacingAndGlyphs"
										fontSize={getFontSizeByScreenSize()}
										fill={isDarkMode ? "#fff" : "#333531"}
									>
										<tspan x="5%" dy="1.2em">
											Hey! I just
										</tspan>
										<tspan x="5%" dy="1.2em">
											graduated from
										</tspan>
										<tspan x="5%" dy="1.2em">
											NYU!
										</tspan>
									</text>
								</svg>

								<img
									src={joey}
									alt="Joey"
									className="lg:w-56 lg:h-56 md:w-48 md:h-48 sm:w-40 sm:h-40 w-32 h-32 rounded-full mt-4"
								/>
							</div>
						</div>

						<div className="flex flex-col items-start justify-start w-full">
							<b>
								<h2 className="">projects</h2>
							</b>

							<div className="flex flex-col items-center justify-start w-full">
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
					id={SECTIONS[1]}
					className="h-full w-full relative flex flex-col items-center content-center pl-4 pr-4"
				>
					<div className="flex flex-col items-start justify-evenly m-auto space-y-1 text-md lg:w-7/12 md:w-8/12 sm:w-9/12">
						<div className="flex flex-col pb-8">
							<b>
								<h2 className="">about me</h2>
							</b>

							<p>
								- M.S. Computer Science @{" "}
								<a
									className="text-[#A76031] dark:text-[#f58282] underline"
									href="https://www.nyu.edu/"
								>
									New York University
								</a>
							</p>
							<p>
								- B.S. Computer Science and Economics @{" "}
								<a
									className="text-[#A76031] dark:text-[#f58282] underline"
									href="https://www.oberlin.edu/"
								>
									Oberlin College
								</a>
								
							</p>
							<p>
								I am interested in deep learning research broadly, but like to read about natural language processing,
								self-supervised learning, optimization, interpretability and joint-embedding
								models!
							</p>
						</div>
						<div className="flex flex-col pb-8">
							<b>
								<h2 className="">coursework</h2>
							</b>
							<ul className="pl-5 list-disc">{COURSE_ITEMS}</ul>
						</div>
					</div>
				</section>

				<section
					id={SECTIONS[2]}
					className="h-full w-full relative flex flex-col items-center content-center pl-4 pr-4"
				>
					<div className="flex flex-col items-start justify-evenly m-auto space-y-1 pt-4 pb-8 text-md lg:w-7/12 md:w-8/12 sm:w-9/12 ">
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
			<div className="flex flex-col items-end content-center pl-8 pr-4 pb-1 dark:bg-gray-900 dark:text-[#FEFDFB] bg-[#FEFDFB] text-[#333531]">
				<footer className="">jre6163[at]nyu.edu {` `}</footer>
			</div>
		</div>
	);
}

export default Root;
