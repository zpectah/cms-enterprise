export const storage = {
	set: function (name, value) {
		localStorage.setItem(name, value);
	},
	get: function (name) {
		return localStorage.getItem(name);
	},
	remove: function (name) {
		localStorage.removeItem(name);
	},
	clearAll: function () {
		localStorage.clear();
	},
};

export const array = {
	add: function (array, item) {
		if (Array.isArray(array)) {
			if (array.indexOf(item) === -1) array.push();
		} else {
			console.warn(messages.notValidArray);
		}

		return array;
	},
	remove: function (array, index) {
		if (Array.isArray(array)) {
			if (index > -1) array.splice(index, 1);
		} else {
			console.warn(messages.notValidArray);
		}

		return array;
	},
	search: function (array, attrs, search, minLength = 3) {
		let na = [];
		const getChild = (item, parent, params) => {
			if (item) {
				for (let key in item) {
					if (item && key && item.hasOwnProperty(key)) {
						if (params && params.length > 0)
							params.map((param) => {
								if (key === param) {
									if (
										typeof item[param] == 'string' &&
										item[param].includes(search)
									) {
										if (!(na.indexOf(parent) > -1)) na.push(parent);
									} else {
										return getChild(item[param], parent, params);
									}
								}
							});
					}
				}
			}
		};
		if (search.length > minLength && array && array.length) {
			array.forEach((item) => {
				attrs.forEach((attr) => {
					let cb = attr.split(/[,.]/);
					getChild(item, item, cb);
				});
			});
		} else {
			na = array;
		}

		return na;
	},
};

export const number = {
	getTwoDecimal: function (number) {
		let string = String(number);
		if (Number(number) <= 9) string = '0' + '' + number;

		return String(string);
	},
};

export const string = {
	getRandom: function (length = 16, type = 'all', patterns = {}) {
		const subs = {
			uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			lowercase: 'abcdefghijklmnopqrstuvwxyz',
			number: '0123456789',
			special: '_-',
			...patterns,
		};
		const get_string = () => {
			let string = subs.uppercase + subs.lowercase + subs.number + subs.special;
			switch (type) {
				case 'uppercase':
					string = subs.uppercase;
					break;
				case 'lowercase':
					string = subs.lowercase;
					break;
				case 'number':
					string = subs.number;
					break;
				case 'special':
					string = subs.special;
					break;
			}
			return string;
		};
		let text = '';
		const possible = get_string();
		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	},
	getToken: function (length = 8, separator = '-') {
		const subs = {
			a: this.getRandom(length / 2, 'lowercase'),
			b: this.getRandom(length, 'number'),
			c: this.getRandom(length, 'uppercase'),
			d: this.getRandom(length * 2),
		};

		return (
			subs.a + separator + subs.b + separator + subs.c + separator + subs.d
		);
	},
	truncate: function (input, length = 500, end = '…') {
		if (input) {
			let shouldTruncate = input.length >= length;
			let truncated = shouldTruncate ? input.substring(0, length) : input;
			let rest = shouldTruncate ? input.substring(length) : null;
			if (shouldTruncate) {
				return [truncated + end, rest];
			} else {
				return [truncated];
			}
		} else {
			return null;
		}
	},
	truncateFileName: function (fileName, length = 10, separator = '…') {
		let ext = fileName
			.substring(fileName.lastIndexOf('.') + 1, fileName.length)
			.toLowerCase();
		let name = fileName.replace('.' + ext, '');
		if (name.length <= length) {
			return fileName;
		}
		name = name.substr(0, length) + (fileName.length > length ? separator : '');
		return name + '.' + ext;
	},
	replaceSpaces: function (string) {
		return string.split(' ').join('-');
	},
};

export const date = {
	getTodayObject: function () {
		const D = new Date();
		const getDayOfTheYear = () => {
			let start = new Date(D.getFullYear(), 0, 0);
			let diff =
				D -
				start +
				(start.getTimezoneOffset() - D.getTimezoneOffset()) * 60 * 1000;
			let oneDay = 1000 * 60 * 60 * 24;
			return Math.floor(diff / oneDay);
		};
		return {
			year: D.getFullYear(),
			month: D.getMonth() + 1,
			day: D.getDate(),
			hour: number.getTwoDecimal(D.getHours()),
			minute: number.getTwoDecimal(D.getMinutes()),
			second: number.getTwoDecimal(D.getSeconds()),
			dayOfTheWeek: D.getDay(),
			dayOfTheYear: getDayOfTheYear(),
		};
	},
	getTimestampString: function (separator = '') {
		const T = this.getTodayObject();

		return (
			T.year +
			separator +
			number.getTwoDecimal(T.month) +
			separator +
			number.getTwoDecimal(T.day) +
			separator +
			number.getTwoDecimal(T.hour) +
			separator +
			number.getTwoDecimal(T.minute)
		);
	},
};

export const file = {
	toBase64: function (file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	},
	formatBytes: function (bytes, decimals = 2) {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	},
	resizeBase64Image: function (base64Str, maxWidth = 250, maxHeight = 250) {
		return new Promise((resolve) => {
			let img = new Image();
			img.src = base64Str;
			img.onload = () => {
				let canvas = document.createElement('canvas');
				const MAX_WIDTH = maxWidth;
				const MAX_HEIGHT = maxHeight;
				let width = img.width;
				let height = img.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				canvas.width = width;
				canvas.height = height;
				let ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, width, height);
				resolve(canvas.toDataURL());
			};
		});
	},
};
