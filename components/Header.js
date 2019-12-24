import Link from "next/link";
import { currentUser } from "../helpers/blockstack";
export default Header;

function Header() {
	return (
		<nav className="navbar is-primary">
			<div className="navbar-brand">
				<Link href="/">
					<a className="navbar-item">
						<span className="is-size-5 underlined"> Confession </span>
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
						currentUser() 
						&&
						<div className="navbar-item">
							<span className="tag">
								{currentUser().username}
							</span>
							
						</div>
					}
				</div>
			</div>
		</nav>
	)
}