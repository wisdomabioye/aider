import {useState, useEffect} from "react";

import Main from "../../layouts/Main";
import LoadingIcon from "../../components/LoadingIcon";
import SpinnerWithText from "../../components/SpinnerWithText";
import NoteEditor from "../../components/NoteEditor";
import {Input, Button} from "../../components/FormElements";

import {useDebounce} from "../../helpers/hooks";
import { removeFileExtention, truncateText, dayMonthTime, renameDuplicateFileName } from "../../helpers/main";
import { Storage, JSONFile } from "../../helpers/blockstack";

/*
* config/note.json
* We keep a json record of notes
* [
* 	{name, created, updated, shared, encrypt},
* 	{name, created, updated, shared, encrypt},
* ]
*/
const NOTE_CONFIG = new JSONFile("config/", "note.json");
const NOTE = new Storage("notes/");

export default function Notes() {
	let [notelistJSON, setNotelistJSON] = useState(null);
	let [visibility, setVisibility] = useState({list: true, view: false, edit: false, create: false});
	let [noteIndex, setNoteIndex] = useState(-1);
	let [watcher, setWatcher] = useState(0);
	let [ongoingAction, setOngoingAction] = useState(false);
	useEffect(() => {
		NOTE_CONFIG.getJSON()
		.then(notes => setNotelistJSON(notes ? notes.reverse() : []))
		.catch(console.log)
	}, [watcher])

	async function deleteNote(index) {
		let target = notelistJSON[index];
		setOngoingAction("Removing a note...");
		await NOTE.remove(target.name);
		await NOTE_CONFIG.removeFromJSON(NOTE_CONFIG.filename, target.name);
		//re-render
		setWatcher(Math.random());
		setOngoingAction(false);
	}

	async function saveNote(name, content, config) {
		await NOTE.putFile(name, content);
		await NOTE_CONFIG.pushUniqueToJSON(NOTE_CONFIG.filename, name, config);
		setWatcher(Math.random());
	}

	function handleVisibility(comp, index) {
		//update noteIndex if available
		setNoteIndex(index);
		// handle component visibility
		let newVisibility = {};
		for (let item in visibility) {
			newVisibility[item] = false;
		}

		newVisibility[comp] = true;
		setVisibility(newVisibility);
	}
	return (
		<Main title="Notes">
			{
				notelistJSON
				?
				notelistJSON.length
				?
				<div>
					{
						visibility.list &&
						<div>
							<Button 
								className="button is-dark is-small" 
								onClick={() => handleVisibility("create")}
								text="New Note"
							/>
							<SpinnerWithText action={ongoingAction} />&nbsp;
							<ListNote notelist={notelistJSON} visible={handleVisibility} delete={deleteNote}/>
						</div>
					}
					{
						visibility.view &&
						<ViewNote note={notelistJSON[noteIndex]} visible={handleVisibility}/>
					}
					{
						visibility.edit &&
						<EditNote note={notelistJSON[noteIndex]} visible={handleVisibility} saveNote={saveNote}/>
					}
					
				</div>
				:
				<div className="has-text-centered"> 
					<h3 className="is-size-5 mb-2">No Note is found</h3> 
					<Button 
						className="button is-dark is-small" 
						onClick={() => handleVisibility("create")}
						text="New Note"
					/>
				</div>
				:
				<LoadingIcon />
			}
			{
				visibility.create &&
				<NewNote notes={notelistJSON} visible={handleVisibility} saveNote={saveNote}/>
			}
		</Main>
	)
}

function ListNote(props) {

	return (
		<div className="columns is-multiline is-centered">
			{
				props.notelist.map((note, i) => (
					<div key={i} className="column is-4">
						<div className="box has-text-centered">
							<a className="is-block" onClick={props.visible.bind(props.visible, "view", i)}>
								<span className="icon-doc-text is-size-1"></span>
							</a>
							<h2 title={note.name}>{truncateText(removeFileExtention(note.name), 12)}</h2>
							<div className="tags are-small is-centered mt-2">
								<span className="tag icon-clock" title={dayMonthTime(note.created)}></span>
								<span className="tag pointer icon-pencil" title="Edit" onClick={props.visible.bind(props.visible, "edit", i)}></span>
								<span className="tag pointer icon-trash" title="Remove" onClick={props.delete.bind(props.delete, i)}></span>
							</div>
						</div>
					</div>
				))
			}
			<style jsx>
				{`
					.column .box {
						height: 170px;
					}
				`}
			</style>
		</div>
	)
}

