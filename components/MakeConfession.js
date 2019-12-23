import { saveEncryptedConfession, signedIn } from "../helpers/blockstack";
import { toggleLoadingButton } from "../helpers/main";
import { createDocument } from "../helpers/firestore";
import SignInButton from "../components/SignInButton";

export default function MakeConfession() {

	if (!signedIn()) {
		return (
			<SignInButton size="normal" />
		)
	}

	return (
		<div className="field has-addons" style={{minHeight: "10%"}}>
	  		<div className="control is-expanded">
	    		<input className="input" type="text" placeholder="Make a confession, min of 10 chars" onKeyUp={confessNow} id="confess-box" autoComplete="off" />
			</div>
			<div className="control">
			    <button className="button is-primary" onClick={confessNow} id="confess-btn">
			      Confess
			    </button>
			</div>
		</div>
	)
}


async function confessNow(e) {
	if (e.type == "click" || (e.type == "keyup" && e.keyCode == 13)) {
		try {
			/*
			* TODO: use React.useRef
			*/
			toggleLoadingButton("#confess-btn");
			let box = document.getElementById("confess-box");

			if (box.value && box.value.length >= 10) {
				await saveEncryptedConfession(box.value);
				await createDocument("confessions", {
					content: box.value,
					time: new Date()
				})
				box.value = "";
			}

		} catch (error) {
			console.log(error);
		} finally {
			toggleLoadingButton("#confess-btn");
		}
	}
	
}