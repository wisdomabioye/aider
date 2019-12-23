import * as firebase from "firebase/app";
import "firebase/firestore";

import { firebaseConfig } from "../app.config";

if ( !firebase.apps.length ) {
	firebase.initializeApp(firebaseConfig);
}

const DB = firebase.firestore();

// CRUD

export function createDocument(collection, document) {
	return DB.collection(collection).add(document);	
}

export function setDocument(collection, documentId, document) {
	return DB.collection(collection).doc(documentId).set(document, {merge: true});	
}

export function readOneDocument(collection, documentId) {
	return DB.collection(collection).doc(documentId)
	.get()
	.then( doc => {
		if (doc.exists) {
			let document = doc.data();
				document["id"] = doc.id;
			return Promise.resolve(document);
		} else {
			return Promise.resolve(null);
		}
	})
	.catch(err => {
		return Promise.reject(err);
	})
}
export function readOneDocumentWithClause(collection, options = {}) {
	let where = options.where;

	let query = DB.collection(collection);
	
	if (where) {
		if (where[0] instanceof Array) {
			// It's an array of array
			for (let w of where) {
				query = query.where(...w);
			}
		} else {
			query = query.where(...where);
		}
	}
	
	query = query.limit(1);
	return query
			.get()
			.then(querySnapshot => {
				let documents = [];
				querySnapshot.forEach( doc => {
					let temp = doc.data();
						temp["id"] = doc.id;

					documents.push(temp);
				})
				return Promise.resolve(documents[0]);
			})
			.catch( err => {
				return Promise.reject(err);
			})
}
export function readDocuments(collection, options = {}) {
	let where = options.where,
		order = options.order,
		limit = options.limit;

	let query = DB.collection(collection);
	
	if (where) {
		if (where[0] instanceof Array) {
			// It's an array of array
			for (let w of where) {
				query = query.where(...w);
			}
		} else {
			query = query.where(...where);
		}
		
	}

	if (order) {
		query = query.orderBy(...order);
	}

	if (limit) {
		query = query.limit(limit);
	}
	
	return query
			.get()
			.then(querySnapshot => {
				let documents = [];
				querySnapshot.forEach( doc => {
					let temp = doc.data();
						temp["id"] = doc.id;

					documents.push(temp);
				})
				return Promise.resolve(documents);
			})
			.catch( err => {
				return Promise.reject(err);
			})
}

export function updateOneDocument(collection, document, documentId = "") {
	return DB.collection(collection)
	.doc(document.id || documentId)
	.update(document);
}

export function deleteOne(collection, documentId) {
	return DB.collection(collection)
	.doc(documentId)
	.delete();
}

export function changeListenerback(collection, callback) {
	return DB.collection(collection)
		.onSnapshot({includeMetadataChanges: false}, callback);
}

export function removeChangeListener(collection, callback) {
	let unsub = DB.collection(collection)
		.onSnapshot({includeMetadataChanges: false}, callback);

	unsub();
}

export function changeListener(collection, changeType, callback) {
	DB.collection(collection)
		.orderBy("time", "asc")
		.onSnapshot({includeMetadataChanges: false}, function(snapshot) {
			let docs = [];

			snapshot.docChanges().forEach(function(change) {
				let dta = change.doc.data();
					dta["id"] = change.doc.id;
				
				//change.type could be "added" | "modified" | "removed"
				
				if (typeof changeType != "undefined" && change.type == changeType) {
					docs.push(dta);
				} else {
					docs.push(dta);
				}
			})
		callback(docs);
	})
}