let storage = {};

storage.set = (item, obj) => {
	let result;
	typeof obj === 'string' ? result = obj : result = JSON.stringify(obj);
	localStorage.setItem(item, result);
};

storage.get = (item) => {
	return JSON.parse(localStorage.getItem(item));
};

storage.clear = localStorage.clear;

export default storage;
