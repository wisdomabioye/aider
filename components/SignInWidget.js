import { useState } from "react";

import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { signedIn } from "../helpers/blockstack";

export default function SignInWidget() {
	let [status, setStatus] = useState(signedIn());

	function updateStatus() {
		setStatus(!status);
	}

	return (
		<div className="has-text-centered mt-4">
			{
				status
				?
				<SignOutButton updateStatus={updateStatus} />
				:
				<SignInButton />	
			}
			
			<p className="is-size-7">
				Confessions are encrypted, anonymous and published without confessor details
			</p>
		</div>
	)
}