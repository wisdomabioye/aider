import Head from "next/head";

import { appInfo } from "../app.config";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

import ('../styles/nprogress.scss');
import ('../styles/main.scss');

export default function Main(props) {
	return (
		<div className="container is-fullhd">
			<Head>
	          <title> { appInfo.tagline }</title>
			</Head>
			<div className="columns mb-0">
				<div className="column is-3 fullpage-height has-background-dark pr-3 pl-3">
					<Sidebar />
				</div>
				<div className="column fullpage-height pr-3 pl-3">
					<TopNav />
					{props.children}
				</div>
			</div>
			<Footer />
		</div>
	)
}