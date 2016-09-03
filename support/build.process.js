/* eslint-disable */
import 'shelljs/global';

import fs from 'fs';
import path from 'path';

import asar from 'asar';

import ora from 'ora';
import chalk from 'chalk';
import { js as jsbeautify } from 'js-beautify';

let srcMainPath = path.join(__dirname, '../src/main');
let distPath = path.join(__dirname, '../dist');

// 打包 render 资源
export const buildStatic = function() {
	return new Promise((resolve, reject) => {
		let spinner = ora('Building staic resource ...').start();
		exec(`node ${path.join(__dirname, '../script/render.build.babel.js')} --env=production`, () => {
			spinner.stop();
			resolve();
		})
	})
};

// 拷贝 src/main 文件夹到 dist 目录
export const copyMainFile = function() {
	return new Promise((resolve, reject) => {
		exec(`cp -rf ${ srcMainPath} ${distPath}`, () => {
			resolve();
		})
	})
};

// 生成生产环境的 package.json
export const generatePorductionPackageJson = function() {
	return new Promise((resolve, reject) => {
		let excludeField = ['scripts', 'devDependencies', 'build', 'directories'];
		let proPackageJson = {};
		let currentPkgInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

		Object.keys(currentPkgInfo).forEach((item) => {
			if (excludeField.indexOf(item) === -1) {
				proPackageJson[item] = currentPkgInfo[item];
			}
		});

		proPackageJson.main = './main/app.babel.js';

		// delete vue production dependencies
		Object.keys(proPackageJson.dependencies).forEach((item) => {
			if (/vue/.test(item)) {
				delete proPackageJson.dependencies[item];
			}
		});
		fs.writeFile(path.join(__dirname, '../dist/package.json'), jsbeautify(JSON.stringify(proPackageJson), {
			'indent_with_tabs': true,
			'indent_size': 4,
		}), 'utf-8', function() {
			resolve();
		});
	})
};

// 安装生产环境依赖
export const installModule = function() {
	return new Promise((resolve, reject) => {
		let installSpinner = ora('Installing node modules ...').start();
		exec(`cd ${distPath} && npm install`, () => {
			installSpinner.stop();
			resolve();
		});
	})
};

// 打包成安装程序
export const packageApp = function(packExec) {
	return new Promise((resovel, reject) => {
		exec(packExec, (code, stdout, stderr) => {
			console.log(chalk.green.bold('\nbuild success'));
			resovel();
		})
	})
};

// 打包 asar 文件，可供更新
export const buildAsar = function() {
	return new Promise((resolve, reject) => {
		let currentPkgInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
		asar.createPackage(distPath, path.join(__dirname, `../asar/app-${currentPkgInfo.version}.asar`), function() {
			console.log(chalk.green.bold('\ncreate asar success'));
			resolve();
		})
	})
};

//注入 app 的相关信息，会在开发或者打包之前写 src/main/config/info.config.js 文件
export const injectAppInfo = function() {
	return new Promise((resolve, reject) => {
		let result = {};
		let requiredFied = ['name', 'version', 'description', 'author', 'homepage', 'license'];
		let currentPkgInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
		requiredFied.forEach((item) => {
			result[item] = currentPkgInfo[item];
		})
		fs.writeFile(path.join(srcMainPath, './config/info.config.js'), jsbeautify(`export default ${JSON.stringify(result)};`, {
			'indent_with_tabs': true,
			'indent_size': 4,
		}).replace(/\"/g, `'`) + '\n', (err) => {
			resolve();
		});
	})
};
