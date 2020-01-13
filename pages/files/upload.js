import { useState, useRef } from "react";

import Main from "../../layouts/Main";
import { Button } from "../../components/FormElements";
import { getFileIcon } from "../../helpers/main";

export default function UploadFile() {
	let [fileList, updateFileList] = useState([]);

	function inputChange(e) {
		let { files } = e.target;
		
		
		if (!files || !files.length) {
			return;
		}

		let newFileList = [...fileList];

		for (let file of files) {
			let listed = fileList.find(cFile => cFile.name === file.name);
			if (!listed) {
				newFileList.push({name: file.name, size: file.size, type: file.type});			
			}
		}

		updateFileList(newFileList);

		/*console.log("files", files[0]["name"]);

		const reader = new FileReader();
	    reader.onload = function(e) { 
	    	console.log(e.target.result)

	    };
	    reader.readAsDataURL(files[0]);*/
	}

	function clearFiles() {
		updateFileList([]);
	}

	function uploadFiles() {

	}

	return (
		<Main>
			<div className="section">
				<div className="section dropzone has-background-light">
					{

						fileList.length
						?
						<div>
							<FileListPreview files={fileList} />
							<UploadButton 
								changeHandler={inputChange}
								text="Add more files"
							/>
							<div className="buttons is-centered mt-2 mb-2">
								<Button 
									className="button is-dark is-small"
									text="Clear files"
									onClick={clearFiles}
								/>
								<Button 
									className="button is-dark is-small"
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
		<table className="table is-fullwidth is-size-7">
			<tbody>
				{
					props.files.map((file, i) => (
						<tr key={i}>
							<td className={getFileIcon(file.type)}></td>
							<td> {file.name} </td>
							<td> {file.size} </td>
						</tr>
					))
				}
			</tbody>
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
				className="button is-dark is-small"
				text={props.text || "Select files"}
				onClick={handleBtnClick}
			/>
		</div>
	)
}

