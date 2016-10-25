let storage = {};

storage.set = (item, obj) => {
	let result;
	typeof obj === 'string' ? result = obj : result = JSON.stringify(obj);
	localStorage.setItem(item, result);
};

storage.get = (item) => {
	let curr = localStorage.getItem(item);
	let result;
	typeof curr === 'string' ? result = curr : result = JSON.parse(curr);
	return result;
};

storage.clear = localStorage.clear;

export default storage;
