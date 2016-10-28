import path from 'path';
import { exec } from 'child_process';

// import extract from 'extract-zip';
import AdmZip from 'adm-zip-electron';

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

export const normalizePath = (path) => {
	return path.replace(/\\/g, '/');
};

export const objType = (obj) => {
	return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
};

export const execCmd = (command, cb) => {
	exec(command, {
		env: {
			PATH: process.env.PATH
		},
		maxBuffer: 1024 * 1024 * 20,
		shell: '/usr/bin/bash'
	}, (err, stout, sterr) => {
		if (objType(cb) === 'Function') {
			cb(err, stout, sterr);
		}
	});
};

export const unzip = (file, target, cb) => {
	if (process.platform === 'darwin') {
	// The zip archive of darwin build contains symbol links, only the "unzip"
	// command can handle it correctly.
		execCmd(`unzip -qo '${normalizePath(file)}' -d '${normalizePath(target)}'`, (err) => {
			if (err) {
				cb(err);
				return;
			}
			cb();
		});
	} else {
		// extract(file, { dir: target }, function(err) {
		// 	if (err) {
		// 		cb(err);
		// 		return;
		// 	}
		// 	cb();
		// });
		const zip = new AdmZip(file);
		zip.extractAllTo(target, true);
		cb();
	}
};
