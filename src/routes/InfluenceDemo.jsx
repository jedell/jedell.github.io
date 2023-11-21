import React, { useEffect, useState, useRef } from "react";

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
			current.addEventListener('mousemove', handleMouseMove);
			current.addEventListener('mouseout', handleMouseOut);
		}

		return () => {
			if (current) {
				current.removeEventListener('mousemove', handleMouseMove);
				current.removeEventListener('mouseout', handleMouseOut);
			}
		};
	}, [node]);

	return (
		<>
			<span ref={node}>
				{children}
			</span>

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
		}, 150);

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
				<div className="mb-4">
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
	const [query, setQuery] = useState("");
	const [completion, setCompletion] = useState("");
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async (userQuery) => {
		setLoading(true);
		setTimeout(() => {
			// Your code here

			// Call your API here and set the data and completion
			// For now, we will use a mock response
			const response = [
				{
					query: userQuery,
					completion: "a0b1c",
					influences: [
						["0b1c2", 0.05697029456496239],
						["7w8x9", 0.041312120854854584],
						["4z5a6", 0.04129159078001976],
						["5e6f7", 0.038341082632541656],
						["7s8t9", 0.035186175256967545],
					],
				},
			];

			setCompletion(response[0].completion);
			let influences = response[0].influences;
			const maxInfluence = Math.max(
				...influences.map((influence) => influence[1])
			);
			const minInfluence =
				Math.min(...influences.map((influence) => influence[1])) / 1.2;
			influences = influences.map((influence) => [
				influence[0],
				influence[1],
				(influence[1] - minInfluence) / (maxInfluence - minInfluence),
			]);
			influences.sort((a, b) => b[1] - a[1]);

			setData(influences);
			setLoading(false);
		}, 2000);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex flex-col justify-center p-12">
				<div className="mb-4">
					<div className="flex flex-row">
						<input
							className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-1/2"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Enter your query here"
						/>
						{loading ? (
							<div className="flex ml-4">
								<Spinner size="h-10 w-10" />
							</div>
						) : (
							<button
								onClick={() => fetchData(query)}
								className="p-2 ml-4 bg-[#0064FF] text-black rounded-md hover:text-white transition duration-200 ease-in-out"
							>
								Calculate
							</button>
						)}
					</div>
				</div>
				<>
					<b className="font-bold text-xl">Completion:</b>
					<div className="mb-4 p-2 border-2 border-gray-300 rounded-md">
						{loading ? (
							<div className="flex flex-row">
								<LoadingIndicator />{" "}
							</div>
						) : (
							completion || "\u00A0"
						)}
					</div>
					<p className="font-bold text-xl">Top Influences:</p>
					{loading ? (
						<PulseAnimation />
					) : (
						<ol className="list-decimal list-inside">
							{data.map(
								([influence, value, normValue], index) => (
									<div className="mb-4">
										<li
											key={index}
											className="mb-2 relative group"
										>
											<Tooltip content={value}>
												<span
													className="font-bold text-black p-1 rounded"
													style={{
														backgroundColor: `rgba(0, 100, 255, ${normValue})`,
													}}
												>
													{influence}
												</span>
											</Tooltip>
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
