import { useState, useEffect } from "react";
import Link from "next/link";
import Main from "../../layouts/Main";
import {InputExpanded, Select, Button} from "../../components/FormElements";
import SpinnerWithText from "../../components/SpinnerWithText";

import { getFileIcon, dayMonthTime, downloader, numberToArray } from "../../helpers/main";
import { Storage, JSONFile } from "../../helpers/blockstack";

/*
* config/drive.json
* We keep a json record of file list
* [
* 	{name, size, type, date, shared},
* 	{name, size, type, date, shared},
* ]
*/

const DRIVE_CONFIG = new JSONFile("config/", "drive.json");
const DRIVE = new Storage("drive/");

export default function Drive() {
	let [allfileList, updateAllFileList] = useState(null);
	
	let [pager, setPager] = useState({limit: 5, page: 1});
	let [watcher, updateWatcher] = useState(0);
	
	let limitOption = [{value: 5}, {value: 10}, {value: 20}, {value: 50}, {value: 100}];
	let start = (pager.page - 1) * pager.limit;
	let end = pager.page * pager.limit;

	useEffect(() => {
		fetchFileList()
		.then(files => updateAllFileList((files && files.reverse()) || []))
	}, [watcher]);

	async function fetchFileList() {
		return await DRIVE_CONFIG.getJSON();
	}  

	function handlePager(e) {
		let {name, value} = e.target;
		setPager({...pager, [name]: value, page: 1});
	}

	async function shareFile(filename) {
		// resave a file by setting encrypt to false
		// then get the file URL
		let index;
		let fileInfo = allfileList.find( (file, i) => {
						if(file.name == filename) {
							index = i;
							return true;
						}
					});
		if (!fileInfo) return;

		if (fileInfo.encrypt) {
			// get the file content and decrypt
			await DRIVE.decrypt(filename, {contentType: fileInfo.type})
		}

		//get the fileUrl
		return DRIVE.getFileUrl(filename)
		.then(async (url) => {
			// update the config/drive.json 
			// add shared: url
			await DRIVE_CONFIG.replaceJSONIndex(DRIVE_CONFIG.filename, index, {...fileInfo, shared: url, encrypt: false});
			
			updateWatcher(Math.random());
			return url;
		})
		.catch(console.log);
	}

	async function revokeShareLink(filename) {

	}

	async function downloadFiles(filenames) {
		for (let filename of filenames) {
			let fileInfo = allfileList.find(file => file.name == filename);
			if (!fileInfo) continue;

			let file = await DRIVE.getFile(filename);
			downloader(file, fileInfo.type, filename);
		}
	} 

	async function deleteFiles(filenames) {
		for (let filename of filenames) {
			// remove the actual file in storage
			await DRIVE.remove(filename);
		}
		//remove all the file history
		await DRIVE_CONFIG.removeFromJSON(DRIVE_CONFIG.filename, filenames);
		//refresh drove in UI  through watcher
		// await fetchFileList();
		updateWatcher(Math.random());
	}
	
	function paginationCallback(e) {
		let el = e.target;
		let page = el.getAttribute("data-index");
		setPager(prev => {
			return {...prev, page}
		})
	}

	return (
		<Main title="Encrypted Drive">
			<div className="section pt-1">
				<div className="mb-2">
					<div className="buttons are-small">
						<Link href="/drive/upload">
							<a className="button is-dark">
								Upload new
							</a>
						</Link>
						<span className="button is-white">
							Files per page &nbsp;
							<Select
								name="limit"
								options={limitOption}
								value={pager.limit}
								placeholder="Files per page"
								onChange={handlePager}
							/>
						</span>
					</div>
				</div>
				<FileListDisplay 
					fileList={allfileList ? allfileList.slice(start, end) : allfileList}
					deleteFiles={deleteFiles}
					download={downloadFiles}
					shareFile={shareFile}
				/>
				<Pagination 
					current={pager.page}
					length={allfileList ? Math.ceil(allfileList.length / pager.limit) : 1}
					callback={paginationCallback}
				/>
			</div>
		</Main>
	)
}

