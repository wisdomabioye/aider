import LoadingIcon from "./LoadingIcon";

const ReactQuill = typeof window === "object" ? require("react-quill") : () => <LoadingIcon />;

export default function NoteEditor(props) {

	function handleKeyUp(e) {

	}

	function handleBlur(e) {

	}

	return (
		<ReactQuill
			value={props.content}
			onChange={props.changeHandler}
			readOnly={props.readOnly}
			onKeyUp={handleKeyUp}
			onBlur={handleBlur}
			theme="snow"
			className="note-editor mt-2"
			placeholder={props.placeholder || "Your awesome note content"}
		/>
	)
}