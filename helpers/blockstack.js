import { UserSession, AppConfig } from "blockstack";
import { blockstackConfig } from "../app.config";

let appConfig = new AppConfig(blockstackConfig);
let userSession = new UserSession({appConfig});

export function signIn() {
	userSession.redirectToSignIn(blockstackConfig.redirectPath, blockstackConfig.manifestPath, blockstackConfig.scopes);
}

export function signOut() {
	return userSession.signUserOut();
}

export function signedIn() {
	return userSession.isUserSignedIn();
}

export function currentUser() {
	if (!signedIn()) return;
	return userSession.loadUserData();
}

export async function completeSignIn() {
	if (userSession.isSignInPending()) {
		return userSession.handlePendingSignIn();
	}
}

export async function getDecryptedConfession() {
	let option = {
		decrypt: true
	}

	try {
		let file = await userSession.getFile("/confessions.json", option);
		return JSON.parse(file);

	} catch (error) {
		console.log("Error fetching confession", error);
	}

}

export async function saveEncryptedConfession(newConfession) {
	let option = {
		encrypt: true
	}

	try {
		//get the file then update and save
		let pastConfession = await getDecryptedConfession();
		// console.log("pastConfession>>", pastConfession);

		if (!pastConfession) {
			pastConfession = [];
		}
		// pastConfession should be an array
		pastConfession.push(newConfession);

		let updatedConfession = await userSession.putFile("/confessions.json", JSON.stringify(pastConfession), option);

		return updatedConfession;

	} catch (error) {
		console.log("Error saving confession>>>", error);
	}
}

