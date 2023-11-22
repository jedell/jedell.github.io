import React, { useEffect, useState, useRef } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

const Tooltip = ({ children, content }) => {
	const node = useRef();
	const [visible, setVisible] = useState(false);
	const [coords, setCoords] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e) => {
		setVisible(true);
		const rect = node.current.getBoundingClientRect();
		setCoords({ x: e.clientX - rect.left - 50, y: e.clientY - rect.top });
	};

	const handleMouseOut = () => setVisible(false);

	useEffect(() => {
		const current = node.current;
		if (current) {
			current.addEventListener("mousemove", handleMouseMove);
			current.addEventListener("mouseout", handleMouseOut);
		}

		return () => {
			if (current) {
				current.removeEventListener("mousemove", handleMouseMove);
				current.removeEventListener("mouseout", handleMouseOut);
			}
		};
	}, [node]);

	return (
		<>
			<span ref={node}>{children}</span>

			{visible && (
				<span
					style={{
						position: "absolute",
						transform: `translate(${coords.x}px, ${coords.y}px)`,
						backgroundColor: "black",
						color: "white",
						padding: "5px",
						borderRadius: "5px",
						fontSize: "12px",
						zIndex: 10,
					}}
				>
					{content}
				</span>
			)}
		</>
	);
};

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

const InfluenceDemo = () => {
	const [prompt, setPrompt] = useState("");
	const [query, setQuery] = useState("");
	const [data, setData] = useState([]);
	const [tokenInfluences, setTokenInfluences] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async (userPrompt) => {
		setLoading(true);
		setQuery(userPrompt); // Set query to prompt initially

		setTimeout(() => {
			// Your code here

			// Call your API here and set the data and query
			// For now, we will use a mock response
			const response = [
				{
					query: "testa0b1c",
					influences: [
						{
							sample: "0b1c2",
							influence: 0.05697029456496239,
							token_influence: [
								-8.691145194461569e-5, -0.000370444031432271,
								-0.00014187868509907275, -0.000416119844885543,
								-0.05583682656288147,
							],
						},
						{
							sample: "7w8x9",
							influence: 0.041312120854854584,
							token_influence: [
								-7.862076017772779e-5, -4.710091161541641e-6,
								-0.00031346885953098536,
								-0.00010079046478495002, -0.04071958363056183,
							],
						},
						{
							sample: "4z5a6",
							influence: 0.04129159078001976,
							token_influence: [
								4.479739800444804e-6, 0.00011771037679864094,
								-2.027898153755814e-5, 0.0002977615804411471,
								-0.04176676273345947,
							],
						},
						{
							sample: "5e6f7",
							influence: 0.038341082632541656,
							token_influence: [
								5.3888426919002086e-5, 0.0002326499088667333,
								-0.0003884036559611559, 0.0009244838147424161,
								-0.039244696497917175,
							],
						},
						{
							sample: "7s8t9",
							influence: 0.035186175256967545,
							token_influence: [
								0.00015069360961206257, 6.016227416694164e-6,
								-0.0006020240252837539, 0.00015813749632798135,
								-0.034868646413087845,
							],
						},
					],
				},
			];

			// Animate filling in the rest of the query
			let fullQuery = response[0].query;
			let promptLength = userPrompt.length;
			let completion = fullQuery.slice(promptLength - 1);
			console.log(completion)
			let i = 0;
			let intervalId = setInterval(() => {
				if (i < completion.length - 1) {
					setQuery(query => query + completion[i]);
					i++;
				} else {
					clearInterval(intervalId);
				}
			}, 100); // Adjust the interval as needed

			let influences = response[0].influences;
			const maxInfluence = Math.max(
				...influences.map((influence) => influence.influence)
			);
			const minInfluence =
				Math.min(
					...influences.map((influence) => influence.influence)
				) / 1.05;

			influences = influences.map((influence) => {
				// TODO this needs to be handled better to make it pretty
				const sortedTokenInfluences = [...influence.token_influence].sort((a, b) => a - b);
				const maxTokenInfluence = sortedTokenInfluences[sortedTokenInfluences.length - 1];
				const minTokenInfluence = sortedTokenInfluences[Math.floor(sortedTokenInfluences.length * 0.2)];
				let normTokenInfluences = influence.token_influence.map(
					(tokenInfluence) =>
						(tokenInfluence < minTokenInfluence ? 0 :
						(tokenInfluence - minTokenInfluence) /
						(maxTokenInfluence - minTokenInfluence))
				);

				return [
					influence.sample,
					influence.influence,
					(influence.influence - minInfluence) /
						(maxInfluence - minInfluence),
					influence.token_influence,
					normTokenInfluences,
				];
			});
			influences.sort((a, b) => b[1] - a[1]);

			setData(influences);

			setTokenInfluences(tokenInfluences);
			setLoading(false);
		}, 2000);
	};

	const CustomInput = React.forwardRef(({ value, onChange, placeholder }, ref) => {
		return (
			<div className="relative">
				<input
					ref={ref}
					className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
					value={value}
					onChange={(e) => {
						onChange(e);
					}}
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
					<div className="flex flex-row">
						<CustomInput
							ref={inputRef}
							value={prompt}
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
								className={`p-2 ml-4 bg-[#0064FF] text-black rounded-md hover:text-white transition duration-200 ease-in-out ${!prompt && 'opacity-50 cursor-not-allowed'}`}
								disabled={!prompt}
							>
								Calculate
							</button>
						)}
					</div>
				</div>
				<>
				<div>
					<span className="font-bold text-xl">Query (<Latex>{`$z_q$`}</Latex>): </span>
					
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
						<ol className="list-decimal list-inside">
							{data.map(
								(
									[
										sample,
										value,
										normValue,
										tokenInfluences,
										normTokenInfluences,
									],
									index
								) => (
									<div key={index} className="mb-4">
										<li className="mb-2 relative group">
												{sample
													.split("")
													.map((char, index) => (
														<Tooltip content={tokenInfluences[index]}>

														<span 
														key={index}
														className="font-bold text-black p-1 rounded"
														style={{
															backgroundColor: `rgba(0, 100, 255, ${normTokenInfluences[index]})`,
														}}
														>
															{char}
														</span>
														</Tooltip>

													))}
												<span
													className="ml-8 font-bold text-black p-1 rounded"
													style={{
														backgroundColor: `rgba(0, 100, 255, ${normValue})`,
														paddingRight: `${normValue * 100}px`,
													}}
												>
													{value.toFixed(5)}
												</span>
										</li>
									</div>
								)
							)}
						</ol>
					)}
				</>
			</div>
		</div>
	);
};

export default InfluenceDemo;
