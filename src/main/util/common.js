export const formatFileSize = (bytes) => {
	let val = bytes / 1024;
	let suffix;
	if (val < 1000) {
		suffix = 'KB';
	} else {
		val = val / 1024;
		if (val < 1000) {
			suffix = 'MB';
		} else {
			val = val / 1024;
			if (val < 1000) {
				suffix = 'GB';
			} else {
				val = val / 1024;
				suffix = 'TB';
			}
		}
	}
	return val.toFixed(2) + suffix;
};
