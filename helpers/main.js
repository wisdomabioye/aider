export function toggleLoadingButton(btnElement) {
	if (typeof btnElement === "string") {
		btnElement = document.querySelector(btnElement);	
	}

	if (btnElement && "classList" in btnElement) {
		btnElement.classList.toggle("is-loading");
	}
}

export function scrollToLastConfession(container) {
	/*
	* scroll to last confession only
	* if scroll bar is at the bottom 
	* of the container
	*/

	let scrollHeight = container.scrollHeight, //container height
		clientHeight = container.clientHeight, // currently in view height
		scrollTop = container.scrollTop; // currently scrolled from top

	let maxScrollable = container.scrollHeight - container.clientHeight; 
	
	/*
	* Scroll to bottom
	*/
	container.scrollTo({left: 0, top: maxScrollable, behavior: "auto"});
}
