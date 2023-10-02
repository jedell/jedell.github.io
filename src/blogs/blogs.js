// Content writen in LaTeX

import Latex from "react-latex-next";

/*
Paragrph schema:
{
	text: "string",
	image: "string",
	code: "string",
	list: ["string"],
	link: "string",
	linkText: "string",
}
*/

async function parseBlogs() {
	// Function to fetch .md file content from public folder
	async function fetchMdFile(fileName) {
		return fetch(`${process.env.PUBLIC_URL}/content/${fileName}`)
			.then((response) => response.text())
			.then((data) => {
				const sections = data
					.split("{break}")
					.map((section) => section.trim());
				return sections;
			});
	}

	// Specify the name of your .md file here
	const mdFileName = "contrastive-decoding.md";
	// Fetch the .md file content
	let paragraphs = await fetchMdFile(mdFileName);

	// Note: Place your .md files in the public/content folder

	const content1 = [
		{
			text: paragraphs[0],
		},
	];

	const content2 = [
		{
			text: "$\\frac{1}{2}$",
			image: "https://e0.pxfuel.com/wallpapers/94/339/desktop-wallpaper-fogy-mountains-smoky-mountains.jpg",
			code: `const a = 1;
const b = 2;
const c = a + b;
console.log(c);`,

			list: ["item 1", "item 2", "item 3"],
			link: "https://www.google.com",
			linkText: "Google",
		},
	];

	return [
		{
			title: "Contrastive Decoding in Hugging Face Transformers",
			content: content1,
			date: "2023-09-22",
			image: "https://i.pinimg.com/originals/45/b3/cc/45b3ccd39243d0b2b7922083d9390401.jpg",
			id: "contrastive-decoding",
		},
		// {
		// 	title: "See you soon!",
		// 	content: content2,
		// 	date: "2021-09-01",
		// 	image: "https://e0.pxfuel.com/wallpapers/94/339/desktop-wallpaper-fogy-mountains-smoky-mountains.jpg",
		// 	id: "see-you-soon",
		// },
	];
}



export async function blogsLoader() {
	const blogs = await parseBlogs();
	return { blogs };
}

export async function blogLoader({ params }) {
	const blogs = await parseBlogs();
	const blog = blogs.find((blog) => blog.id === params.id);
	return { blog };
}
