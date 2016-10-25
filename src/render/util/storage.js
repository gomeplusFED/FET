let storage = {};

storage.set = (item, obj) => {
	let result;
	typeof obj === 'string' ? result = obj : result = JSON.stringify(obj);
	localStorage.setItem(item, result);
};

storage.get = (item) => {
	let curr = localStorage.getItem(item);
	try {
		return JSON.parse(curr);
	} catch (e) {
		return curr;
	}
};

storage.clear = localStorage.clear;

export default storage;