function Pagination(props) {
	let {current, length, callback} = props;
	let pages = numberToArray(length);
	return (
		<div className="tags are-small is-centered mt-4">
			{
				pages.map((item, i) => (
					<span 
						key={i} 
						className={`tag ${current == (i + 1) ? "is-light" : "is-dark pointer"}`}
						data-index={i + 1}
						onClick={props.callback}
					>
						{i + 1}
					</span>
				))
			}
		</div>
	)
}
function FileListDisplay(props) {
	let [selectedFile, updateSelectedFile] = useState([]);
	let [ongoingAction, setOngoingAction] =  useState(null);
	let [modalData, setModalData] = useState({show: false, link: ""});
	let fileList = props.fileList;

	useEffect(() => {

		if (fileList && fileList.length) {
			// Make sure that all the selected files are in the current fileList
			let filteredSelectedFile = selectedFile.filter(filename => {
				return fileList.find(file => file.name == filename);
			})
			updateSelectedFile(filteredSelectedFile);
		} else {
			// reset selectedFile
			updateSelectedFile([]);
		}
	}, [props])

	function handleFileSelect(e) {
		if (ongoingAction) return;

		let name = e.currentTarget.getAttribute("data-name");
		
		if (isFileSelected(name)) {
			let filteredFile = selectedFile.filter(file => file !== name);
			updateSelectedFile(filteredFile);

		} else {
			let newSelected = [...selectedFile];
				newSelected.push(name);
			updateSelectedFile(newSelected);
		}
	}

	function toggleSelectAllFile() {
		if (ongoingAction) return;

		if (isAllFilesSelected()) {
			deselectAllFiles();
		} else {
			selectAllFiles();
		}
	}

	function isAllFilesSelected() {
		return fileList && fileList.length && fileList.length === selectedFile.length;
	}

	function isFileSelected(filename) {
		return selectedFile.find(sFile => sFile === filename);
	}

	function selectAllFiles() {
		let allFileName = [];

		for (let file of fileList) {
			allFileName.push(file.name);
		}
		updateSelectedFile(allFileName);
	}

	function deselectAllFiles() {
		updateSelectedFile([]);
	}

	function copyShareLink(url) {
		let targetName = selectedFile[0];
		let targetFile = fileList.find(file => file.name == targetName);

		if (targetFile) {
			let notShared = targetFile.name + " is not currently shared. Share the file first";
			setModalData({show: true, link: targetFile.shared || url || notShared, reset: resetModal});
		}
	}
	function resetModal() {
		setModalData({show: false, link: ""});
	}

	async function downloadFiles() {
		setOngoingAction(`Downloading ${selectedFile.length} files`);
		await props.download(selectedFile);
		deselectAllFiles();
		// reset ongoingAction
		setOngoingAction(null);
	}

	async function shareFile() {
		let targetName = selectedFile[0];
		let targetFile = fileList.find(file => file.name == targetName);

		if (targetFile && targetFile.shared) {
			return copyShareLink();
		} 
		setOngoingAction(`Sharing ${selectedFile.length} file`);
		let url = await props.shareFile(targetName);
		setOngoingAction(null);
		return copyShareLink(url);
	}
	async function deleteFiles() {
		setOngoingAction(`Removing ${selectedFile.length} files`);
		await props.deleteFiles(selectedFile);
		//reset selectedFile List
		deselectAllFiles();
		// reset ongoingAction
		setOngoingAction(null);
	}

	return (
		<div className="mt-2">
			<div className="buttons is-pulled-left">
				{
					selectedFile.length > 0 &&
					<span className="button is-white">
						{selectedFile.length} {selectedFile.length > 1 ? "files" : "file"} selected
					</span>
				}
			</div>
			<div className="buttons is-pulled-right">
				<SpinnerWithText action={ongoingAction}/>
				{<Button 
					disabled={"disabled"} 
					className="button is-light icon-pencil"
					title="Rename file (in development)"
				/>}
				<Button 
					disabled={selectedFile.length !== 1 && "disabled"} 
					className="button is-light icon-share-squared"
					onClick={shareFile}
					title="Share file"
				/>

				<Button 
					disabled={!selectedFile.length && "disabled"} 
					className="button is-light icon-download-cloud"
					onClick={downloadFiles} 
					title="Download file(s)"
				/>
				
				<Button 
					disabled={!selectedFile.length && "disabled"} 
					className="button is-light icon-trash" 
					onClick={deleteFiles}
					title="Delete file(s)"
				/>	
			</div>
			<table className="table is-fullwidth is-size-6">
				<thead>
					<tr>
						<th onClick={toggleSelectAllFile}><span className={isAllFilesSelected() ? "icon-check" : "icon-check-empty"}></span></th>
						<th>Name</th>
						<th>Size</th>
						<th>Uploaded</th>
					</tr>
				</thead>
				<tbody>
					{	
						fileList
						? 
						fileList.length
						?
						fileList.map((file, i) => (
							<tr key={i} onClick={handleFileSelect} data-name={file.name} className={isFileSelected(file.name) ? "has-background-light" : ""}>
								<td><span className={isFileSelected(file.name) ? "icon-check" : "icon-check-empty"}></span></td>
								
								<td>
									<span className={getFileIcon(file.type)}></span>&nbsp;
									{file.name}&nbsp;
									{!file.encrypt && <span className="tag is-light icon-link" title="This file is not encrypted"></span>}
								</td>
								<td> {(file.size / 1000).toFixed(2)} kb </td>
								<td>{dayMonthTime(file.date)}</td>
							</tr>
						))
						:
						<tr>
							<td colSpan="5" className="has-text-centered is-size-5">File list is empty! <Link href="/drive/upload"><a>Upload files</a></Link></td>
						</tr>
						:
						<tr>
							<td colSpan="5" className="has-text-centered">
								<SpinnerWithText action="Fetching files..." />
							 </td>
						</tr>
					}
				</tbody>
			</table>
			{
				modalData.show &&
				<ShareLinkModal {...modalData} />
			}
		</div>
	)
}

function ShareLinkModal(props) {
	function copyText(e) {
		let el = e.target;
		el.select();
		document.execCommand("copy");
	}
	
	return (
		<div className={`modal is-active`}>
			<div className="modal-background"></div>
				<div className="modal-content">
					<div className="box">
						<span className="is-size-6 strong">Shareable link to file (Anyone with this link can access this file)</span>
						<Button 
							className="button is-small is-size-7 is-light icon-cancel is-pulled-right"
							onClick={props.reset}
						/>
						<InputExpanded
							value={props.link}
							readOnly={true}
							onClick={copyText}
							icon="icon-docs"
						/>

					</div>
				</div>
			<button className="modal-close is-large" aria-label="close" onClick={props.reset}></button>
		</div>
	)
}