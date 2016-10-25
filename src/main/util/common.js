import path from 'path';
import { exec } from 'child_process';

import DecompressZip from 'decompress-zip';

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
	if (process.platform === 'darwin') {
		// The zip archive of darwin build contains symbol links, only the "unzip"
		// command can handle it correctly.
		exec(`unzip '${file}' -d '${target}'`, (err) => {
			if (err) {
				cb(err);
				return;
			}
			cb();
		});
	} else {
		const zip = new DecompressZip(file);
		zip.on('error', function(err) {
			if (err) cb(err);
		});
		zip.on('extract', function(log) {
			console.log('Finished extracting');
		});
		zip.on('progress', function(fileIndex, fileCount) {
			console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
		});
		zip.on('extract', () => {
			cb();
		});
		zip.extract({
			path: target
		});
	}
};
