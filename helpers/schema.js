
export default class File {
	constructor(path, extention, contentType) {
		this.path = path;
		this.extention = extention;
		this.contentType = contentType;
	}

	setName(name) {
		this.name = name;
	}

	setContentType(contentType) {
		this.contentType = contentType;
	}

}

