exports.appInfo = {
	name: "Aider",
	description: "Manage your finances, files, schedules and notes more securely like a pro.",
	tagline: "Decentralized Personal Assistant",
	keywords: "",
	author: "Wisdom Abioye",
	currentYear: new Date().getFullYear(),
	contact: "info@aider.pro"
}

const URL = "https://aider.pro";
// const URL = "http://localhost:4000";

exports.blockstackConfig = {
	scopes: ["store_write", "email"],
	appDomain: URL,
	redirectPath: URL + "/finances",
	manifestPath: URL + "/manifest.json"
}

exports.appNavigation = [
	{
		name: "Finances",
		link: "/finances"
	},
	{
		name: "Drive",
		link: "/drive",
		subMenu: [
			{
				name: "New file",
				link: "/upload"
			}
		]
	},
	{
		name: "Notes",
		link: "/notes"
	},
	{
		name: "Home",
		link: "/"
	}
]


exports.features = [
	{
		name: "Finances",
		description: "Monitor your earning and spending, daily and monthly. Spend smarter and grow your wealth.",
		icon: "icon-chart-line"
	},
	{
		name: "Encrypted Drive",
		description: "Upload, download and share files like a pro. Save from URL, encrypt and decrypt and many more",
		icon: "icon-docs"
	},
	{
		name: "Notes",
		description: "Make secure notes with rich text editor and remember everything important to you.",
		icon: "icon-doc-text"
	},
	{
		name: "Schedules (coming soon)",
		description: "Make a schedule, receive alert and plan better",
		icon: "icon-list-nested"
	},
	
]


exports.sampleFinanceData = [
	{
		day: "9", //string
		earnings: [
			{
				amount: 1838, //number
				comment: "payment for Gateway from Spark shop"
			},
			{
				amount: 225, //number
				comment: "A gift from Dad"
			}
		],
		spendings: [
			{
				amount: 838, //number
				comment: "bought gloceries"
			},
			{
				amount: 25, //number
				comment: "Gave Clara for cheese"
			}
		]
	},
	{
		day: "15", //string
		earnings: [
			{
				amount: 1838, //number
				comment: "payment for Gateway from Spark shop"
			},
			{
				amount: 225, //number
				comment: "A gift from Dad"
			}
		],
		spendings: [
			{
				amount: 838, //number
				comment: "bought gloceries"
			},
			{
				amount: 25, //number
				comment: "Gave Clara for cheese"
			}
		]
	}
]