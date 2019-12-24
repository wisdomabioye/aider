import Link from "next/link";
import Main from "../layouts/Main";

import IntroHero from "../components/IntroHero";
import HappinessRules from "../components/HappinessRules";
import SignInWidget from "../components/SignInWidget";
import Verses from "../components/Verses";

export default function Index() {
	return (
		<Main>
			<div className="columns is-vcentered">
				<div className="column is-6">
					<IntroHero />
					
					<div className="ml-4 mr-4">
						<h3 className="is-size-5 strong"> You want happiness? then </h3>
						<HappinessRules />
					</div>
				</div>
				<div className="column is-6 pl-4 pr-4">
					<div className="box halfpage-height has-text-centered">
						<Link href="/confessions">
							<a className="button is-primary is-large mt-4">
								See Confessions
							</a>
						</Link>
						<p className="is-size-7">
							See greater sins and confess yours without fear
						</p>
						<SignInWidget />
					</div>
					<div style={{minHeight: "110px"}}>
						<hr className="mt-0 mb-0" />
						<Verses />
					</div>
				</div>
			</div>
		</Main>	
	)
}