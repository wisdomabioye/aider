import { useState, useEffect } from "react";

import LoadingIcon from "./LoadingIcon";

const CKEditor = typeof window === "object" ? require("@ckeditor/ckeditor5-react") : () => <LoadingIcon />;
const ClassicEditor = typeof window === "object" ? require("@ckeditor/ckeditor5-build-classic") : () => null;

export default function NoteEditor(props) {
	function handleKeyUp(e) {

	}

	function handleError(err) {
		console.log("Editor Error", err);
	}

	return (
		<CKEditor
			editor={ ClassicEditor }
			config={{placeholder: "Your awesome note content", removePlugins: [ 'ImageToolbar', 'ImageCaption', 'ImageStyle' ], image: {}}}
			data={props.content}
			onChange={props.changeHandler}
			onError={handleError}
		/>
	)
}