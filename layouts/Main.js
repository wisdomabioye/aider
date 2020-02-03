import {useState, useEffect} from "react";
import Head from "next/head";

import { signedIn, completeSignIn, currentUser, signOut, checkMigration, migrateLegacyFiles } from "../helpers/blockstack";

import { appInfo } from "../app.config";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import SignInButton from "../components/SignInButton";
import Footer from "../components/Footer";

import ('../styles/nprogress.scss');
import ('../styles/main.scss');

export default function Main(props) {
	let [signInStatus, setSignInStatus] = useState(signedIn());
	let [requireMigration, setRequireMigration] = useState(false);
	let [migrating, setIsMigrating] = useState(false);
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
		findLegacyFiles();
	}, [signInStatus, migrating])

	async function findLegacyFiles() {
		
		if (signInStatus) {
			let files = await checkMigration();
			if (files) {
				setRequireMigration(true);
			}
		}
		
	}

	async function migrateNow() {
		setIsMigrating(true);

		await migrateLegacyFiles();

		setIsMigrating(false);
		setRequireMigration(false);
	}

	function signOutAlert() {
		signOut();
		setSignInStatus(signedIn());
	}
	return (
		<div className="container is-fullhd has-background-white">
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
							<TopNav alert={signOutAlert} username={currentUser().username} title={props.title}/>
							{
								requireMigration &&
								<div>
									<strong>
										Hi, due to platform upgrade to ensure efficiency, you are required to migrate to the latest version. It will only take few minutes. &nbsp;
											<button className={"button is-dark is-small " + (migrating && "is-loading")} onClick={migrateNow}>
												Migrate now
											</button>

									</strong>
								</div>

							}
							
							{props.children}
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
		<div className="box">
			<div className="has-text-centered">
				<h2 className="is-size-5 mb-2">You need to sign in first</h2>
				<SignInButton/>
			</div>
		</div>
	)
}