/*
 * generate diff platform exec command, just command!!!
 */
import fs from 'fs';
import { execSync } from 'child_process';

import sudo from 'sudo-prompt';

import { normalizePath } from './common.js';

export const rm = (target) => {
	let result = '';
	if (process.platform === 'darwin') {
		result = `rm -rf ${normalizePath(target)}`;
	} else {
		if (fs.statSync(target).isFile()) {
			result = `del /f/s/q ${normalizePath(target)}`;
		} else {
			result = `rd /s/q ${normalizePath(target)}`;
		}
	}
	return result;
};

export const sudoRm = (target) => {
	if (process.platform === 'darwin') {
		sudo.exec(rm(target), {
			name: 'Delete File or Directory'
		});
	} else {
		execSync(rm(target));
	}
};

export const mv = (from, to) => {
	if (process.platform === 'darwin') {
		return `mv -f ${normalizePath(from)} ${normalizePath(to)}`;
	} else {
		return `move ${normalizePath(from)} ${normalizePath(to)}`;
	}
};
