exports.appInfo = {
	name: "Confession",
	description: "Decentralized Confession",
	tagline: "Confession heals. Confess your sins so you may be forgiven and receive more blessings",

	keywords: "",
	author: "Wisdom Abioye",
	currentYear: new Date().getFullYear(),
	contact: "repentance@confession.live"
}

exports.happinessRules = [
	"confess and sin less",
	"forgive others",
	"be honest, fair, generous, polite, kind, loving, loyal, responsible, and reliable",
	"have patience, respect, self-discipline, and integrity"
]

exports.verses = [
	{
		text: "Confess your faults one to another, and pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much.",
		location: "James 5:16"
	},
	{
		text: "And when you stand praying, if you hold anything against anyone, forgive him, so that your Father in heaven may forgive you your sins.",
		location: "Mark 11:25"
	},
	{
		text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
		location: "John 1:19"
	},
	{
		text: "He that covereth his sins shall not prosper: but whoso confesseth and forsaketh them shall have mercy.",
		location: "Proverbs 28:13"
	},
	{
		text: "I acknowledge my sin unto thee, and mine iniquity have I not hid. I said, I will confess my transgressions unto the Lord; and thou forgavest the iniquity of my sin.",
		location: "Psalm 32:5"
	}, 
	{
		text: "And it shall be, when he shall be guilty in one of these things, that he shall confess that he hath sinned in that thing.",
		location: "Leviticus 5:5"
	},
	{
		text: "Draw nigh to God, and he will draw nigh to you. Cleanse your hands, ye sinners; and purify your hearts, ye double minded.",
		location: "James 4:8"
	},
	{
		text: "We have sinned, and have committed iniquity, and have done wickedly, and have rebelled, even by departing from thy precepts and from thy judgments.",
		location: "Daniel 9:5"
	}
]

const URL = "https://confession.live";

exports.blockstackConfig = {
	scopes: ["store_write"],
	appDomain: URL,
	redirectPath: URL + "/confessions",
	manifestPath: URL + "/manifest.json"
}

exports.firebaseConfig = {
	apiKey: "AIzaSyA0vJCpN3rBw1Z1Kp-FHGZaH0IL92XzY_g",
	authDomain: "confession-b8b03.firebaseapp.com",
	databaseURL: "https://confession-b8b03.firebaseio.com",
	projectId: "confession-b8b03",
	storageBucket: "confession-b8b03.appspot.com",
	messagingSenderId: "633200590537",
	appId: "1:633200590537:web:8206063394494309211718",
	measurementId: "G-WLL1T7PDCW"
};

exports.prayers = [
	"May God forgive you",
	"Receive the mercy of your Lord",
	"Sin no more and you're forgiven",
	"May you receive blessing",
	"You're blessed because you have confessed",
	"You shall be freed from worries as you confessed",
	"May be you be guided to the right path",
	"You shall have an everlasting success",
	"Receive forgiveness and sin no more",
	"Repent! God is merciful",
	"God is merciful",
	"Confession heals",
	"You're blessed as you have confessed"
]

