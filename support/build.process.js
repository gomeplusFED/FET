/* eslint-disable */
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

import asar from 'asar';

import ora from 'ora';
import chalk from 'chalk';
import qiniu from 'qiniu';
import webpack from 'webpack';
import { js as jsbeautify } from 'js-beautify';

import webpackConfig from '../config/webpack.build.config.js';
import baseConfig from '../config/webpack.common.js';
import customConfig from '../config/custom.config.js';

import { babelDir } from './common.js';

import logger from './logger.js';

let srcMainPath = path.join(__dirname, '../src/main');
let srcRenderPath = path.join(__dirname, '../src/render');
let distPath = path.join(__dirname, '../dist');

qiniu.conf.ACCESS_KEY = customConfig.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = customConfig.qiniu.SECRET_KEY;

function uptoken(bucket, key) {
	let putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key);
	return putPolicy.token();
}

function uploadFile(uptoken, key, localFile, cb) {
	var extra = new qiniu.io.PutExtra();
	qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
		if (!err) {
			cb();
		} else {
			cb(err);
		}
	});
}

export const cleanDistPath = function() {
	return new Promise((resolve, reject) => {
		let spinner = ora('Cleaning dist path ...').start();
		exec(`rm -rf ${path.join(__dirname, '../dist')}`, (err, stdout, stderr) => {
			if (err) {
				spinner.stop();
				reject(err);
				logger.fatal(err);
			};
			spinner.stop();
			logger.success('Clean dist path succeed.');
			resolve();
		})
	})
};

// 生成生产环境的 package.json
export const generatePorductionPackageJson = function() {
	return new Promise((resolve, reject) => {
		let spinner = ora('Generate production package.json ...').start();
		let excludeField = ['scripts', 'devDependencies', 'build', 'directories'];
		let proPackageJson = {};
		let currentPkgInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

		Object.keys(currentPkgInfo).forEach((item) => {
			if (excludeField.indexOf(item) === -1) {
				proPackageJson[item] = currentPkgInfo[item];
			}
		});

		proPackageJson.main = './main/app.js';

		// delete vue production dependencies
		Object.keys(proPackageJson.dependencies).forEach((item) => {
			if (/vue/.test(item)) {
				delete proPackageJson.dependencies[item];
			}
		});
		let distPath = path.join(__dirname, '../dist/package.json');
		if (!fs.existsSync(path.join(__dirname, '../dist'))) {
			fs.mkdirSync(path.join(__dirname, '../dist'));
		}
		fs.writeFile(distPath, jsbeautify(JSON.stringify(proPackageJson), {
			'indent_with_tabs': true,
			'indent_size': 4
		}), 'utf-8', function() {
			spinner.stop();
			logger.success('Generate production package.json succeed.');
			resolve();
		});
	});
};

