import { useState, useEffect } from "react";

import Main from "../layouts/Main";
import Verses from "../components/Verses";
import WorldConfession from "../components/WorldConfession";
import PersonalConfession from "../components/PersonalConfession";
import MakeConfession from "../components/MakeConfession";
import { completeSignIn, currentUser } from "../helpers/blockstack";


export default function Confession() {
	let [username, setUsername] = useState(null);
	let [currentTab, setCurrentTab] = useState("World") /* or Personal*/;
	let tabList = ["World", "Personal"];

	useEffect(() => {

		if (!currentUser()) {
			completeSignIn()
			.then( userData => {
				if (userData) {
					setUsername(userData.username);	
				}
			})
			.catch( error => {
				console.log(error)
			})
		} else if (!username) {
			setUsername(currentUser().username);
		}
	})

	function handleTabSwitch(e) {
		let whichTab = e.currentTarget.getAttribute("data-tab");
		setCurrentTab(whichTab);
	}

	return (
		<Main>
			<div className="columns is-multiline is-centered">
				<div className="column is-3">
					<div className="tabs is-centered">
						<ul>
							{
								tabList.map((tab, i) => (
									<li 
										key={i} 
										className={tab.toLowerCase() == currentTab.toLowerCase() ? "is-active" : ""}
										onClick={handleTabSwitch}
										data-tab={tab}
									>
										<a>{tab}</a>
									</li>
								))
							}
						</ul>
					</div>
				</div>
				<div className="column is-12">
					<div className="box" style={{height: "75vh"}}>
						<div className="confession" style={{height: "90%", display: currentTab.toLowerCase() == "world" ? "block" : "none"}}>
							<WorldConfession />
							<MakeConfession />							
						</div>
						{
							currentTab.toLowerCase() == "personal"
							&&
							<div className="confession" style={{height: "90%"}}>
								<PersonalConfession />
							</div>	
						}
						
					</div>
				</div>
				<div className="column is-8">
					<div style={{minHeight: "60px"}}>
						<hr className="mt-0 mb-0" />
						<Verses />
					</div>
				</div>
			</div>
		</Main>	
	)
}


