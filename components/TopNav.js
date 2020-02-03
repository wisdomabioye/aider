
export default function TopNav(props) {

	return (
		<div className="columns mt-2 is-mobile">
			<h1 className="column is-5 is-size-5 mt-1">{props.title}</h1>
			<div className="column is-7">
				<div className="tags are-small is-pulled-right pt-2 mb-4 pr-2 pl-2">
					<span className="tag is-dark">
						{props.username}
					</span>
					<span className="tag is-dark pointer" onClick={props.alert}>
						Sign out
					</span>
				</div>
			</div>
		</div>
	)
}