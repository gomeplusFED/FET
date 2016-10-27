import path from 'path';
import { exec } from 'child_process';

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

export const unzip = (file, target, cb) => {
	// if (process.platform === 'darwin') {
	// The zip archive of darwin build contains symbol links, only the "unzip"
	// command can handle it correctly.
	exec(`unzip -qo '${file}' -d '${target}'`, { maxBuffer: 1024 * 1024 * 20 }, (err) => {
		if (err) {
			cb(err);
			return;
		}
		cb();
	});
	// } else {
	// 	extract(file, { dir: target }, function(err) {
	// 		if (err) {
	// 			cb(err);
	// 			return;
	// 		}
	// 		cb();
	// 	});
	// }
};
