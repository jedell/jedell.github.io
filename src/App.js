import React, { useState } from "react";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";
import BlogPage from "./routes/BlogPage";
import Blog from "./routes/Blog";
import { blogLoader, blogsLoader } from "./blogs/blogs";
import { DarkModeProvider } from "./context/darkmode";

// dark mode context

console.log("Herllo")

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
        loader: blogsLoader,
	},
	{
		path: "/blog",
		element: <BlogPage />,
		errorElement: <ErrorPage />,
		loader: blogsLoader,
	},
	{
		path: "/blog/:id",
		element: <Blog />,
		errorElement: <ErrorPage />,
		loader: blogLoader,
	},
]);

export default function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	return (
		<DarkModeProvider.Provider value={{ isDarkMode, setIsDarkMode }}>
			<RouterProvider router={router}>
				<Root />
			</RouterProvider>
		</DarkModeProvider.Provider>
	);
}
