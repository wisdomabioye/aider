export default function Loading(props) {
	return (
		<div className="columns is-centered is-vcentered">
			<div className="column is-11 has-text-centered">
				<button className={`button is-white is-${props.size || "large"} is-loading`}></button>
			</div>
		</div>
	)
}