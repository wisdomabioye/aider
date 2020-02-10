import {useState, useEffect, useRef} from "react";

import Main from "../../layouts/Main";
import LoadingIcon from "../../components/LoadingIcon";
import SpinnerWithText from "../../components/SpinnerWithText";
import NoteEditor from "../../components/NoteEditor";
import {Input, Select, Button} from "../../components/FormElements";

import {useDebounce} from "../../helpers/hooks";
import { removeFileExtention, truncateText, dayMonthTime, renameDuplicateFileName, findByName, fileCategory, buildNoteInfo } from "../../helpers/main";
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
	let [currentNote, setCurrentNote] = useState({});
	let [watcher, setWatcher] = useState(0);
	
	useEffect(() => {
		NOTE_CONFIG.getJSON()
		.then(notes => setNotelistJSON(notes ? notes.reverse() /*sort by date desc*/ : []))
		.catch(console.log)
	}, [watcher])

	async function saveNote(name, content, config) {
		await NOTE.putFile(name, content);
		await NOTE_CONFIG.pushUniqueToJSON(NOTE_CONFIG.filename, name, config);
		refresh()
	}
	function handleVisibility(comp, name) {
		//update currentNote if available
		setCurrentNote(findByName(name, notelistJSON));
		// handle component visibility
		let newVisibility = {};
		for (let item in visibility) {
			newVisibility[item] = false;
		}

		newVisibility[comp] = true;
		setVisibility(newVisibility);
	}

	function refresh() {
		setWatcher(Math.random());
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
						<ListNote 
							notelist={notelistJSON} 
							visible={handleVisibility} 
							refresh={refresh}
						/>
					}
					{
						visibility.view &&
						<ViewNote 
							note={currentNote} 
							visible={handleVisibility}
							refresh={refresh}
						/>
					}
					{
						visibility.edit &&
						<EditNote 
							note={currentNote} 
							visible={handleVisibility} 
							saveNote={saveNote}
						/>
					}
					
				</div>
				:
				<div className="has-text-centered"> 
					<h3 className="is-size-6 mb-2">No Note is found</h3> 
					<Button 
						className="button is-dark is-small" 
						onClick={() => handleVisibility("create")}
						text="Make a Note"
					/>
				</div>
				:
				<LoadingIcon />
			}
			{
				visibility.create &&
				<NewNote 
					notelist={notelistJSON} 
					visible={handleVisibility} 
					saveNote={saveNote}
					refresh={refresh}
				/>
			}
		</Main>
	)
}

