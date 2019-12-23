export default function AvatarMock(props) {
	let {width = "40", height = "40", text = "CF"} = props;

	let colors = ["#181840", "#c21111", "#117bc2", "#d13d7f", "#c5166c", "#b066aa", "#9534b2", "#4388ab", "#a83b39", "#9d1d84", "#31b590", "#181345", "#133645", "#0aa356", "#e30258", "#e36002"];
	let rand = Math.floor(Math.random() * colors.length);
	let color = colors[rand];
	return (
		<span style={{height: `${height}px`, width: `${width}px`, backgroundColor: color, borderRadius: "50%", padding: "8px", textAlign: "center", color: "#fff", fontWeight: "bold", display: "block"}}>
			{text} 
		</span>
	)
}