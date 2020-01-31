import { features } from "../app.config";

export default function Features() {
	return (
		<div className="columns is-centered is-multiline">
			{
				features.map( (feature, i) => (
					<div className="column is-5" key={i}>
						<div className="box has-text-centered">
							<h3 className="">
								<span className={"is-size-1 " + feature.icon}></span>
							</h3>
							{feature.name}
						</div>
					</div>
				))
			}

		</div>
	)
}