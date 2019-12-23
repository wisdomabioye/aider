import { useState, useEffect } from "react";

import { getDecryptedConfession } from "../helpers/blockstack";
import { scrollToLastConfession } from "../helpers/main";

import LoadingIcon from "../components/LoadingIcon";
import ConfessionEmpty from "../components/ConfessionEmpty";
import SingleConfessionContainer from "../components/SingleConfessionContainer";

export default function() {
	let [isLoading, setIsLoading] = useState(true);
	let [encryptedConfessions, setEncryptedConfessions] = useState(null);

	useEffect( () => {
		getDecryptedConfession()
		.then(cfs => {
			if (cfs) {
				setEncryptedConfessions(cfs);
			}
			setIsLoading(false);
		})
		.catch(error => {
			console.log(error);
		})
	}, [])

	return (
		<div className="columns is-multiline is-centered" style={{overflowY: "auto", maxHeight: "98%", minHeight: "90%"}}>
			{
				isLoading
				?
				<LoadingIcon />
				:
				encryptedConfessions && encryptedConfessions.length
				?
				encryptedConfessions.map( (cfs, i) => (
					<SingleConfessionContainer content={cfs} key={i} />
				))
				:
				<ConfessionEmpty />
			}
		</div>
	)
}