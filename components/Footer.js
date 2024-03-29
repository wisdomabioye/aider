import { appInfo } from "../app.config";

export default Footer;

function Footer() {
	let { name, currentYear, contact } = appInfo;
	return (
		<footer className="has-text-centered mt-4 pl-2">
			<h4 className="is-size-7">
				&copy; { currentYear }, { name } - { contact }
			</h4>

			<style jsx>
				{`
					footer {
						position: absolute;
						bottom: 5px;
						text-align: center;
						right: 10px;
					}
				`}
			</style>
		</footer>
	)
}