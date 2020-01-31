import Link from "next/link";

import { appInfo, publicNavigation } from "../app.config";
import { currentUser } from "../helpers/blockstack";
import { useAuthStatus } from "../helpers/hooks";

export default function Header() {
	let signedIn = useAuthStatus();
	let { name } = appInfo;

	let scroller = e => {
		let refId = e.target.getAttribute("data-target");
		let element = document.getElementById(refId);

		if (element) {
			e.preventDefault();
			element.scrollIntoView();
			return;
		}
	}
	
	return (
		<nav className="navbar">
			<div className="navbar-brand">
				<Link href="/">
					<a className="navbar-item">
						<img src="/images/aider-dark.svg" alt="Aider" />
					</a>
				</Link>
				<div className="navbar-burger burger" data-target="mainNav">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>

			<div id="mainNav" className="navbar-menu">
				<div className="navbar-end mr-4">
					{
						signedIn 
						&&
						<div className="navbar-item">
							<span className="tag mt-2">
								{currentUser().username}
							</span>
							
						</div>
					}
					
					<div className="buttons">
						<Link href="/finances">
							<a className="button is-small is-dark">Access app</a>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}