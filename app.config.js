exports.appInfo = {
	name: "Aider",
	description: "Manage your finances, files and schedules more securely like a pro.",
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
		link: "/notes",
		subMenu: [
			{
				name: "New note",
				link: "/new"
			}
		]
	},
	{
		name: "Home",
		link: "/"
	}
]


exports.features = [
	{
		name: "Finances",
		description: "Track your earning and spending, daily and monthly. Spend smarter and see your wealth grows.",
		icon: "icon-chart-line"
	},
	{
		name: "Encrypted Drive",
		description: "Upload, download, and share files like a pro. Unlimited storage space, save from URL, Encrypt and decrypt and many more",
		icon: "icon-docs"
	},
	{
		name: "Schedules (coming soon)",
		description: "Make a schedule, receive alert and plan better",
		icon: "icon-list-nested"
	},
	{
		name: "Notes (coming soon)",
		description: "Make secure notes with rich text editor, download or share any where and any time, securely just like a pro",
		icon: "icon-doc-text"
	}
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