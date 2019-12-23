import { useState, useEffect, useRef } from "react";

import { fakeConfession, prayers } from "../app.config";
import { scrollToLastConfession } from "../helpers/main";
import { createDocument, changeListener, removeChangeListener } from "../helpers/firestore";

import LoadingIcon from "../components/LoadingIcon";
import ConfessionEmpty from "../components/ConfessionEmpty";
import SingleConfessionContainer from "../components/SingleConfessionContainer";


export default function ListConfessions() {
	let [isLoading, setIsLoading] = useState(true);
	let [confessions, setConfessions] = useState(null);
	let [encryptedConfessions, setEncryptedConfessions] = useState(null);
	let [shouldAutoScroll, setShouldAutoScroll] = useState(true);

	let cfsSnapshot = useNewSnapshotData();

	let myRef = useRef(null);


	useEffect( () => {
		if (!cfsSnapshot || !confessions) {
			setConfessions([]);
			window.setTimeout(fakeRandomConfession, 30000);

		} else if (cfsSnapshot && !confessions) {
			setConfessions(cfsSnapshot);
		} else {
			let prayer = [{
				content: prayers[Math.floor(Math.random() * prayers.length)],
				name: ""
			}];
			let newCfs = JSON.parse(JSON.stringify([...confessions, ...cfsSnapshot, ...prayer]));
			setConfessions(newCfs);
		}

		if (shouldAutoScroll) {
			window.setTimeout(scrollToLastConfession.bind(null, myRef.current), 300);
		}
		
	}, [cfsSnapshot])

	function handleScroll(e) {
		let {clientHeight, scrollHeight, scrollTop} = e.target;
		if (scrollTop < (scrollHeight - clientHeight)) {
			// scroll bar not at the bottom
			// user is scrolling up and should not autoscroll
			setShouldAutoScroll(false);
		} else {
			setShouldAutoScroll(true);
		}
	}

	return (
		<div className="columns is-multiline is-centered" style={{overflowY: "auto", maxHeight: "98%", minHeight: "90%"}} ref={myRef} onScroll={handleScroll}>
			{
				cfsSnapshot === null
				?
				<LoadingIcon />
				:
				confessions.length
				?
				confessions.map( (cfs, i) => (
					<SingleConfessionContainer {...cfs} key={i} />
				))
				:
				<ConfessionEmpty />
			}
		</div>
	)
}

function useNewSnapshotData() {
	let [confessions, setConfessions] = useState(null);

	useEffect( () => {
		
		changeListener("confessions", "added", function(newCfs) {
			let newConfessions = JSON.parse(JSON.stringify(newCfs));
			setConfessions(newConfessions);
		})
		return () => removeChangeListener("confessions", function() {});
	}, [])

	return confessions;
}

async function fakeRandomConfession(interval = 300000 /*5 mins*/) {
	let index = Math.floor(Math.random() * fakeConfession.length);
	let randCfs = fakeConfession[index];

	await createDocument("confessions", {
		content: randCfs,
		time: new Date(),
		type: "fake"
	})
	window.setTimeout(fakeRandomConfession, 30000)

}