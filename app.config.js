exports.appInfo = {
	name: "Aider Pro",
	description: "Manage your finances, files, schedules and notes more securely like a pro.",
	tagline: "",
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
	},
	{
		name: "Notes",
		link: "/notes",
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

exports.whyAider = [
	{
		name: "Privacy",
		description: "No tracking (IP, cookie, visits) and no Ads. You own the total control over your data.",
		icon: "icon-user-secret"
	},
	{
		name: "Decentralized",
		description: "Your data are stored in Gaia storage (decentralized storage)",
		icon: "icon-handshake"
	},
	{
		name: "Encryption",
		description: "By default, your data are encrypted and you can always decrypt to share them",
		"icon": "icon-lock"
	},
	{
		name: "Open Source",
		description: "Our code is publicly available on Github, you too can contribute to its development",
		icon: "icon-github"
	}
]


exports.sampleFinanceData = [
	{
		day: "1", //string
		earnings: [
			
		],
		spendings: [
			{
				amount: 200, //number
				comment: "bought Soap"
			},
			{
				amount: 140, //number
				comment: "bought tissue paper"
			},
			{
				amount: 500, //number
				comment: "on fueling"
			},
			{
				amount: 200, //number
				comment: "drinks for Faridah"
			}
		]
	},
		{
		day: "2", //string
		earnings: [
			{
				amount: 4000, //number
				comment: "from peanuts sales"
			}
		],
		spendings: [
			{
				amount: 2000, //number
				comment: "bought gloceries"
			},
			{
				amount: 25, //number
				comment: "Gave Clara for cheese"
			},
			{
				amount: 100, //number
				comment: "on transport to PTA"
			},
			{
				amount: 500, //number
				comment: "given to Mary"
			},
		]
	},
	{
		day: "3", //string
		earnings: [
			{
				amount: 1838, //number
				comment: "payment for Gateway from Spark shop"
			},
			
		],
		spendings: [
			{
				amount: 838, //number
				comment: "Weekend outing"
			},
			{
				amount: 25, //number
				comment: "printing of document"
			}
		]
	},
	{
		day: "4",
		earnings: [
			{
				amount: 53000,
				comment: "From hubby"
			}
		],
		spendings: []
	},
	{
		day: "5", //string
		earnings: [
		],
		spendings: [
			{
				amount: 1100, //number
				comment: "Faridah drink"
			},
			{
				amount: 200, //number
				comment: "Dried fish"
			}
		]
	},
	{
		day: "7", //string
		earnings: [
			{
				amount: 500, //number
				comment: "from peanuts"
			},
		],
		spendings: [
			{
				amount: 1000, //number
				comment: "on Toiletries"
			},
			{
				amount: 2000, //number
				comment: "hair do at Beauty salon"
			}
		]
	},
	{
		day: "8", //string
		earnings: [
			
		],
		spendings: [
			{
				amount: 5000, //number
				comment: "on Stew"
			}
		]
	},
	{
		day: "9", //string
		earnings: [
			{
				amount: 10000, //number
				comment: "from Excellent supermarket for peanuts"
			},
		],
		spendings: [
			{
				amount: 4000, //number
				comment: "on Cinema"
			}
		]
	},
	{
		day: "10", //string
		earnings: [
		],
		spendings: [
			{
				amount: 2500, //number
				comment: "on Tailoring"
			},
			{
				amount: 5000, //number
				comment: "on makover"
			}
		]
	},
	{
		day: "11", //string
		earnings: [
			
		],
		spendings: [
			{
				amount: 10000, //number
				comment: "Spa"
			}
		]
	},
	{
		day: "12", //string
		earnings: [
			{
				amount: 2000, //number
				comment: "from my hubby"
			}
		],
		spendings: [
			{
				amount: 1500, //number
				comment: "on Vegeies"
			},
			{
				amount: 100, //number
				comment: "on fruits"
			}
		]
	},
	{
		day: "13", //string
		earnings: [
			
		],
		spendings: [
			{
				amount: 1500, //number
				comment: "on Cat fish"
			},
			{
				amount: 2000, //number
				comment: "on Snail"
			}
		]
	},
	{
		day: "14", //string
		earnings: [
		],
		spendings: [
			{
				amount: 2000, //number
				comment: "on Stew"
			}
		]
	},
	{
		day: "15", //string
		earnings: [
			{
				amount: 35000, //number
				comment: "received from Onion debtor"
			},
		],
		spendings: [
			{
				amount: 1100, //number
				comment: "happy hour for Faridah"
			},
			{
				amount: 1000, //number
				comment: "Biscuit"
			},
			{
				amount: 900, //number
				comment: "A create of Egg"
			}
		]
	},
	{
		day: "16", //string
		earnings: [
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
		day: "17", //string
		earnings: [
			
		],
		spendings: [
			{
				amount: 15000, //number
				comment: "on Faizah birthday"
			},
		]
	},
	{
		day: "19", //string
		earnings: [
			
		],
		spendings: [
			{
				amount: 700, //number
				comment: "bread and butter"
			},
			{
				amount: 7000, //number
				comment: "stocked the Fridge"
			}
		]
	},
	{
		day: "20", //string
		earnings: [
			{
				amount: 6000, //number
				comment: "from peanuts sales"
			}
		],
		spendings: [
			{
				amount: 12000, //number
				comment: "on food stuff"
			},
		]
	},
	{
		day: "22", //string
		earnings: [
			{
				amount: 5000, //number
				comment: "A gift from Sister"
			}
		],
		spendings: [
			{
				amount: 500, //number
				comment: "giveaway"
			}
		]
	},
	{
		day: "23", //string
		earnings: [
			
		],
		spendings: [
			{
				amount: 2500, //number
				comment: "power bill"
			},
			{
				amount: 5000, //number
				comment: "on fueling car"
			}
		]
	},
	{
		day: "25", //string
		earnings: [
			
		],
		spendings: [
			{
				amount: 18800, //number
				comment: "on 3 days vacation in Sister home"
			}
		]
	},
	{
		day: "28", //string
		earnings: [
		],
		spendings: [
			{
				amount: 1000, //number
				comment: "gave Mary"
			},
			{
				amount: 4000, //number
				comment: "on laundry"
			}
		]
	},
	{
		day: "29", //string
		earnings: [
			{
				amount: 1300, //number
				comment: "peanuts"
			}
		],
		spendings: [
			{
				amount: 2000, //number
				comment: "on toiletries"
			},
		]
	}
]