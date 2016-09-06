let storage = {};

storage.set = (item, obj) => {
	localStorage.setItem(item, JSON.stringify(obj));
};

storage.get = (item) => {
	return JSON.parse(localStorage.getItem(item));
};

storage.clear = localStorage.clear;

export default storage;