function ViewNote(props) {
	let [noteContent, setNoteContent] = useState("");
	let {note: {name, created, updated, encrypt}} = props;
	useEffect(() => {
		NOTE.getFile(name, {decrypt: encrypt})
		.then(setNoteContent)
		.catch(console.log)
	}, [props])

	return (
		<div className="section pt-2">
			<div className="columns mb-2">
				<div className="column is-9">
					<h1 className="is-size-5">{removeFileExtention(name)}</h1>
					<span className="has-text-grey is-size-7">Created: {dayMonthTime(created)}</span>
					 &nbsp;&nbsp; | &nbsp;&nbsp;
					<span className="has-text-grey is-size-7">Updated: {dayMonthTime(updated)}</span>
				</div>
				<div className="column is-3">
					<Button 
						className="button is-light is-pulled-right is-size-5" 
						onClick={props.visible.bind(props.visible, "list", "-1")}
						text="X"
					/>
				</div>
			</div>
			{
				noteContent == null
				?
				<p className="has-text-centered is-size-5 mb-4">Note content not found</p>
				:
				noteContent
				?
				<div dangerouslySetInnerHTML={{__html: noteContent}}></div>
				:
				<LoadingIcon />

			}
		</div>
	)
}

function EditNote(props) {
	let [noteContent, setNoteContent] = useState("");
	let [isSaving, setIsSaving] = useState(false);

	let {note} = props;
	let {name, encrypt} = note;
	
	let debouncedContent = useDebounce(noteContent, 2000);

	useEffect(() => {
		if (!noteContent) {
			NOTE.getFile(name, {decrypt: encrypt})
			.then(setNoteContent)
			.catch(console.log)	
		}

		if (debouncedContent) {
			saveNote(name, debouncedContent);
		}
		
	}, [debouncedContent])

	async function saveNote(name, content) {
		setIsSaving(true);
		await props.saveNote(name, content, {...note, updated: new Date()});
		setIsSaving(false);
	}

	function updateNoteContent(value) {
		setNoteContent(value);
	}

	return (
		<div className="section pt-2">
			<div className="columns mb-2">
				<div className="column is-9">
					<h1 className="is-size-5">{removeFileExtention(name)} <span className="has-text-grey">{isSaving && "Saving..."}</span></h1>
				</div>
				<div className="column is-3">
					<Button 
						className="button is-light is-pulled-right is-size-5" 
						onClick={props.visible.bind(props.visible, "list", "-1")}
						text="X"
					/>
				</div>
			</div>
			{
				noteContent == null
				?
				<p className="has-text-centered is-size-5 mb-4">Note content not found</p>
				:
				noteContent
				?
				<NoteEditor
					content={noteContent}
					changeHandler={updateNoteContent}
				/>
				:
				<LoadingIcon />

			}
		</div>
	)
}

function NewNote(props) {
	let [noteContent, setNoteContent] = useState("");
	let [isSaving, setIsSaving] = useState(false);
	let [name, setName] = useState("");
	let [duplicateNoteName, setDuplicateNoteName] = useState(true);

	let debouncedContent = useDebounce(noteContent, 2000);

	useEffect(() => {
		if (debouncedContent) {
			saveNote(name, debouncedContent);
		}
		
	}, [debouncedContent])

	async function saveNote(name, content) {
		setIsSaving(true);
		await props.saveNote(name, content, buildNoteInfo(name));
		setIsSaving(false);
	}

	function updateNoteContent(value) {
		setNoteContent(value);
	}

	function handleNameChange(e) {
		let el = e.target;
		let {value} = el;
		// update note name
		setName(value);
	}

	function verifyNoteName() {
		if (!name) return;
		// check duplicate name in notelistJSON
		let newName = renameDuplicateFileName(name + ".txt", props.notes);
		setName(newName);
		setDuplicateNoteName(false);
	}

	return (
		<div className="section pt-2">
			<div className="columns">
				<div className="column is-9">
					<h1 className="is-size-5">{removeFileExtention(name)} <span className="has-text-grey">{isSaving && "Saving..."}</span></h1>
				</div>
				<div className="column is-3">
					<Button 
						className="button is-light is-pulled-right is-size-5" 
						onClick={props.visible.bind(props.visible, "list", "-1")}
						text="X"
					/>
				</div>
			</div>
			{
				name && !duplicateNoteName
				?
				<NoteEditor
					content={noteContent}
					changeHandler={updateNoteContent}
				/>
				:
				<div className="columns mt-0 mb-0 is-vcentered">
					<div className="column is-8">
						<Input 
							value={name}
							onChange={handleNameChange}
							label="Firstly, give your note a name"
							placeholder="Note name"
							className="is-small"
						/>
					</div>
					<div className="column is-2 mt-4">
						<Button
							text="Save"
							className="button is-dark"
							onClick={verifyNoteName}
						/>
					</div>
				</div>

			}
		</div>
	)
}

function buildNoteInfo(name) {
	let date = new Date();
	return {name, encrypt: true, shared: "", created: date, updated: date};
}