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

export class Storage {
    constructor(path, filename) {
        // The path to the file in context
        // drive/, finances/, note/, config/

        if (!path || typeof path !== "string") {
            throw new Error("Path to Storage is required and must be a string");
        }
        this.path = path || "";
        this.filename = filename || "";
    }

    setPath(path) {
        this.path = path;
    }

    getPath() {
       return this.path;
    }

    getFilename() {
        return this.filename;
    }

    buildFilePath(filename) {
        return this.path + (filename || this.filename);
    }
    
    async listFiles(callback) {
        return userSession.listFiles(callback);
    }

    async putFile(filename, data, options = {}) {
        let name = this.buildFilePath(filename);

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

    async getFile(filename, options = {}) {
        let name = this.buildFilePath(filename);

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
    
    async getFileUrl(filename) {
        let name = this.buildFilePath(filename);
        return userSession.getFileUrl(name);
    }

    async remove(filename) {
        let name = this.buildFilePath(filename);
        try {
            await userSession.deleteFile(name);
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    async encrypt(filename, options = {}) {
         // get the unencrypted file
        let unencrypted = await this.getFile(filename, {decrypt: false});
        if (unencrypted) {
            // save the file encrypted
            await this.putFile(filename, unencrypted, {encrypt: true, ...options});
            return true;
        }
    }

    async decrypt(filename, options = {}) {
         // get the encrypted file
        let encrypted = await this.getFile(filename, {decrypt: true});
        if (encrypted) {
            //save the file unencrypted
            await this.putFile(filename, encrypted, {encrypt: false, ...options});
            return true;
        }
    }
}

export class JSONFile extends Storage {
    constructor(path, filename) {
        super(path, filename);
    }

    async getJSON(filename, options = {}) {
        let file = await this.getFile(filename, options);
        if (file) {
            return JSON.parse(file);
        }
    }
    
    async setJSON(filename, data, options = {}) {
        return await this.putFile(filename, JSON.stringify(data), options)
    }

    async pushToJSON(filename, newData) {
        let json = await this.getJSON(filename);

        if (!json) {
            // create the file
            return await this.setJSON(filename, [newData]);
        } else {
            // push new fileInfo
            json.push(newData);
            return await this.setJSON(filename, json);
        }
    }

    async replaceJSONIndex(filename, index, newData) {
        let json = await this.getJSON(filename);
        if (json) {
            json[index] = newData;
            return await this.setJSON(filename, json);
        }
    }

    async pushUniqueToJSON(filename, uniqueName, newData) {
        let json = await this.getJSON(filename);
        if (!json) {
            // create the file
            return await this.setJSON(filename, [newData]);
        }

        //find 'uniqueName' in 'json'
        let index;

        function finder(item, i) {
            if (item.name == uniqueName) {
                index = i;
                return true;
            }
        }

        let targetItem = json.find(finder);

        if (targetItem) {
            //replace the index with newData
            json[index] = {...targetItem, ...newData};
            return await this.setJSON(filename, json);
        } else {
            //push to json
            json.push(newData);
            return await this.setJSON(filename, json);
        }
    }

    async removeFromJSON(filename, indexNames) {
    
        if (!Array.isArray(indexNames)) {
            indexNames = [indexNames];
        }

        let json = await this.getJSON(filename);

        if (json) {
            let filteredFile = [];

            for (let record of json) {
                if (indexNames.indexOf(record.name) < 0) {
                    filteredFile.push(record);
                }
            }

            // update the file
            return await this.setJSON(filename, filteredFile);
        }
    }
}

// File Storage Structure
/*
    drive
        /filename.extention
        ...
    notes
        /notename.html
        ...
    config
        /finance.json
        /drive.json
        /note.json
        /profile.json
        ...
    finances
        /92020.json
        /82020.json
        /72020.json
        /102020.json
        /122020.json
        ...
*/

//Schemas
/*
    /drive
    {name: String, shared: String, date: Date, encrypt: Boolean, type: String}
*/


/*
 Initially, files in drive, finances, filelist.json are stored in the root storage. It is now organized to sub folder in the order of the structure above.

 For this legacy reason, the following functions do migration of existing files to the latest structure presented above.
*/
export async function checkMigration() {
    let option = {
        decrypt: true,
    }

    let filelist = await userSession.getFile("filelist.json", option);
    
    if (filelist) {
        return true;
    }

    let janFin = await userSession.getFile("12020.json", option);
    if (janFin) {
        return true;
    }

    let febFin = await userSession.getFile("22020.json", option);
    if (febFin) {
        return true;
    }
    return false;
}
export async function migrateLegacyFiles() {
    //migrate "filelist.json" to "config/drive.json"
    //migrate each item in "filelist.json" to "drive/filename.ext"
    
    console.log("Migration Started");
    await migrateFinances();
    await migrateDrive();
    console.log("Migration completed");
}

async function migrateDrive() {
    //migrate "filelist.json" to "config/drive.json"
    //migrate each item in "filelist.json" to "drive/filename.ext"
    let option = {
        decrypt: true,
    }
    let file = await userSession.getFile("filelist.json", option);
    if (file) {
        const DRIVE = new Storage("drive/");

        file = JSON.parse(file);
        for (let [index, record] of file.entries()) {
            //reset the shared link
            file[index]["shared"] = "";

            let content = await userSession.getFile(record.name, {decrypt: record.encrypt});
            await DRIVE.putFile(record.name, content, {encrypt: record.encrypt});
            await userSession.deleteFile(record.name);
        }
        // transfer filelist.json content to config/drive.json
        await userSession.putFile("config/drive.json", JSON.stringify(file), {encrypt: true});
        //finally, delete "filelist.json"
        await userSession.deleteFile("filelist.json");
    }
}

async function migrateFinances() {
    //migrate finance "12020.json" and "22020.json" to "finances/monthyear.json"
    let fins = ["12020.json", "22020.json"];
    let option = {
        decrypt: true,
    }

    const FINANCE = new Storage("finances/");
    console.log("Finances migration started");
    for (let fin of fins) {

        try {
            // get the file
            let file = await userSession.getFile(fin, option);
            if (file) {
                await FINANCE.putFile(fin, file);
                await userSession.deleteFile(fin);
            } 

        } catch (error) {
            console.log(fin, error);
        }
    }
    console.log("Finances migration completed");
}

