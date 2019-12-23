import { useState, useEffect } from "react";
import { verses } from "../app.config";

export default Verse;

function Verse(props) {
	let [currentVerse, setCurrentVerse] = useState(verses[0]);

	let interval = props["interval"] || 10000;

	useEffect( () => {
		let index = 0;

		let loopVerses = setTimeout(updateIndex, interval);

		function updateIndex() {
			if ( ++index == verses.length ) index = 0;
			
			setCurrentVerse(verses[index]);
			setTimeout(updateIndex, interval);
		}

		return () => window.clearTimeout(loopVerses);
	})

	


	return (
		<div className="has-text-centered mt-1 mb-4">
			<p className="pr-2 pl-2"> 
				<em>{ currentVerse["text"] }</em>
			 </p>
			 <strong className="has-text-light"> { currentVerse["location"] } </strong>
		</div>
	)
}
