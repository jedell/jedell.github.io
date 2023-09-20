import React, { useState } from "react";

export function DarkToggle({
	colour = "bg-[#A76031]",
	on = false,
	onToggle = () => {},
	tabIndex = 0,
}) {
	const [isOn, setIsOn] = useState(on);

	function toggle() {
		setIsOn(!isOn);
		onToggle(!isOn);
		// change body background color
		document.body.style.backgroundColor = isOn
			? "#FEFDFB"
			: "rgba(18,	24,	38, 1)";
	}

	function handleClick() {
		toggle();
	}

	function handleKeyDown({ key }) {
		if (key === "Enter") toggle();
	}

	return (
		<div
			role="checkbox"
			aria-checked={isOn ? "true" : "false"}
			tabIndex={0}
			onKeyDown={handleKeyDown}
			onClick={handleClick}
			className={`cursor-pointer w-11 h-5 ${
				isOn ? "bg-[#f58282]" : "bg-[#A76031]"
			} rounded-full relative px-1.5 flex items-center${
				isOn ? "" : " justify-end"
			}`}
		>
			<div
				className={`w-4 h-4 rounded-full absolute transform duration-200 ease-out bg-white left-0.5 ${
					isOn ? "translate-x-6" : "translate-x-0"
				}`}
			/>
			{isOn ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-3 w-3 text-white"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-3 w-3 text-white"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
						clipRule="evenodd"
					/>
				</svg>
			)}
		</div>
	);
}