exports.fakeConfession = [
	"Lord forgive me, I'll never steal again!",
	"forgive him, so that your Father in heaven may forgive you your sins.",
	"I seek forgiveness :cry",
	"Forgive me!!!! please Lord",
	"I messed up with a friend",
	"forgive me for abusing myself",
	"I fornicated with my maid",
	"Cheated on my wife few days ago, forgive me Lord",
	"I got angry unnecessarily",
	"Spoke evil of my colleage - I seek your forgiveness God",
	"Caused bitterness to a family of 3. I'm on my way to confess and seek forgiveness. God Forgive me",
	"I blasphemed - I need your Guide O Lord of mercy",
	"Misuing the knowledge God gave me. Guide me God - I want to be a better person",
	"I ridiculed my brother - I'm so sorry.",
	"i have been sleeping with different ladies without marriiage. I can't stop this :crying:",
	"I complain a lot. I just realized lots of favour God has done for me. Forgive me Lord",
	"I used to be very aggressive - I'm now getting better. Thank you Lord",
	"I'm too cunny",
	"I can't think of anything except sex - I need healing God",
	"Had an agreement with my buyer but later disappointed her. Don't know how to seek her forgiveness",
	"i have scammed too many people",
	"betrayed my closest friend, God!!!!!",
	"Broke up with my gf without reason - I'm disappointed",
	"Stole some cookies - I am repenting right now",
	"Can someone pray for me - I can't make my sin public",
	"My sins are too many - can't confess it all",
	"Goddamnit! Nver knew there's a place for confession",
	"I seek forgiveness, O Lord of mercy",
	"I am too selfish - I want to be a better person",
	"Is confession really anonymous? I need to confess a mightier sin.",
	"Sometimes I feel like cheating everyone",
	"I argued with my friend till I broke his nose. :::cry",
	"I deceived Mum several times - I'm sorry mum",
	"defrauded many guys. I can't get to them for apology :thinking ",
	"I am a professional liar - I quitted already but still feel the need to confess. Forgive me God",
	"Why can't I get out of my lying character? Someone help me out",
	"How does this work? can someone give info",
	"As a street Nigga I gun down lots of bad guys - now a clean guy. :forgiveness I want",
	"Ama dishonest guy - so sorry God",
	"Can't get out of my xxx life, sad mood",
	"So dishonest to parents. I want to be a changed person",
	"just divorced because of a bitch. so disappointed in myself",
	"get drunk almost every night - i can't change",
	"I am so insincere to myself and friends. ",
	"I'm the true difinition of 'envy' - it's a lot in me God why?",
	"I have too many selfish motives, always selfish. So angry with myself",
	"extorted civilians and it's killing me - God forgive me",
	"What's happening here guys. Confessions for real?",
	"I am so scared of confessions I read here, what's happening in this world?",
	"treated my daughter unjustly - forgive me dear Laura",
	"decentralized confession, lol",
	"I made personal gain through unrighteousness",
	"I see faults in everything others do",
	"i am so foolish for starting a ponzi - regretting...",
	"Gave false witness - can i be forgiven?",
	"can not do without fornicating - too many bad women around me",
	"shared my nude pics with remote lover, can't believe I could be that silly. Ill never do that agin. It's crazy",
	"im a badass ",
	"always wanting to take all profit. I just realized it all for nothing",
	"I'm too greedy and I know it. ",
	"who the hell are you confessing to? ",
	"Used to have a lot of hatred. Not anymore, now a better person. :thanksgiving",
	"I learnt my lesson. I am so arrogant ",
	"Just realized life is ephemeral",
	"being proud and not listening to advice put in my current situation. Forgive me Lord and take me out of here.",
	"i preach the words of God and my actions go against it all - I'm an hypocrite",
	"I believe in God - forgive all my sins.",
	"got relieved by confessing here - it really helped me",
	"fogive me God",
	"lol, I'm a sinner with lots of sins",
	"I contrive evil ways to satisfy my carnal lusts - I'm possessed/?",
	"I make jest of people",
	"I'm a bad judge, a big sinner",
	"doing evil wouldn't give rest of mind but I'm finding it hard to do good. confused right now",
	"I need spiritual help",
	"in pursuit of material success in this ephemeral life of mine - i am still thinking",
	"visited a poor community - I'm sorry for extragavant life God :crying. Can't be believe people live this worst",
	"lusting after an engaged woman. can God just make me stop this. arrrggggghhhh!!!",
	"i lie a lot, i'm found of it though it's killing me",
	"hack my friend account and withdrew all bitcoin - I' m sorry Mark, can't face him",
	"I'm generally bad in character - no specific sin. ",
	"I make mockery of my neighbor in need. I need to apologise right now",
	"are you kidding me? decentralized confession ? it's end of the world",
	"I masterminded a riot that led to killings - my heart is still bleeding",
	"is masturbation a sin? that's what troubles my mind, can't stop it",
	"I aquired lots of wealth illegally - giving some to orphan, i'm not sure that's the final solution but i'll get some relieves",
	"I kidnap and drugged innocent souls for fun - I'm sorry God",
	"i swear to God, it's all lie - I'm afraid I'll have to pay for it",
	"Im a traitor - committed so many of it",
	"stole some money but claimed it's hackers -lol, not funny. I need to be forgiven",
	"I thank you Lord of mercy",
	"I humiliated a gentle soul to get fame. Can't stop thinking of it",
	"I lie and used people - what have I gained? Godd why?",
	"I am a whore, can't change cos i get praised from it. God take me away from this place.",

	"I could see greater sin here - unbelieveable",
	"Im so scared to confess here",
	"I got my mind freed just after confessing here.",
	"Can't face anyone to confess - this has helped me a lot",
	"I fuckin cheated on my husband - it's killing me",
	"someone should pray for me for forgiveness",
	"got banged by rappist - is that a sin? don't know how to tell",
	" got involved in lots of dirty shit, out of it now. ",
	"I got my friend in trouble. I seek forgiveness oh lord",
	"I practiced 'xxxxxx', God me God"
]