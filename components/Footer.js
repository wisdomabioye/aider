import { appInfo } from "../app.config";

export default Footer;

function Footer() {
	let { description, currentYear, contact } = appInfo;
	return (
		<footer className="has-text-centered">
			<h4 className="is-size-7">
				&copy; { currentYear }, { description } - { contact }
			</h4>
		</footer>
	)
}