import React, { useState } from "react";
import Root from "./routes/Root";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";
import BlogPage from "./routes/BlogPage";
import Blog from "./routes/Blog";
import { blogLoader, blogsLoader } from "./blogs/blogs";
import { DarkModeProvider } from "./context/darkmode";
import InfluenceDemo from "./routes/InfluenceDemo";

// dark mode context

const router = createHashRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
        loader: blogsLoader,
	},
	{
		path: "/influence-demo",
		element: <InfluenceDemo />,
		errorElement: <ErrorPage />,
		loader: blogsLoader,
	},
	{
		path: "/projects",
		element: <BlogPage />,
		errorElement: <ErrorPage />,
		loader: blogsLoader,
	},
	{
		path: "/projects/:id",
		element: <Blog />,
		errorElement: <ErrorPage />,
		loader: blogLoader,
	},
]);

export default function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	return (
		<DarkModeProvider.Provider value={{ isDarkMode, setIsDarkMode }}>
			<RouterProvider router={router} basename={process.env.PUBLIC_URL}>
				<Root />
			</RouterProvider>
		</DarkModeProvider.Provider>
	);
}
