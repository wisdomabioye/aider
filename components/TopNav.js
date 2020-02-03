
export default function TopNav(props) {
	function toggleSidebarDisplay() {
		/*
		TODO: useRef (instead of direct access)
		*/
		let sidebar = document.querySelector(".sidebar");
		let overlay = document.querySelector(".content-overlay");
		
		let mainContent = document.querySelector(".main-content");
		let mainContentPaddingLeft = window.getComputedStyle(mainContent).paddingLeft;

		if (parseInt(mainContentPaddingLeft) > 200) {
			// display is greater than touch device (desktop)
			return;
		}

		if (sidebar.classList.contains("is-hidden-touch")) {
			//unhide the sidebar
			// sidebar.classList.remove("is-hidden-touch");
			sidebar.classList.remove("is-hidden-touch");
			overlay.style.display = "block";
		} else {
			sidebar.classList.add("is-hidden-touch");
			overlay.style.display = "none";
		}
	}
	return (
		<div className="columns is-mobile">
			<div className="column is-narrow">
				<div className="columns">

					<div className="column is-narrow">
						<div className="navbar-burger is-pulled-left" onClick={toggleSidebarDisplay}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					<h1 className="column is-narrow is-size-5 mt-1 is-hidden-mobile">{props.title}</h1>
				</div>
			</div>

			<div className="column is-pulled-right">
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