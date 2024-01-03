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

	// Specify the names of your .md files here
	const mdFileNames = ["contrastive-decoding.md", "influence-functions.md"];
	const titles = ["Contrastive Decoding in Hugging Face Transformers", "Exploring Influence Functions in Large Language Models"]
	const images = 
	[
		"https://i.pinimg.com/originals/45/b3/cc/45b3ccd39243d0b2b7922083d9390401.jpg",
		"https://www.teahub.io/photos/full/96-962647_minimalist-landscape-wallpaper-yellow.jpg"	
	];
	const links = [
		{
			title: "Hugging Face Transformers Fork with Contrastive Decoding",
			link: "https://github.com/jedell/transformers/blob/10c57f601571d739d3359b4779fc46365c17bb5b/src/transformers/generation/utils.py#L2324C5-L2324C5"
		},
		{
			title: "Exploring Influence Functions in Large Language Models",
		}
	]
	// Fetch the .md file content
	let blogs = await Promise.all(mdFileNames.map(async (mdFileName) => {
		let paragraphs = await fetchMdFile(mdFileName);

		// Note: Place your .md files in the public/content folder

		const content = [
			{
				text: paragraphs[0],
			},
		];

		return {
			title: titles[mdFileNames.indexOf(mdFileName)],
			content: content,
			date: "2023-09-22",
			image: images[mdFileNames.indexOf(mdFileName)],
			linkTitle: links[mdFileNames.indexOf(mdFileName)].title || "",
			link: links[mdFileNames.indexOf(mdFileName)].link || "",
			id: mdFileName.replace(".md", ""),
		};
	}));

	return blogs;
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
