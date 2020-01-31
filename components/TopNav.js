
export default function TopNav(props) {

	return (
		<div className="tags are-small is-right pt-2 mb-4 pr-2 pl-2">
			<span className="tag is-dark">
				{props.username}
			</span>
			<span className="tag is-dark pointer" onClick={props.alert}>
				Sign out
			</span>
		</div>
	)
}