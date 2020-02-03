import { useState, useEffect } from "react";
import { signedIn } from "./blockstack";
import Database from "./localstorage";

export function useAuthStatus() {
	let [status, setStatus] = useState(signedIn());
	useEffect( () => {
		setStatus(signedIn());
	})
	return status;
}


export function useFinanceData(filename) {
	let storage = new Database(filename)
	/*
	* get file
	*/
	let [data, setData] = useState(null);

	useEffect( () => { fetchData() }, [])

	async function fetchData() {
		try {
			let finances = await storage.get();
			setData(finances);
		} catch (error) {
			console.log(error);
		}
		
	}

	async function updateData(doc) {
		try {
			await storage.setOrMerge(doc);
			fetchData();
		} catch (error) {
			console.log(error);
		}
		
	}

	return [data, updateData]
}

export function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {clearTimeout(handler)};
	}, [value])

	return debouncedValue;

}