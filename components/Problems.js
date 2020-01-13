import { problems } from "../app.config";

export default function Problems() {
	return (
		<div className="columns is-centered is-multiline">
			{
				problems.map( (prob, i) => (
					<div className="column is-3" key={i}>
						<div className="box has-text-centered">
							{prob.name}
						</div>
					</div>
				))
			}

		</div>
	)
}