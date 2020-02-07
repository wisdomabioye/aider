import { whyAider } from "../app.config";

export default function Features() {
	return (
		<div className="section pt-0 pb-0">
			<h2 className="is-size-4 mb-4">Why Aider?</h2>
			<div className="columns is-centered is-multiline is-vcentered">
				{
					whyAider.map( (why, i) => (
						<div className="column is-6" key={i}>
							<div className="" style={{minHeight: "200px"}}>
								<h2 className="box has-text-centered has-background-dark pt-1 pb-1 pr-1 pl-1" style={{maxWidth: "60px"}}>
									<span className={"is-size-4 has-text-light " + why.icon}></span>
								</h2>
								<h3 className="is-size-6 strong">{why.name}</h3>
								<h4 className="is-size-6 mt-2 has-text-grey">{why.description}</h4>
							</div>
						</div>
					))
				}

			</div>
		</div>
	)
}