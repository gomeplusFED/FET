/* eslint-disable */
import 'shelljs/global';

import fs from 'fs';
import path from 'path';

import asar from 'asar';

import ora from 'ora';
import chalk from 'chalk';
import qiniu from 'qiniu';
import { js as jsbeautify } from 'js-beautify';

let srcMainPath = path.join(__dirname, '../src/main');
let srcRenderPath = path.join(__dirname, '../src/render');
let distPath = path.join(__dirname, '../dist');

qiniu.conf.ACCESS_KEY = 'ph_x5iVvarUseCKLNyojsXy_g-0Exot_JJO1Shuu';
qiniu.conf.SECRET_KEY = 'NmKd311874wMvQnKPEfJyRel6uqcCnfnx4IFPHir';

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
			console.log(chalk.green.bold('\nBuild success'));
			resovel();
		})
	})
};

// 打包 asar 文件，可供更新
export const buildAsar = function() {
	return new Promise((resolve, reject) => {
		let currentPkgInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
		asar.createPackage(distPath, path.join(__dirname, `../asar/app-${currentPkgInfo.version}.asar`), function() {
			console.log(chalk.green.bold('\nCreate asar success'));
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
		let info = jsbeautify(`export default ${JSON.stringify(result)};`, {
			'indent_with_tabs': true,
			'indent_size': 4,
		}).replace(/\"/g, `'`) + '\n';
		fs.writeFile(path.join(srcMainPath, './config/info.config.js'), info, (err) => {
			fs.writeFile(path.join(srcRenderPath, './config/info.config.js'), info, (err) => {
				resolve();
			});
		});
	})
};

// 创建新 tag 并且推送相关文件到 七牛
export const pushNewTagAndUploadQiniu = function(version) {
	return new Promise((resolve, reject) => {
		exec(`git tag v${version}`);
		let pushSpinner = ora('Pushing tag to github ...').start();
		exec('git commit -am "Releas new version." && git push origin master', { silent: true }, (e, stout) => {
			exec(`git push --tags`, { silent: true }, (e, stout) => {
				if (e) {
					reject(e);
				}
				pushSpinner.stop();
				console.log(chalk.green.bold('Push success.'));

				let bucket = 'luoye';
				let key = `app-${version}.asar`;

				let token = uptoken(bucket, key);
				let filePath = path.join(__dirname, `../asar/app-${version}.asar`);
				let spinner = ora('Uploading asar to qiniu ...').start();
				uploadFile(token, key, filePath, (err) => {
					if (err) {
						reject(err);
					} else {
						spinner.stop();
						console.log(chalk.green.bold('Upload success.'));
						fs.writeFile(path.join(__dirname, '../temp/info.json'), `{"version": "v${version}"}`, (err) => {
							uploadFile(uptoken(bucket, 'info.json'), 'info.json', path.join(__dirname, '../temp/info.json'), () => {
								resolve();
							});
						});
					}
				});
			})
		})
	})
};