// 注入 app 的相关信息，会在开发或者打包之前写 src/main/config/info.config.js 文件
export const injectAppInfo = function() {
	return new Promise((resolve, reject) => {
		let result = {};
		let requiredFied = ['name', 'version', 'description', 'author', 'homepage', 'license'];
		let currentPkgInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
		requiredFied.forEach((item) => {
			result[item] = currentPkgInfo[item];
		});
		let info = jsbeautify(`export default ${JSON.stringify(result)};`, {
			'indent_with_tabs': true,
			'indent_size': 4
		}).replace(/"/g, "'") + '\n';
		fs.writeFile(path.join(srcMainPath, './config/info.config.js'), info, (err) => {
			if (err) {
				spinner.stop();
				reject(err);
				logger.fatal(err);
			};
			fs.writeFile(path.join(srcRenderPath, './config/info.config.js'), info, (err) => {
				if (err) {
					spinner.stop();
					reject(err);
					logger.fatal(err);
				};
				resolve();
			});
		});
	});
};

// 打包 render 资源
export const buildStatic = function() {
	return new Promise((resolve, reject) => {
		let spinner = ora('Building render process resource ...').start();
		webpack(webpackConfig, function(err, stats) {
			if (err) {
				spinner.stop();
				reject(err);
				logger.fatal(err);
			};
			spinner.stop();
			logger.success('Build render process resource succeed.');
			resolve();
		});
	});
};

// 编译 src/main 文件夹到 dist 目录
export const babelMainFile = function() {
	return new Promise((resolve, reject) => {
		let spinner = ora('Transform main process resource ...').start();

		if (!fs.existsSync(path.join(__dirname, '../', 'dist/main'))) {
			fs.mkdirSync(path.join(__dirname, '../', 'dist/main'));
		}

		exec(`cp -rf ${path.join(__dirname, '../', 'src/main')} ${path.join(__dirname, '../', 'dist')}`, () => {
			babelDir(path.join(__dirname, '../', 'dist/main'), path.join(__dirname, '../', 'dist/main'))
				.then(() => {
					spinner.stop();
					logger.success('Transform main process resource succeed.');
					resolve();
				})
				.catch((err) => {
					spinner.stop();
					logger.fatal(err);
					reject(err);
				});
		});
	});
};

// 安装生产环境依赖
export const installModule = function() {
	return new Promise((resolve, reject) => {
		let spinner = ora('Installing node modules ...').start();
		exec(`cd ${distPath} && npm install`, (err) => {
			if (err) {
				spinner.stop();
				reject(err);
				logger.fatal(err);
			};
			spinner.stop();
			logger.success('Install node modules succeed.');
			resolve();
		});
	});
};

// 打包成安装程序
export const packageApp = function(packExec) {
	return new Promise((resolve, reject) => {
		let spinner = ora('Packaging app ...').start();
		exec(packExec, (err, stdout, stderr) => {
			if (err) {
				spinner.stop();
				reject(err);
				logger.fatal(err);
			};
			spinner.stop();
			logger.success('Package app successd.');
			resolve();
		});
	});
};

// 打包 asar 文件，可供更新
export const buildAsar = function() {
	return new Promise((resolve, reject) => {
		let spinner = ora('Building asar file ...').start();
		let currentPkgInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
		asar.createPackage(distPath, path.join(__dirname, `../asar/app-${currentPkgInfo.version}.asar`), function() {
			spinner.stop();
			logger.success('Building asar file successd.');
			resolve();
		});
	});
};

// 创建新 tag 并且推送相关文件到 七牛
export const pushNewTagAndUploadQiniu = function(version) {
	return new Promise((resolve, reject) => {
		exec(`git tag v${version}`, () => {
			let spinner1 = ora('Pushing to github ...').start();
			exec(`git commit -am "Release new version v${version}."`, { silent: true }, (e, stout) => {
				exec('git push origin master && git push --tags', { silent: true }, (e, stout) => {
					if (e) {
						reject(e);
						logger.fatal(e);
					};
					spinner1.stop();
					logger.success('Push succeed.');

					let bucket = 'luoye';
					let key = `app-${version}.asar`;

					let token = uptoken(bucket, key);
					let filePath = path.join(__dirname, `../asar/app-${version}.asar`);
					let spinner2 = ora('Uploading asar file to qiniu ...').start();
					uploadFile(token, key, filePath, (err) => {
						if (err) {
							spinner.stop();
							reject(err);
							logger.fatal(e);
						} else {
							if (!test('-e', path.join(__dirname, '../temp'))) {
								mkdir(path.join(__dirname, '../temp'));
							}
							fs.writeFile(path.join(__dirname, '../temp/info.json'), `{"version": "v${version}"}`, (err) => {
								uploadFile(uptoken(bucket, 'info.json'), 'info.json', path.join(__dirname, '../temp/info.json'), (ex) => {
									if (err) {
										spinner2.stop();
										reject(err);
										logger.fatal(e);
									}
									spinner2.stop();
									logger.success('Upload asar file succeed.');
									resolve();
								});
							});
						}
					});
				});
			});
		});
	});
};
