import { features } from "../app.config";

export default function Features() {
	return (
		<div className="section pt-0 pb-0">
		<h2 className="is-size-4 mb-4">Features</h2>
			<div className="columns is-centered is-multiline">
				{
					features.map( (feature, i) => (
						<div className="column is-4" key={i}>
							<div className="box has-background-dark" style={{minHeight: "250px"}}>
								<h2 className="box has-text-centered has-background-light pt-1 pb-1 pr-1 pl-1" style={{maxWidth: "60px"}}>
									<span className={"is-size-3 has-text-dark " + feature.icon}></span>
								</h2>
								<h3 className="is-size-5 strong has-text-light">{feature.name}</h3>
								<h4 className="is-size-6 mt-2 has-text-grey-lighter">{feature.description}</h4>
							</div>
						</div>
					))
				}

			</div>
		</div>
	)
}