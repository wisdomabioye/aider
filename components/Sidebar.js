import Link from "next/link";
import { useRouter } from "next/router";
import { appNavigation, appInfo } from "../app.config";

import Logo from "./Logo";

export default function Sidebar(props) {
	let {name} = appInfo;
	return (
		<div>
			<Logo />
			<h2 className="has-text-centered is-size-5 mt-1 mb-4 has-text-light">{name}</h2>
			<aside className="menu pl-2">
			  <ul className="menu-list">
			  	{
			  		appNavigation.map( (nav, i) => (
			  			<ListItem {...nav} key={i} />
			  		))
			  	}
			  </ul>
			</aside>
		</div>
	)
}


function ListItem(props) {
	return (
		<li className="sub-menu mt-1 mb-1">
			<Anchor name={props.name} link={props.link} />
			{
				props.subMenu &&
				<ul>
					{
						props.subMenu.map( (subNav, i) => (
							<Anchor name={subNav.name} link={props.link + subNav.link} key={i}/>
						))
					}
				</ul>
			}
		</li>
	)
}

function Anchor(props) {
	let router = useRouter();
	let active = router.pathname == props.link ? "is-active" : "";
	return (
		<Link href={props.link}>
			<a className={`has-text-grey ${active}`}>
				{props.name}
			</a>
		</Link>
	)
}