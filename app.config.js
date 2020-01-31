exports.appInfo = {
	name: "Aider",
	description: "Manage your finances, files, schedules more securely and live happily.",
	tagline: "Decentralized Personal Assistant",
	keywords: "",
	author: "Wisdom Abioye",
	currentYear: new Date().getFullYear(),
	contact: "info@aider.app"
}

// const URL = "https://aider.app";
const URL = "http://localhost:4000";

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


exports.features = [
	{
		name: "Finances",
		description: "Track your earning and spending, daily and monthly. Spend smarter and see your wealth grows.",
		icon: "icon-chart-line"
	},
	{
		name: "Encrypted Drive",
		description: "Share files, unlimited storage space, download from URL, Encrypted and decrypted and many more",
		icon: "icon-docs"
	},
	{
		name: "Schedules (dev mode)",
		description: "Make a schedule, receive alert and plan better",
		icon: "icon-list-nested"
	},
	{
		name: "Notes",
		description: "Make secure notes with rich text editor, download or share any where and any time, securely",
		icon: "icon-sticky-note-o"
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