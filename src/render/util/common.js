export const checkIsAdmin = (type) => {
	if (type === 0 || type === 1) {
		return true;
	}
	return false;
};
