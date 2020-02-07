import Link from "next/link";
import Home from "../layouts/Home";

import IntroHero from "../components/IntroHero";
import WhyAider from "../components/WhyAider";
import Features from "../components/Features";

export default function Index() {
	return (
		<Home>
			<div className="columns is-vcentered">
				<div className="column is-5">
					<IntroHero />
				</div>
				<div className="column is-7 mt-4">
					<div className="box has-background-dark">
						<img src="/images/aider_finance.png" alt="Aider Slide" />
					</div>
				</div>
			</div>
			<div className="section pb-1" id="why-aider">
				<WhyAider />
			</div>
			<div className="section" id="features">
				<Features />
			</div>
		</Home>	
	)
}