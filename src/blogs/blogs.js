// Content writen in LaTeX

import Latex from "react-latex-next";

const content1 = [
	{
		text: "$\\frac{1}{2}$",
		image: "https://i.pinimg.com/originals/45/b3/cc/45b3ccd39243d0b2b7922083d9390401.jpg",
		code: `const a = 1;
const b = 2;
const c = a + b;
console.log(c);`,
		list: ["item 1", "item 2", "item 3"],
		link: "https://www.google.com",
		linkText: "Google",
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

const blogs = [
	{
		title: "Come back later!",
		content: content1,
		date: "2021-09-01",
		image: "https://i.pinimg.com/originals/45/b3/cc/45b3ccd39243d0b2b7922083d9390401.jpg",
		id: "come-back-later",
	},
	{
		title: "See you soon!",
		content: content2,
		date: "2021-09-01",
		image: "https://e0.pxfuel.com/wallpapers/94/339/desktop-wallpaper-fogy-mountains-smoky-mountains.jpg",
		id: "see-you-soon",
	},
];

export async function blogsLoader() {
	return { blogs };
}

export async function blogLoader({ params }) {
	const blog = blogs.find((blog) => blog.id === params.id);
	return { blog };
}
