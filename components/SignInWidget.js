import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { signedIn } from "../helpers/blockstack";

export default function SignInWidget() {

	return (
		<div className="has-text-centered mt-4">
			{
				signedIn()
				?
				<SignOutButton />
				:
				<SignInButton />	
			}
			
			<p className="is-size-7">
				Confessions are encrypted, anonymous and published without confessor details
			</p>
		</div>
	)
}