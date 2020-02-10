export function toggleLoadingButton(btnElement) {
	if (typeof btnElement === "string") {
		btnElement = document.querySelector(btnElement);	
	}

	if (btnElement && "classList" in btnElement) {
		btnElement.classList.toggle("is-loading");
	}
}

export function financeFilename(dateStr = new Date()) {
	let date = new Date(Date.parse(dateStr));
	let newDate;

	if (date.getFullYear()) {
		//date is valid		
		newDate = (date.getMonth() + 1).toString() + date.getFullYear().toString(); //this month and year
	}

	return newDate;
	/*
	122019 //December 2019
	112019 //November 2019
	52019 //May 2019
	12019 //January 2019
	72020 //July 2020
	102020 //October 2020
	..and so on
	*/
}

export function filenameToDate(filename) {
	/*
	* examples of filename
	* 12019
	* 122019
	* 52019
	*/
	let year = Number(filename.substring(filename.length, filename.length-4));
	let month = Number(filename.substring(0, filename.length-4));
	return new Date(year, month - 1);
}

export function renameDuplicateFileName(name, list) {
	let duplicate = list.find(file => file.name == name);
	
	if (duplicate) {
		//build new name and check (recursion)
		let extentionIndex = name.lastIndexOf(".");
		let extention = name.substring(extentionIndex);
		
		let newName = name.substring(0, extentionIndex) + "(0)";
		
		newName = newName + extention;
		return renameDuplicateFileName(newName, list);
		
	} else {
		return name;
	}
}

/*
* From https://stackoverflow.com/a/315767/3186314
*/
export function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
  return new Date(year, month, 0).getDate();
}

export function numberToArray(number) {
	return [...Array(number).keys()];
}

export function monthlySummary(monthlyData) {

	if (!Array.isArray(monthlyData)) {
		return monthlyData;
	}

	let days = [],
		earnings = [],
		spendings = [];

	for ( let data of monthlyData ) {
		days.push(data["day"]);
		earnings.push(sumAmount(data["earnings"]));
		spendings.push(sumAmount(data["spendings"]));
	}

	return {days, earnings, spendings};
}

export function sumAmount(array) {

	let sum = 0;

	for ( let item of array ) {
		if (item["amount"] && Number(item["amount"])) {
			sum += Number(item["amount"]);
		}
	}

	return sum;	
}

export function sumArrayNumber(numbers) {
	let total = 0;

	for (let number of numbers) {
		total += number;
	}

	return total;
}

export function getFileIcon(type) {
	let icon = "doc"

	if (type) {
		switch(true) {
	        case type.includes("image"):
				icon = "picture";
				break;
	        
	        case type.includes("video"):
				icon = "video";
				break;

			case type.includes("audio"):
				icon = "music";
				break;

			case type.includes("contact"):
				icon = "contacts";
				break;

			case type.includes("sheet"):
				icon = "file-excel";
				break;

			case type.includes("word"):
				icon = "file-word";
				break;
			
			case type.includes("pdf"):
				icon = "file-pdf";
				break;
			
			case type.includes("powerpoint"):
				icon = "file-powerpoint";
				break;

			case type.includes("plain"):
				icon = "doc-text";
				break;

			case (type.includes("html") || type.includes("javascript") || type.includes("json")):
				icon = "file-code";
				break;
			
			case (type.includes("zip") || type.includes("rar")):
				icon = "file-archive";
				break;

			default:
				icon = "doc";
				break;
		}	
	}
	
	return ("icon-" + icon);
}

export function toArray(fileList) {
    return Array.prototype.slice.call(fileList);
}

export function dayMonthTime(date) {
	date = new Date(Date.parse(date));
	
	let year = date.getFullYear(),
		month = date.getMonth(),
		day = date.getDate(),
		minute = date.getMinutes(),
		hour = date.getHours();

	return `${day}/${month}/${year}, ${hour}:${minute}`;
}

export function downloader(data, type, name) {
	let blob = new Blob([data], {type});
	let url = window.URL.createObjectURL(blob);
	downloadURI(url, name);
	window.URL.revokeObjectURL(url);
}

export function downloadURI(uri, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}

export function removeFileExtention(filename) {
	let index = filename.lastIndexOf(".");
	if (index > 0) {
		return filename.substring(0, index);
	} 

	return filename;
}

export function truncateText(text, position) {

	if ((text.length - 1) > position) {
		return text.substring(0, position) + "...";
	}
	return text;
}

export function findByName(name, document) {
	return document.find(doc => doc.name == name);
}

export function fileCategory() {
	return [
		{value: "all", name: "All (Trashed excl)"},
		{value: "shared", name: "Shared"},
		{value: "starred", name: "Starred"},
		{value: "trashed", name: "Trashed"},
	]
}

export function getFileInfo(file) {
	return {name: file.name, size: file.size, type: file.type, date: new Date(), shared: "", encrypt: true, trashed: false, starred: false};
}

export function buildNoteInfo(name) {
	let date = new Date();
	return {name, encrypt: true, shared: "", starred: false, created: date, updated: date, trashed: false};
}
