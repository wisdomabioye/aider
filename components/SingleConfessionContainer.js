import AvatarMock from "./AvatarMock";

export default function SingleConfessionContainer(props) {
	let {content, time = ""} = props;

	let av = content.split(" ").slice(0, 2);

	return (
		<div className="column is-11 p-0 mt-1 mb-1">
			<div className="columns is-mobile mt-1 mb-1">
				<div className="column is-narrow">
					<AvatarMock text={getRandomLetters(content)} />
				</div>

				<p className="column is-10 has-background-light pt-2 pb-2 pl-2 pr-2 br-1">{ content }</p>
			</div>
		</div>
	)
}


function getRandomLetters(str, length = 2) {
	if (!str || typeof str !== "string") return str;

	let letters = "";
	let upperStart = 65 /*A*/, upperEnd = 90 /*Z*/,
		lowerStart = 97 /*a*/, lowerEnd = 122 /*z*/;
	for (let i = 0; i < str.length; i++) {
		let code = str[i].charCodeAt();

		let upperCode = code >= upperStart && code <= upperEnd;
		let lowerCode = code >= lowerStart && code <= lowerEnd;


		if (upperCode || lowerCode) {

			if (letters.length < length) {
				letters += str[i];
			} else {
				break;
			}

		}
	}

	return letters.toUpperCase();
}