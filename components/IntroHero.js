import Link from "next/link";
import { appInfo } from "../app.config";

export default function Intro() {
	let {description, tagline} = appInfo;
	return (
		<div className="hero is-primary has-text-centered">
			<div className="hero-body">
				<h1 className="title pb-2">
					{ description }
				</h1> 
				<h2 className="subtitle">	
					{ tagline }
				</h2>

				<div className="buttons is-centered">
					<Link href="/confessions">
						<a className="button is-warning is-outlined">
							Confess now!
						</a>
					</Link>
					
					<Link href="/about">
						<a className="button is-link">
							Learn more
						</a>
					</Link>
				</div>
			</div>
		</div>
	)
}