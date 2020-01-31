import {useState, useEffect} from "react";
import Head from "next/head";

import { signedIn, completeSignIn, currentUser, signOut } from "../helpers/blockstack";

import { appInfo } from "../app.config";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import SignInButton from "../components/SignInButton";
import Footer from "../components/Footer";

import ('../styles/nprogress.scss');
import ('../styles/main.scss');

export default function Main(props) {
	let [signInStatus, setSignInStatus] = useState(signedIn());

	useEffect( () => {
		if (!currentUser()) {
			completeSignIn()
			.then( userData => {
				if (userData) {
					setSignInStatus(true);
				}
			})
			.catch( error => {
				console.log(error)
			})
		}
		setSignInStatus(signedIn());
	})
	function signOutAlert() {
		signOut();
		setSignInStatus(signedIn());
	}
	return (
		<div className="container is-fullhd">
			<Head>
	          <title> {props.title ? props.title + " | " : ""}{ appInfo.description }</title>
			</Head>
			<div className="columns">
				<div className="column is-3 fullpage-height has-background-dark pr-3 pl-3">
					<Sidebar />
				</div>
				<div className="column is-9 fullpage-height pr-3 pl-3">
					{
						signInStatus 
						?
						<div>
							<TopNav alert={signOutAlert} username={currentUser().username}/>
							<div>
								<h1 className="is-size-5 mb-2 mt-2">{props.title}</h1>
								{props.children}
							</div>
						</div>
						:
						<OverlayContainer />
					}
					<Footer />
				</div>
			</div>
		</div>
	)
}

function OverlayContainer() {
	return (
		<div className="box has-text-centered">
			<h2 className="is-size-5 mb-2">You need to sign in first</h2>
			<SignInButton/>
		</div>
	)
}