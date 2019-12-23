import { signOut } from "../helpers/blockstack";

export default function SignInButton(props) {
	return (
		<button className={`button is-${props["size"] || "large"}`} onClick={signOut}>
			<img width="20" src="/images/blockstack.svg" alt="Blockstack" />
			<span className="pl-1">Sign out</span>
		</button>
	)
}
