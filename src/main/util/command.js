/*
 * generate diff platform exec command
 */
import { normalizePath } from './common.js';

export const rm = (target) => {
	return process.platform === 'darwin' ? `rm -rf ${normalizePath(target)}` : `rd /s/q ${normalizePath(target)}`;
};

export const mv = (from, to) => {
	return process.platform === 'darwin';
};
