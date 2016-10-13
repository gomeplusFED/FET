import path from 'path';
import fs from 'fs';

import * as babel from 'babel-core';
import rd from 'rd';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { exec } from 'child_process';

export const cssExtractLoaders = (options) => {
	options = options || {};

	function generateLoaders(loaders) {
		let sourceLoader = loaders.map((loader) => {
			let extraParamChar;
			if (/\?/.test(loader)) {
				loader = loader.replace(/\?/, '-loader?');
				extraParamChar = '&';
			} else {
				loader = loader + '-loader';
				extraParamChar = '?';
			}
			return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
		}).join('!');

		if (options.extract) {
			return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
		} else {
			return ['vue-style-loader', sourceLoader].join('!');
		}
	}

	return {
		css: generateLoaders(['css']),
		postcss: generateLoaders(['css']),
		less: generateLoaders(['css', 'less']),
		sass: generateLoaders(['css', 'sass?indentedSyntax']),
		scss: generateLoaders(['css', 'sass']),
		stylus: generateLoaders(['css', 'stylus']),
		styl: generateLoaders(['css', 'stylus'])
	};
};

export const openUrl = (url) => {
	const execStr = process.platform === 'win32' ? 'start' : 'open';
	exec(`${execStr} ${url}`);
};

export const babelDir = (src, dist) => {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync(dist)) {
			fs.mkdirSync(dist);
		}
		rd.readFileFilter(src, /.*\.js/, (err, files) => {
			if (err) reject(err);
			let cur = 0;
			files.forEach((item) => {
				babel.transformFile(item, {

				}, function(error, result) {
					if (error) reject(error);
					let target = path.join(dist, item.replace(src, ''));
					if (!fs.existsSync(target) && !fs.existsSync(target.replace(path.basename(target), ''))) {
						fs.mkdirSync(target.replace(path.basename(target), ''));
					}
					fs.writeFileSync(target, result.code);
					cur++;
					if (cur === files.length) {
						resolve();
					}
				});
			});
		});
	});
};
