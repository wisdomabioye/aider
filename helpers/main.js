export function toggleLoadingButton(btnElement) {
	if (typeof btnElement === "string") {
		btnElement = document.querySelector(btnElement);	
	}

	if (btnElement && "classList" in btnElement) {
		btnElement.classList.toggle("is-loading");
	}
}

export function getMonthName(month, day, year) {

}

export function getWeekDay(month, day, year) {
	
}

export function financeFilename(dateStr = new Date()) {
	let date = new Date(Date.parse(dateStr));
	let newDate;

	if (date.getFullYear()) {
		//date is valid		
		newDate = (date.getMonth() + 1).toString() + date.getFullYear().toString(); //this month and year
	}

	return newDate;
	/*122019 //December 2019
	112019 //November 2019
	52019 //May 2019
	12019 //January 2019
	72020 //July 2020
	102020 //October 2020*/
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
	let icon = ""

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
	return ("icon-" + icon);
}