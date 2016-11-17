/* eslint-disable */
import 'shelljs/global';

import fs from 'fs';
import os from 'os';
import path from 'path';

import chalk from 'chalk';
import minimist from 'minimist';
import inquirer from 'inquirer';
import { js as jsbeautify } from 'js-beautify';

import logger from '../support/logger.js';

import { cleanDistPath, generatePorductionPackageJson, buildStatic, babelMainFile, installModule, packageApp, injectAppInfo, buildAsar, pushNewTagAndUploadQiniu } from '../support/build.process.js';

import pkinfo from '../package.json';

let appPath = path.join(__dirname, '../app');
let distPath = path.join(__dirname, '../dist');

// 移除 app 产出目录
// rm('-rf', appPath);

if (!test('-e', distPath)) {
	mkdir(distPath);
}

let packExec = '';

const run = async function(answers) {
	cleanDistPath()
		.then(() => {
			return generatePorductionPackageJson();
		})
		.then(() => {
			return injectAppInfo();
		})
		.then(() => {
			return installModule();
		})
		.then(() => {
			return buildStatic();
		})
		.then(() => {
			return babelMainFile();
		})
		.then(() => {
			return buildAsar();
		})
		.then(() => {
			return packageApp(packExec);
		})
		.then(() => {
			if (answers.release) {
				return pushNewTagAndUploadQiniu(answers.version);
			}
		})
		.then(() => {
			logger.success('All succeed.');
		})
		.catch((e) => {
			throw e;
		})
};

function BreakSignal() { }

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
	let fixedPath = os.platform() === 'win32' ? '.\\node_modules\\.bin\\build' : './node_modules/.bin/build';
	packExec = `${fixedPath} ${platform} ${arch}`;
	let newPkgInfo = Object.assign({}, pkinfo);
	if (answers.release) {
		let tags = exec('git tag', {silent:true}).stdout;
		tags.split('\n').forEach((item) => {
			if (item === `v${answers.version}`) {
				console.log(chalk.red.bold(`\nVersion ${answers.version} has published!\n`));
				throw new BreakSignal();
			}
		})
	}
	newPkgInfo.version = answers.version;
	rm('-rf', path.join(appPath, answers.platform === 'all' ? '/' : answers.platform));
	fs.writeFile(path.join(__dirname, '../package.json'), jsbeautify(`${JSON.stringify(newPkgInfo)}`, {
		'indent_with_tabs': true,
		'indent_size': 4,
	}), () => {
		run(answers);
	})
});
