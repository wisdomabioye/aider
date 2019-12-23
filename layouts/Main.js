import Head from 'next/head';

import { appInfo } from '../app.config';
import Header from '../components/Header';
import Footer from '../components/Footer';

import ('../styles/nprogress.scss');
import ('../styles/main.scss');

export default Main;

function Main(props) {
	let {name} = appInfo;
	
	return (
		<div className="container is-fullhd">
			<Head>
				<title> { name }</title>
			</Head>
			<Header />
				<div>
					{props.children}
				</div>
			<Footer />
		</div>
	)
}