
export default function Logo(props) {
	return (
		<figure className="image-centered pt-4" style={{width: props.size || "54px"}}>
			<img src="/images/confession.svg" alt="Aider" />
		</figure>
	)
}