function ListNote(props) {
	let [filteredNote, setFilteredNote] = useState(props.notelist)
	let [noteCategory, setNoteCategory] = useState("all");
	let [searchValue, setSearchValue] = useState("");
	let [ongoingAction, setOngoingAction] = useState(null);
	
	useEffect(() => {
		filterNote(noteCategory, searchValue);
	}, [props, noteCategory, searchValue])

	async function toggleStar(name) {
		let target = findByName(name, props.notelist);
		let starred = target.starred;
		if (starred) {
			setOngoingAction("Unstarring a note...");
		} else {
			setOngoingAction("Starring a note...");
		}

		await NOTE_CONFIG.pushUniqueToJSON(NOTE_CONFIG.filename, name, {...target, starred: !starred});
		//re-render parent
		props.refresh();
		setOngoingAction(null);
	}

	async function toggleTrash(name) {
		let target = findByName(name, props.notelist);
		let trashed = target.trashed;
		if (trashed) {
			setOngoingAction("Restoring a note...");
		} else {
			setOngoingAction("Trashing a note...");
		}
		
		await NOTE_CONFIG.pushUniqueToJSON(NOTE_CONFIG.filename, name, {...target, trashed: !trashed});
		//re-render parent
		props.refresh();
		setOngoingAction(null);
	}

	async function remove(name) {
		let target = findByName(name, props.notelist);
		setOngoingAction("Removing a note...");
		await NOTE.remove(target.name);
		await NOTE_CONFIG.removeFromJSON(NOTE_CONFIG.filename, target.name);
		//re-render parent
		props.refresh();
		setOngoingAction(null);
	}

	function filterNote(category, searchValue) {
		let newFilterNote;

		switch(category) {
			case "starred":
				newFilterNote = props.notelist.filter( note => note.starred && !note.trashed);
			break;

			case "shared":
				newFilterNote = props.notelist.filter( note => note.shared && !note.trashed);
			break;

			case "trashed":
				newFilterNote = props.notelist.filter( note => note.trashed);
			break;

			default:
				newFilterNote = props.notelist.filter( note => !note.trashed);
			break;
		}

		if (searchValue) {
			searchValue = searchValue.toLowerCase();
			newFilterNote = newFilterNote.filter(note => note.name.toLowerCase().includes(searchValue));
		}
		setFilteredNote(newFilterNote);		
	}
	function filterNoteBySearch(name) {

	}
	
	function handleFilterForm(e) {
		let {name, value} = e.target;
		if (name == "category") {
			setNoteCategory(value);
		} else if (name == "search") {
			setSearchValue(value);
		}
	}

	return (
		<div>
			<div className="columns is-mobile is-multiline">
				<div className="column is-narrow">
					<Button 
						className="button is-dark is-small" 
						onClick={props.visible.bind(props.visible, "create")}
						text="New Note"
					/>
				</div>
				<div className="column is-narrow">
					<Select
						name="category"
						value={noteCategory}
						className="is-small"
						options={fileCategory()}
						onChange={handleFilterForm}
					/>
				</div>
				
				<div className="column is-narrow pt-1 is-right">
					<Input
						name="search"
						value={searchValue}
						placeholder="Search note ..."
						onChange={handleFilterForm}
						className="is-small"
					/>
				</div>
				<div className="column is-narrow">
					<SpinnerWithText 
						action={ongoingAction} 
					/>
				</div>
			</div>
			<div className="columns is-multiline is-centered mt-2">
				{	
					filteredNote.length
					?
					filteredNote.map((note, i) => (
						<div key={i} className="column is-narrow">
							<div className="box has-text-centered pt-1">
								<div className="tags are-small is-right is-marginless is-paddingless">
									{
										note.shared &&
										<span className="tag icon-share is-white" title="Note is shared"></span>
									}

									<span className="tag icon-clock is-white" title={dayMonthTime(note.created)}></span>
								</div>

								<a className="is-block" onClick={props.visible.bind(props.visible, "view", note.name)} title="Tap to view note">
									<span className="icon-doc-text is-size-1"></span>
								</a>
								<h2 title={note.name}>{truncateText(removeFileExtention(note.name), 12)}</h2>
								<div className="tags are-small is-centered mt-1">
									{
										note.starred
										?
										<span className="tag pointer icon-star has-text-danger" title="Unstar note" onClick={toggleStar.bind(toggleStar, note.name)}></span>
										:
										<span className="tag pointer icon-star has-text-grey" title="Star note" onClick={toggleStar.bind(toggleStar, note.name)}></span>
									}

									{
										/*note.shared
										?
										<span className="tag pointer icon-cancel" title="Unshare" onClick={props.toggleShare.bind(props.toggleShare, note.name)}></span>
										:
										<span className="tag pointer icon-share" title="Share" onClick={props.toggleShare.bind(props.toggleShare, note.name)}></span>*/
									}
									{
										note.trashed
										?
										<span>
											<span className="tag pointer icon-cancel has-text-link" title="Restore" onClick={toggleTrash.bind(toggleTrash, note.name)}></span>
											<span className="tag pointer icon-trash has-text-danger" title="Remove permanently" onClick={remove.bind(remove, note.name)}></span>
										</span>
										:
										<span>
											<span className="tag pointer icon-pencil" title="Edit" onClick={props.visible.bind(props.visible, "edit", note.name)}></span>
											<span className="tag pointer icon-trash" title="Move to trash" onClick={toggleTrash.bind(toggleTrash, note.name)}></span>
										</span>
									}
									
								</div>
							</div>
						</div>
					))
					:
					<div className="column has-text-centered mt-4 pt-4">No note to display</div>
				}
			</div>
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
						onClick={props.visible.bind(props.visible, "list", {})}
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

	function updateNoteContent(data) {
		setNoteContent(data);
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
						onClick={props.visible.bind(props.visible, "list", {})}
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

	function updateNoteContent(data) {
		setNoteContent(data);
	}

	function handleNameChange(e) {
		let el = e.target;
		let { value } = el;
		// update note name
		setName(value);
	}

	function verifyNoteName() {
		if (!name) return;
		// check duplicate name in notelistJSON
		let newName = renameDuplicateFileName(name + ".txt", props.notelist);
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


function PreviewNote(props) {
	let iframeRef = useRef(null);

	useEffect(() => {
		writeToIframe();
	}, [])

	let frameStyle = {width: "100%", height: "100vh", border: "none", overflow: "auto"};

	function writeToIframe() {
		let frame = iframeRef.current.contentWindow;
		frame.document.body.innerHTML = props.content;
	}

	return (
		<iframe ref={iframeRef} style={frameStyle}></iframe>
	)
}