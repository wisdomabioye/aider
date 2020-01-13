import Link from "next/link";
import { appInfo } from "../app.config";
import SignInWidget from "../components/SignInWidget";

export default function Intro() {
	let {description, tagline, otherDescription} = appInfo;
	return (
		<div className="hero has-text-centered">
			<div className="hero-body">
				<h1 className="title pb-2">
					{ description }
				</h1> 
				<h2 className="subtitle">	
					{ tagline }
				</h2>
				<h3 className="mb-3">
					{ otherDescription }
				</h3>
				<SignInWidget />
			</div>
		</div>
	)
}