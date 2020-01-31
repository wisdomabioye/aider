import Link from "next/link";
import Home from "../layouts/Home";

import IntroHero from "../components/IntroHero";
import Features from "../components/Features";

export default function Index() {
	return (
		<Home>
			<div className="columns is-vcentered">
				<div className="column is-6">
					<IntroHero />
				</div>
			</div>
			<div className="section" id="features">
				<Features />
			</div>
		</Home>	
	)
}