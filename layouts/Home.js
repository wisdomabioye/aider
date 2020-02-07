import {useState, useEffect} from "react";
import Head from "next/head";

import { appInfo } from "../app.config";
import Header from "../components/Header";
import Footer from "../components/Footer";

import ('../styles/nprogress.scss');
import ('../styles/main.scss');


export default function Home(props) {
	let [isLoading, setIsLoading] = useState(true);
	
	useEffect(() => {
		setIsLoading(false);
	}, [])
	
	return (
		<div className="container has-background-white pb-4">
			<Head>
	          <title>{appInfo.name} | { appInfo.description }</title>
			</Head>
			{
				!isLoading
				&&
				<div>
					<Header />
					<div>
						{props.children}
					</div>
					<Footer />
				</div>
			}
		</div>
	)
}