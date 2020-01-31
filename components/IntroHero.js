import Link from "next/link";
import { appInfo } from "../app.config";
import SignInWidget from "../components/SignInWidget";

export default function Intro() {
	let {description, tagline, name} = appInfo;
	return (
		<div className="hero has-text-centered">
			<div className="hero-body">
				<h1 className="title pb-2">
					{ name }
				</h1> 
				<h2 className="subtitle">	
					{ description }
				</h2>
				<Link href="/finances">
					<a className="button is-dark">Get Started</a>
				</Link>
			</div>
		</div>
	)
}