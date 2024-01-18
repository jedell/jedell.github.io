import React, { useEffect, useState, useRef } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import Tokens from "../components/Tokens";

const LoadingIndicator = () => {
	const [loadingPattern, setLoadingPattern] = useState(".");

	useEffect(() => {
		const interval = setInterval(() => {
			setLoadingPattern((prevPattern) => {
				switch (prevPattern) {
					case ".":
						return "..";
					case "..":
						return "...";
					case "...":
						return ".";
					default:
						return ".";
				}
			});
		}, 100);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex">
			<div className="text-blue-500">{loadingPattern}</div>
		</div>
	);
};

const Spinner = ({ size = "h-5 w-5" }) => {
	return (
		<svg className={`animate-spin ${size} mr-3 ...`} viewBox="0 0 24 24">
			<path
				className="opacity-75"
				fill="rgba(200, 200, 200)"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
	);
};

const PulseAnimation = () => {
	return (
		<ol className="list-decimal list-inside">
			{[1, 2, 3, 4, 5].map((value, index) => (
				<div key={index} className="mb-4">
					<li key={index} className="mb-2 relative group">
						<span
							className="animate-pulse font-bold text-black p-1 rounded"
							style={{
								backgroundColor: `rgba(200, 200, 200, ${0.75})`,
							}}
						>
							{
								"\u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0"
							}
						</span>
					</li>
				</div>
			))}
		</ol>
	);
};

const prompts = [
	"Once upon a time, there was a girl name Alice. Alice enjoyed many things. One of the things Alice enjoyed was playing outside.",
	`Emily and Benjamin were exploring the woods behind their house when they stumbled upon an old, weathered book. It was dusty and had a mysterious aura about it, sparking their curiosity instantly. Benjamin turned to Emily, "What should we do with the book?" Emily pondered for a moment, then declared, "Let's take it to Grandma and Grandpa!" With that, they dashed off, their hearts pounding with anticipation, eager to unveil their discovery. They burst into their grandparents' home, exclaiming, "Grandma, Grandpa! Look what we found!" Their grandparents were taken aback and inquired, "Where did you find this old book?`,
    "Once upon a time, there was a small child named Lily. She enjoyed playing with her dolls and observing the butterflies in her garden. Lily had a large, fluffy bunny that she adored immensely. One day, Lily's bunny seemed gloomy. Lily couldn't understand why her bunny was feeling down.",
    "The sun was beaming down as Peter emerged from his small cottage. He was a naive boy who took great pleasure in frolicking and playing games. He had an old rug that he used as a cape, often pretending to be a knight. Peter always longed for a playmate, but there was no one in sight. With a sigh, he resolved to seek out a companion. As he ventured out of the village, he overheard two voices, one of which was distinctly familiar. It was the voice of his neighbor, elderly Mrs. Smith. Peter crept closer, concealing himself behind a tree and peered through the leaves. Mrs. Smith and a stranger were in conversation, and the stranger appeared to be upset about something. Suddenly, the stranger raised his voice and advanced towards Mrs. Smith.",
    `Frank the frog was very troubled. His fountain had broken and he was sure no one could fix it. One day Frank's best friend Sam the snail came to visit him. Sam asked, "What's wrong Frank?" Frank said sadly, "My fountain is broken and I can't fix it." But Sam had a plan! He said, "If you come with me I might know someone who can help you fix your fountain." So Frank and Sam went out into the woods, looking for help. And soon they found Snail Bob!`,
]

const InfluenceDemo = () => {
	const [prompt, setPrompt] = useState(prompts[0]);
	const [selectedPrompt, setSelectedPrompt] = useState(0);
	const [query, setQuery] = useState("");
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchDataOnMount = async () => {
			// const response = await fetch(`${process.env.PUBLIC_URL}/content/influences-tokenwise-sample.json`)
			// 	.then(data => data.json());
			
			setPrompt(prompts[selectedPrompt])
		};

		fetchDataOnMount();
	}, []);

	const processResponse = (response, index) => {

		setPrompt(prompts[index])
		console.log(response)
		let fullQuery = response.influences[index].query;
		setQuery(fullQuery.slice(prompts[index].length))

		let samples = response.influences[index].samples;
		const maxInfluence = Math.max(
			...samples.map((sample) => sample.influence)
		);
		const minInfluence =
			Math.min(
				...samples.map((sample) => sample.influence)
			) / 1.05;

		const norm_influences = samples.map((sample) => {
			let normInfluence = (sample.influence - minInfluence) / (maxInfluence - minInfluence);

			return {
				...sample,
				normValue: normInfluence
			};
		});
		norm_influences.sort((a, b) => b[1] - a[1]);
		
		setData(norm_influences);
	}

	const fetchData = async (userPrompt, index=null) => {
		setLoading(true);
		// setQuery(userPrompt); // Set query to prompt initially

		setTimeout( async () => {
			const response = await fetch(`${process.env.PUBLIC_URL}/content/influences-tokenwise-sample.json`)
			.then(data => data.json())

			processResponse(response, selectedPrompt)

			setLoading(false);
		}, 1200);
	};

	const CustomInput = React.forwardRef(({ value, onChange, placeholder }, ref) => {
		return (
			<div className="relative w-full">
				<textarea
					ref={ref}
					className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full"
					value={value}
					onChange={(e) => {
						onChange(e);
					}}
					rows={3}
				/>
				{(!value) ?
					<div className="absolute left-2 top-2.5 text-gray-400" style={{pointerEvents: "none"}}>
						{<Latex>{placeholder}</Latex>}
					</div>
					:
					<></>
				}
			</div>
		);
	});

	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [prompt]);

	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex flex-col justify-center p-12">
				<div className="mb-4">
					<h2>
						∴ Influence Demo
					</h2>
					<p className="text-sm">
						<i>Precalculated queries (<Latex>{`$z_q$`}</Latex>)</i>
					</p>
					<div className="flex flex-wrap">
						{prompts.map((item, index) => (
							<div 
								key={index} 
								className={`p-2 m-2 border-2 ${selectedPrompt === index ? 'border-blue-500' : 'border-gray-300'} rounded-md cursor-pointer`} 
								onClick={() => setSelectedPrompt(index)}
							>
								{index}
							</div>
						))}
					</div>
					<span className="font-bold text-xl">Prompt (<Latex>{`$z_p$`}</Latex>): </span>
					
					<div className="flex flex-row mt-4">
						<CustomInput
							ref={inputRef}
							value={prompts[selectedPrompt]}
							onChange={(e) => setPrompt(e.target.value)}
							placeholder={`Prompt ($z_p$)`}
						/>						
						{loading ? (
							<div className="flex ml-4">
								<Spinner size="h-10 w-10" />
							</div>
						) : (
							<button
								onClick={() => fetchData(prompt)}
								className={`p-2 ml-4 bg-[#0064FF] h-11 text-black rounded-md hover:text-white transition duration-200 ease-in-out ${!prompt && 'opacity-50 cursor-not-allowed'}`}
								// disabled={!prompt}
							>
								Calculate
							</button>
						)}
					</div>
				</div>
				<>
				<div>
					<span className="font-bold text-xl">Completion (<Latex>{`$z_c$`}</Latex>): </span>
					
					</div>
					<div className="mb-4 p-2 border-2 border-gray-300 rounded-md">
						{loading ? (
							<div className="flex flex-row">
								{query} <LoadingIndicator />{" "}
							</div>
						) : (
							query || "\u00A0"
						)}
					</div>
					<span className="font-bold text-xl">Top Samples:</span>
					{loading ? (
						<PulseAnimation />
					) : (
						<>
							<div className="mb-4 mt-4">
								{data.map((sample, index) => (
									<div key={index} className="mb-4">
										<span
											className="font-bold text-black p-1 rounded"
											style={{
												backgroundColor: `rgba(0, 255, 0, ${sample.normValue})`,
												paddingRight: `${sample.normValue * 100}px`,
											}}
										>
										</span>
										<span className="pl-4">
											{sample.influence.toFixed(5)}
										</span>
									</div>
								))}
							</div>
							<ol className="list-decimal list-inside">
								{data.map(
									(
										sample,
										index
									) => (
										<div key={index} className="mb-4">
											<Tokens tokens={sample.tokens} i={index} />
										</div>
									)
								)}
							</ol>
						</>
					)}
				</>
			</div>
		</div>
	);
};

export default InfluenceDemo;
