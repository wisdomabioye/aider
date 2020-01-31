import { features } from "../app.config";

export default function Features() {
	return (
		<div className="columns is-centered is-multiline">
			{
				features.map( (feature, i) => (
					<div className="column is-5" key={i}>
						<div className="box has-text-centered" style={{minHeight: "250px"}}>
							<h2>
								<span className={"is-size-1 has-text-grey " + feature.icon}></span>
							</h2>
							<h3 className="is-size-4">{feature.name}</h3>
							<h4 className="is-size-6 mt-2">{feature.description}</h4>
						</div>
					</div>
				))
			}

		</div>
	)
}