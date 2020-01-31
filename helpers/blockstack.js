import { UserSession, AppConfig } from "blockstack";
import { blockstackConfig } from "../app.config";
import { financeFilename } from "./main";

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

/*
* Storage helpers
*/

export async function putFile(name, data, options = {}) {
    let option = {
        encrypt: true,
        ...options
    }
    try {
        await userSession.putFile(name, data, option);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export async function getFile(name, options = {}) {
    let option = {
        decrypt: true,
        ...options
    }
    try {
        let file = await userSession.getFile(name, option);
        return file;
    } catch (error) {
        console.log(error);
    }
}

export async function encryptAFile(name, options = {}) {
    // get the unencrypted file
    let unencrypted = await getFile(name, {decrypt: false});
    if (unencrypted) {
        // save the file encrypted
        await putFile(name, unencrypted, {encrypt: true, ...options});
        return true;
    }
}

export async function decryptAFile(name, options = {}) {
    // get the encrypted file
    let encrypted = await getFile(name, {decrypt: true});
    if (encrypted) {
        //save the file unencrypted
        await putFile(name, encrypted, {encrypt: false, ...options});
        return true;
    }
}

export function getFileUrl(name) {
    return userSession.getFileUrl(name);
}
 

export function listFilesInStorage(callback) {
    return userSession.listFiles(callback);
}

// /finances helpers
export async function setDataJSON(name, data) {
	let option = {
		encrypt: true
	}

	try {
		await userSession.putFile(name + ".json", JSON.stringify(data), option);
		return true;
	} catch (error) {
		console.log(error);
	}
}

export async function getDataJSON(name) {
	let option = {
		decrypt: true
	}

	try {
		let file = await userSession.getFile(name + ".json", option);
		return JSON.parse(file);
	} catch (error) {
		console.log(error);
	}
}

export async function removeData(name) {
	try {
		await userSession.deleteFile(name);
		return true;
	} catch (error) {
		console.log(error);
	}
}

// files helpers

export async function addToFileListJSON(name, newFileInfo) {
    let fileInfo = await getDataJSON(name);

    if (!fileInfo) {
        // create the file
        return await setDataJSON(name, [newFileInfo]);
    } else {
        // push new fileInfo
        fileInfo.push(newFileInfo);
        return await setDataJSON(name, fileInfo);
    }
}

export async function updateFileListJSON(name, indexToUpdate, newData) {
    let fileInfo = await getDataJSON(name);

    if (fileInfo) {
        fileInfo[indexToUpdate] = newData;
        return await setDataJSON(name, fileInfo);
    }
}

export async function removeFromFileListJSON(name, arrayOfFileName) {
    
    if (!Array.isArray(arrayOfFileName)) {
        arrayOfFileName = [arrayOfFileName];
    }

    let fileInfo = await getDataJSON(name);

    if (fileInfo) {
        let filteredFileInfo = [];

        for (let file of fileInfo) {
            if (arrayOfFileName.indexOf(file.name) < 0) {
                filteredFileInfo.push(file);
            }
        }

        // update the file
        return await setDataJSON(name, filteredFileInfo);
    }
}