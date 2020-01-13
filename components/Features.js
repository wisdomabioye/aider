import { features } from "../app.config";

export default function Features() {
	return (
		<div className="columns is-centered is-multiline">
			{
				features.map( (feature, i) => (
					<div className="column is-3" key={i}>
						<div className="box has-text-centered">
							{feature.name}
						</div>
					</div>
				))
			}

		</div>
	)
}