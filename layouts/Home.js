import Head from "next/head";

import { appInfo } from "../app.config";
import Header from "../components/Header";
import Footer from "../components/Footer";


import ('../styles/nprogress.scss');
import ('../styles/main.scss');


export default function Home(props) {
	return (
		<div className="container is-fullhd">
			<Head>
	          <title> { appInfo.tagline }</title>
			</Head>
			<Header />
			<div>
				{props.children}
			</div>
			<Footer />
		</div>
	)
}