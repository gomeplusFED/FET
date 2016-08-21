/* eslint-disable */
import 'shelljs/global';

import fs from 'fs';
import path from 'path';

import minimist from 'minimist';
import inquirer from 'inquirer';
import { js as jsbeautify } from 'js-beautify';

import { buildStatic, copyMainFile, installModule, packageApp } from '../support/build.process.js';

import pkinfo from '../package.json';

let appPath = path.join(__dirname, '../app');
let distPath = path.join(__dirname, '../dist');

// 移除 app 产出目录
rm('-rf', appPath);

if (!test('-e', distPath)) {
	mkdir(distPath);
}

// 生成生产环境 package.json
let excludeField = ['scripts', 'devDependencies', 'build', 'directories'];
let proPackageJson = {};

Object.keys(pkinfo).forEach((item) => {
	if (excludeField.indexOf(item) === -1) {
		proPackageJson[item] = pkinfo[item];
	}
});

proPackageJson.main = './main/app.babel.js';

// delete vue production dependencies
Object.keys(proPackageJson.dependencies).forEach((item) => {
	if (/vue/.test(item)) {
		delete proPackageJson.dependencies[item];
	}
});

fs.writeFileSync(path.join(__dirname, '../dist/package.json'), jsbeautify(JSON.stringify(proPackageJson)), 'utf-8');

let packExec = '';

const run = function() {
	buildStatic()
		.then(() => {
			return copyMainFile();
		}).then(() => {
			return installModule();
		}).then(() => {
			return packageApp(packExec);
		})
};

inquirer.prompt([{
	type: 'list',
	name: 'platform',
	message: 'which platform?',
	choices: ['mac', 'linux', 'win', 'all']
}, {
	type: 'list',
	name: 'arch',
	message: 'which arch?',
	choices: ['ia32', 'x64', 'all']
}]).then((answers) => {
	packExec = answers.platform === 'win' ? `.\\node_modules\\.bin\\build --platform=${answers.platform} --arch=${answers.arch}` : `./node_modules/.bin/build --platform=${answers.platform} --arch=${answers.arch}`;
	run();
});
