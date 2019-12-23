import { signIn } from "../helpers/blockstack";

export default function SignInButton(props) {

	return (
		<button className={`button is-${props["size"] || "large"}`} onClick={signIn}>
			<img width="25" src="/images/blockstack.svg" alt="Blockstack" />
			<span className="pl-1">Sign in with Blockstack</span>
		</button>
	)
}
