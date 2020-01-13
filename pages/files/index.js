import { useState, useEffect } from "react";
import Link from "next/link";
import Main from "../../layouts/Main";

let testfiles = [
	{
		name: "My first statement.pdf",
		size: "12kb",
		uploaded: "12/08/2019, 39:44"
	},
	{
		name: "my photo.jpg",
		size: "89kb",
		uploaded: "12/09/2020, 11:03"
	},
	{
		name: "statement.docx",
		size: "212kb",
		uploaded: "2/09/2020, 09:44"
	},
	{
		name: "photo.png",
		size: "21kb",
		uploaded: "2/09/2020, 09:44"
	},
]

export default function Files() {
	let [selectedFile, updateSelectedFile] = useState([]);

	function handleFileSelect(e) {
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

		if (isAllFilesSelected()) {
			deselectAllFiles();
		} else {
			selectAllFiles();
		}
	}

	function isAllFilesSelected() {
		return testfiles.length === selectedFile.length;
	}

	function isFileSelected(filename) {
		return selectedFile.find(sFile => sFile === filename);
	}

	function selectAllFiles() {
		let allFileName = [];

		for (let file of testfiles) {
			allFileName.push(file.name);
		}
		updateSelectedFile(allFileName);
	}

	function deselectAllFiles() {
		updateSelectedFile([]);
	}

	return (
		<Main>
			<div className="section mt-4">
				<div className="mb-4">
					<div className="buttons are-small is-pulled-left">
						<Link href="/files/upload">
							<button className="button is-dark">Upload new</button>
						</Link>
					</div>
					<div className="buttons are-small is-pulled-right">
						<button disabled={selectedFile.length !== 1 && "disabled"} className="button is-light icon-pencil"></button>
						<button disabled={selectedFile.length !== 1 && "disabled"} className="button is-light icon-share-squared"></button>

						<button disabled={!selectedFile.length && "disabled"} className="button is-light icon-download-cloud"></button>
						
						<button disabled={!selectedFile.length && "disabled"} className="button is-light icon-trash"></button>

						
					</div>
				</div>
				<table className="table is-fullwidth is-size-7">
					<thead>
						<tr>
							<th onClick={toggleSelectAllFile}><span className={isAllFilesSelected() ? "icon-check" :"icon-check-empty"}></span></th>
							<th>Name</th>
							<th>Size</th>
							<th>Uploaded</th>
						</tr>
					</thead>
					<tbody>
						{
							testfiles.map((file, i) => (
								<tr key={i} onClick={handleFileSelect} data-name={file.name} className={isFileSelected(file.name) ? "has-background-light" : ""}>

									<td><span className={isFileSelected(file.name) ? "icon-check" : "icon-check-empty"}></span></td>
									<td>{file.name}</td>
									<td>{file.size}</td>
									<td>{file.uploaded}</td>
								</tr>
							))	
						}
					</tbody>

				</table>
			</div>
		</Main>
	)
}