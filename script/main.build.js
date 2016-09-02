/* eslint-disable */
import 'shelljs/global';

import fs from 'fs';
import os from 'os';
import path from 'path';

import minimist from 'minimist';
import inquirer from 'inquirer';
import { js as jsbeautify } from 'js-beautify';

import { generatePorductionPackageJson, buildStatic, copyMainFile, installModule, packageApp, injectAppInfo, buildAsar } from '../support/build.process.js';

import pkinfo from '../package.json';

let appPath = path.join(__dirname, '../app');
let distPath = path.join(__dirname, '../dist');

// 移除 app 产出目录
// rm('-rf', appPath);

if (!test('-e', distPath)) {
	mkdir(distPath);
}

let packExec = '';

const run = function() {
	buildStatic()
		.then(() => {
			return generatePorductionPackageJson();
		})
		.then(() => {
			return injectAppInfo();
		})
		.then(() => {
			return copyMainFile();
		}).then(() => {
			return installModule();
		}).then(() => {
			return buildAsar();
		}).then(() => {
			return packageApp(packExec);
		}).catch((e) => {
			throw e;
		})
};

inquirer.prompt([{
	type: 'list',
	name: 'platform',
	message: 'which platform?',
	choices: ['mac', 'win', 'all']
}, {
	type: 'input',
	name: 'version',
	message: 'which version?',
	default: pkinfo.version
}, {
	type: 'confirm',
	name: 'release',
	message: 'push new release?',
	default: false
}]).then((answers) => {
	let platform = answers.platform === 'all' ? '--mac --win' : `--${answers.platform}`;
	let arch = '--x64=true';
	packExec = os.platform() === 'win32' ? `.\\node_modules\\.bin\\build ${platform} ${arch}` : `./node_modules/.bin/build ${platform} ${arch}`;
	let newPkgInfo = Object.assign({}, pkinfo);
	newPkgInfo.version = answers.version;
	rm('-rf', path.join(appPath, answers.platform === 'all' ? '/' : answers.platform));
	fs.writeFile(path.join(__dirname, '../package.json'), jsbeautify(`${JSON.stringify(newPkgInfo)}`, {
		'indent_with_tabs': true,
		'indent_size': 4,
	}), () => {
		run();
	})
});
