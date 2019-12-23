import { happinessRules } from "../app.config";

export default function HappyPeople() {
	return (
		<ul style={{listStyle: "lower-greek inside"}}>
			{
				happinessRules.map((rule, i) => (
					<li key={i} className="pt-1 pb-1">{rule}</li>
				))
			}
		</ul>
	)
}