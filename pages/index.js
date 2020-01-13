import Link from "next/link";
import Home from "../layouts/Home";

import IntroHero from "../components/IntroHero";
import Problems from "../components/Problems";
import Features from "../components/Features";
import SignInWidget from "../components/SignInWidget";

export default function Index() {
	return (
		<Home>
			<div className="columns is-vcentered">
				<div className="column is-6">
					<IntroHero />
				</div>
			</div>
			<div className="section" id="problems">
				<Problems />
			</div>
			<div className="section" id="features">
				<Features />
			</div>
		</Home>	
	)
}