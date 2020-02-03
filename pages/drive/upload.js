import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import Main from "../../layouts/Main";
import { Button } from "../../components/FormElements";
import { getFileIcon, toArray,renameDuplicateFileName } from "../../helpers/main";
import { Storage, JSONFile} from "../../helpers/blockstack";

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

export default function UploadFile() {
	let [filesInfo, updateFilesInfo] = useState([]);
	let [selectedFileList, setSelectedFileList] = useState([]); //FileList objects
	let [uploading, setUploading] = useState(false);
	let [fileListJSON, updateListJSON] = useState([]); //list of files info already in storage
	let [dragCss, setDragCss] = useState({});

	let router = useRouter();

	useEffect(() => {
		fetchFileList()
	}, []);

	async function fetchFileList() {
		let files = await DRIVE_CONFIG.getJSON();
		updateListJSON(files || []);
	} 

	function toggleEncrypt(e) {
		let el = e.target;
		let index = el.getAttribute("data-index");
		let newFilesInfo = [...filesInfo];
		let encrypt = newFilesInfo[index]["encrypt"];

		newFilesInfo[index]["encrypt"] = !encrypt;
		updateFilesInfo(newFilesInfo);
	}

	function inputChange(e) {
		let { files } = e.target;

		if (!files || !files.length) {
			return;
		}
		handleFiles(files);
	}

	function handleFiles(files) {
		//update selected files
		setSelectedFileList(toArray(selectedFileList).concat(toArray(files)));

		//update file info
		let newFilesInfo = [...filesInfo];
		for (let file of files) {
			let listed = filesInfo.find(cFile => cFile.name === file.name);
			if (listed) continue;
			newFilesInfo.push(getFileInfo(file));
		}

		updateFilesInfo(newFilesInfo);
	}

	function dragEnter(e) {
		e.stopPropagation();
		e.preventDefault();
		setDragCss({backgroundColor: "#ddd", border: "2px dashed grey"});
	}

	function dragLeave() {
		setDragCss({});
	}

	function handleDrop(e) {
		e.stopPropagation();
		e.preventDefault();
		setDragCss({});
		let { files } = e.dataTransfer;
		handleFiles(files);
	}

	function removeFile(e) {
		if (uploading) return;
		let target = e.currentTarget;
		let index = target.getAttribute("data-index");

		let newSelectedFileList = selectedFileList.filter((file, i) => i != index);
		let newFilesInfo = filesInfo.filter((file, i) => i != index);
		setSelectedFileList(newSelectedFileList);
		updateFilesInfo(newFilesInfo);
	}

	function clearFiles() {
		setSelectedFileList([]);
		updateFilesInfo([]);
		setUploading(false);
	}

	function updateFileUploadStatus(index, status) {
		let newFilesInfo = [...filesInfo];
		newFilesInfo[index]["uploadStatus"] = status;
		updateFilesInfo(newFilesInfo);
	}

	async function uploadFiles() {
		if (!selectedFileList || !selectedFileList.length) return;

		setUploading(true);

		for (let [index, file] of selectedFileList.entries()) {
			try {
				updateFileUploadStatus(index, "uploading...");
				let arrayBuffer = await readFileAsync(file);
				let name = renameDuplicateFileName(file.name, fileListJSON);
				
				let thisFileInfo = filesInfo[index];
				let uploader = await DRIVE.putFile(name, arrayBuffer, {encrypt: thisFileInfo.encrypt});

				await DRIVE_CONFIG.pushToJSON(DRIVE_CONFIG.filename, {...thisFileInfo, name});
				
				updateFileUploadStatus(index, "uploaded");
			
			} catch(e) {
				updateFileUploadStatus(index, "fail to upload");
				console.log(file.name, e);
			}
		}
		clearFiles();
		router.push("/drive");
	}

	return (
		<Main title="Upload Files">
			<div className="mt-4 mr-2 ml-2">
				<div className="section dropzone has-background-light"
					onDragEnter={dragEnter} 
					onDragOver={dragEnter}
					onDragLeave={dragLeave}
					onDrop={handleDrop}
					style={dragCss}
				>
					{

						filesInfo.length
						?
						<div>
							<FileListPreview 
								files={filesInfo} 
								removeFile={removeFile} 
								toggleEncrypt={toggleEncrypt}
							/>
							<UploadButton 
								changeHandler={inputChange}
								text="Add more files"
							/>
							<div className="buttons is-centered mt-2 mb-2">
								<Button 
									className="button is-dark"
									text="Clear files"
									onClick={clearFiles}
									disabled={uploading ? "disabled" : null}
								/>
								<Button 
									className={`button is-dark ${uploading && "is-loading"}`}
									text="Start upload"
									onClick={uploadFiles}
								/>
							</div>
						</div>
						:

						<div className="has-text-centered mt-2 mb-2">
							<p className="mt-2 mb-2">
								<span className="icon-upload-cloud is-size-2"></span>
							</p>
							<p className="mt-2 mb-2">
								Select or drop files
							</p>

							<UploadButton 
								changeHandler={inputChange}
							/>
							
						</div>
					}
				</div>
			</div>
		</Main>
	)
}

function FileListPreview(props) {
	return (
		<table className="table is-fullwidth is-size-6">
			<thead>
				<tr>
					<th>Encrypt</th>
					<th>Name</th>
					<th>Size</th>
					<th>Upload status</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{
					props.files.map((file, i) => (
						<tr key={i}>
							<td><span className={file.encrypt ? "icon-check" : "icon-check-empty"}  onClick={props.toggleEncrypt} data-index={i}></span></td>
							<td> <span className={getFileIcon(file.type)}></span> {file.name} </td>
							<td> {(file.size / 1000).toFixed(2)} kb </td>
							<td> {file.uploadStatus || "waiting"} </td>
							<td className="has-text-centered" title="Remove file"> <span className="icon-cancel" data-index={i} onClick={props.removeFile}></span> </td>
						</tr>
					))
				}
			</tbody>
			<tfoot>
				<tr>
					<td colSpan="5" className="is-size-7">
						* Duplicate file name will be renamed<br/>
						* Encrypted files can only be accessed by you<br/>
						* Unencrypted files can be accessed by anyone with the URL
					</td>
				</tr>
			</tfoot>
		</table>
	)
}

function UploadButton(props) {
	let inputRef = useRef(null);

	function handleBtnClick() {
		inputRef.current.click();
	}

	return (
		<div className="buttons is-centered mt-2 mb-2">
			<input 
				className="is-hidden" 
				ref={inputRef} 
				type="file" 
				onChange={props.changeHandler}
				multiple />
			
			<Button 
				className="button is-dark"
				text={props.text || "Select files"}
				onClick={handleBtnClick}
			/>
		</div>
	)
}

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  })
}

function getFileInfo(file) {
	return {name: file.name, size: file.size, type: file.type, date: new Date(), shared: "", encrypt: true};
}