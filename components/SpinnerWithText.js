
export default function SpinnerWithText(props) {
	if (!props.action) {
		return null;
	}
	return (
		<span><button className="button is-loading is-white is-small"></button>&nbsp;{props.action}</span>
	)
}