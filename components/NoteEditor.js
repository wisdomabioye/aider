import LoadingIcon from "./LoadingIcon";

const ReactQuill = typeof window === "object" ? require("react-quill") : () => <LoadingIcon />;

const modules = {
	toolbar: [
	  [{font: []}, { 'header': [1, 2, 3, 4, 5, 6, false] }],
	  ['bold', 'italic', 'underline','strike'],
	  ['blockquote', 'code-block'],
	  [{align: []}],
	  [{'list': 'ordered'}, {'list': 'bullet'}],
	  [{script: 'sub'}, {script: 'super'}],
	  [{'indent': '-1'}, {'indent': '+1'}],

	  [{direction: 'rtl'}],

	  ['link', 'image'],

	  [{color: []}, {background: []}],
	  ['clean']
	]
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'script',
    'align', 'list', 'bullet', 'indent', 'direction', 
 	'color', 'background', 
    'code-block','link', 'image'
];

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
			formats={formats}
			modules={modules}
			theme="snow"
			style={{height: "320px"}}
			placeholder={props.placeholder || "Your awesome note content"}
		/>
	)
}