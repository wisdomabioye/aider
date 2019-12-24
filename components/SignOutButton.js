import { signOut } from "../helpers/blockstack";

export default function SignInButton(props) {
	async function handleLogout() {		
		try {
			await signOut();
			props.updateStatus();
		} catch (error) {
			console.log("Error signing out", error);
		}
	}

	return (
		<button className={`button is-${props["size"] || "large"}`} onClick={handleLogout}>
			<img width="20" src="/images/blockstack.svg" alt="Blockstack" />
			<span className="pl-1">Sign out</span>
		</button>
	)
}
