import {useState, useEffect, useRef} from "react";
import Head from "next/head";

import { signedIn, completeSignIn, currentUser, signOut } from "../helpers/blockstack";

import { appInfo } from "../app.config";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import SignInButton from "../components/SignInButton";
import Footer from "../components/Footer";

import ('../styles/nprogress.scss');
// import ('../styles/quill.core.scss');
import ('../styles/quill.snow.scss');
import ('../styles/main.scss');

export default function Main(props) {
	let [signInStatus, setSignInStatus] = useState(signedIn());
	let overlayRef = useRef(null);
	let sidebarRef = useRef(null);

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
	}, [signInStatus])

	function signOutAlert() {
		signOut();
		setSignInStatus(signedIn());
	}

	function handleClickOnOverlay() {
		sidebarRef.current.classList.add("is-hidden-touch");
		overlayRef.current.style.display = "none";
	}
	return (
		<div className="container is-fullhd has-background-white is-marginless">
			<Head>
	          <title> {props.title ? props.title + " | " : ""}{ appInfo.description }</title>
			</Head>
			<div ref={sidebarRef} className="sidebar is-hidden-touch fullpage-height has-background-dark pr-4 pl-3">
				<Sidebar />
			</div>

			<div className="main-content fullpage-height pb-4">
				{
					signInStatus 
					?
					<div className="pl-2 pr-2">
						<TopNav alert={signOutAlert} username={currentUser().username} title={props.title}/>
						{props.children}
					</div>
					:
					<SignInButton/> /*sign in container*/
				}
				<Footer />
			</div>
			{/*overlay on .main-content when sidebar is active on small screen*/}
			<div className="content-overlay" ref={overlayRef} onClick={handleClickOnOverlay}></div>
		</div>
	)
}

function OverlayContainer() {
	return (
		<div className="box">
			<div className="has-text-centered">
				<h2 className="is-size-5 mb-2">You need to sign in first</h2>
				<SignInButton/>
			</div>
		</div>
	)
}