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

export default Tooltip;

