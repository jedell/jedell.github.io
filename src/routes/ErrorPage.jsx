// Error page for unhandled routes
// ----------------------------------------------------------------------
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center dark:text-[#FEFDFB] text-[#333531] dark:bg-gray-900 bg-[#FEFDFBd]">
			<div className="text-center">
				<h1 className="text-6xl font-bold mb-4">Error</h1>
				<p className="text-xl mb-8">The page you're looking for doesn't exist.</p>
				<Link to="/" className="transition-colors">
					Back to Home
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;