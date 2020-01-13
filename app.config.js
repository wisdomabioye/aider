exports.appInfo = {
	name: "Aider",
	description: "Decentralized Personal Assistant",
	tagline: "Decentralized Personal Assistant",
	otherDescription: "A use case of Blockchain technology on human productivity and efficiency",
	keywords: "",
	author: "Wisdom Abioye",
	currentYear: new Date().getFullYear(),
	contact: "info@aider.app"
}

const URL = "https://aider.app";

exports.blockstackConfig = {
	scopes: ["store_write", "email"],
	appDomain: URL,
	redirectPath: URL + "/finance",
	manifestPath: URL + "/manifest.json"
}

exports.appNavigation = [
	{
		name: "Finances",
		link: "/finances",
		subMenu: [
			{
				name: "Report",
				link: "/report"
			}
		]
	},
	{
		name: "Files",
		link: "/files",
		subMenu: [
			{
				name: "New file",
				link: "/upload"
			}
		]
	},
	{
		name: "Notes",
		link: "/notes",
		subMenu: [
			{
				name: "New note",
				link: "/new"
			}
		]
	},
	{
		name: "Meetings",
		link: "/meetings"
	},
	{
		name: "Todos",
		link: "/todos"
	},
	{
		name: "Home",
		link: "/"
	}
]

exports.publicNavigation = [
	{
		name: "Home",
		link: "home"
	},
	{
		name: "Problems",
		link: "problems"
	},
	{
		name: "Features",
		link: "features"
	}
]

exports.problems = [
	{
		name: "Centralized",
		description: "",
		icon: ""
	},
	{
		name: "Insecurity",
		description: "",
		icon: ""
	},
	{
		name: "Expensive",
		description: "",
		icon: ""
	},
	{
		name: "Centralized",
		description: "",
		icon: ""
	},
	{
		name: "Centralized",
		description: "",
		icon: ""
	},
]

exports.features = [
	{
		name: "Decentralized",
		description: "",
		icon: ""
	},
	{
		name: "Free",
		description: "",
		icon: ""
	},
	{
		name: "Open source",
		description: "",
		icon: ""
	},
	{
		name: "Secured",
		description: "",
		icon: ""
	},
	{
		name: "Efficient",
		description: "",
		icon: ""
	},
]