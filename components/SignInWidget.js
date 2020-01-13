import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

import { useAuthStatus } from "../helpers/hooks";

export default function SignInWidget() {
	let status = useAuthStatus();
	
	return (
		<div className="buttons is-centered">
			{
				status
				?
				<SignOutButton size="normal" />
				:
				<SignInButton size="normal" />	
			}
		</div>
	)
}