import path from 'path';
import { exec } from 'child_process';

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

// 当需要exec一个命令的时候，路径需要格式化
export const normalizePath = (targetPath) => {
	targetPath = path.normalize(targetPath);
	if (/\s/.test(path)) {
		targetPath = '"' + targetPath + '"';
	}
	return targetPath;
};

export const objType = (obj) => {
	return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
};

export const execCmd = (command, cb) => {
	return exec(command, {
		env: {
			PATH: process.env.PATH
		},
		maxBuffer: 1024 * 1024 * 20
	}, (err, stout, sterr) => {
		if (objType(cb) === 'Function') {
			cb(err, stout, sterr);
		}
	});
};

export const unzip = (file, target, cb) => {
	if (process.platform === 'darwin') {
		exec(`unzip -qo ${normalizePath(file)} -d ${normalizePath(target)}`, {
			env: {
				PATH: process.env.PATH
			}
		}, (err) => {
			if (err) {
				cb(err);
				return;
			}
			cb();
		});
	} else {
		let zip = null;
		try {
			zip = new AdmZip(file);
		} catch (e) {
			console.log(e);
			cb(e);
			return;
		}
		zip.extractAllTo(target, true);
		cb();
	}
};
