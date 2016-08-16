/* eslint-disable */
import 'shelljs/global';

import fs from 'fs';
import path from 'path';

import minimist from 'minimist';
import packager from 'electron-packager';
import chalk from 'chalk';
import ora from 'ora';
import asar from 'asar';
import { js as jsbeautify } from 'js-beautify';

import pkinfo from '../package.json';

const argv = minimist(process.argv.slice(2));

if (!argv.platform || !argv.arch) {
	console.log(chalk.red.bold('\nError: ') + 'should bring argv. help msg as folllow\n');
	console.log(chalk.cyan.bold('Usage: ') + chalk.green('npm run build:main -- --platform=' + chalk.magenta.bold('<platform>') + ' --arch=' + chalk.magenta.bold('<arch>') + '\n\n') +
		chalk.magenta.bold('platform:') + ' 	darwin | linux | win32\n' +
		chalk.magenta.bold('arch:') + ' 		ia32 | x64\n');
	exit(1);
}

// 移除 app 产出目录
rm('-rf', path.join(__dirname, '../app/'));
rm('-rf', path.join(__dirname, '../dist/main'))

if (!test('-e', path.join(__dirname, '../dist'))) {
	mkdir(path.join(__dirname, '../dist'));
}

// 生成生产环境 package.json
let requiredField = ['name', 'app-name', 'version', 'description', 'dependencies', 'license'];
let proPackageJson = {};
requiredField.forEach((item) => {
	proPackageJson[item] = pkinfo[item];
});
proPackageJson.main = './main.asar/app.babel.js';

// delete vue production dependencies
Object.keys(proPackageJson.dependencies).forEach((item) => {
	if (/vue/.test(item)) {
		delete proPackageJson.dependencies[item];
	}
})

fs.writeFileSync(path.join(__dirname, '../dist/package.json'), jsbeautify(JSON.stringify(proPackageJson)), 'utf-8');

// 生成 asar 文件
asar.createPackage(path.join(__dirname, '../src/main'), path.join(__dirname, '../dist/main.asar'), () => {

})

let buildOptions = {};

let iconMap = {
	darwin: path.join(__dirname, '../icon/icon.icns'),
	win32: path.join(__dirname, '../icon/icon.ico'),
	linux: ''
};

buildOptions.name = pkinfo['app-name'];
buildOptions.dir = path.join(__dirname, '../dist');
buildOptions.platform = argv.platform;
buildOptions.arch = argv.arch;
buildOptions.version = '1.3.2';
buildOptions['app-version'] = pkinfo.version;
// buildOptions.ignore = 'app';
buildOptions.overwrite = true;
buildOptions.icon = iconMap[argv.platform];
buildOptions.out = path.join(__dirname, '../app');


// 安装依赖
let installSpinner = ora('Installing node modules ...').start();
exec('cd ' + path.join(__dirname, '../dist') + ' && npm install -s', () => {
	console.log('\n\nInstalled!\n');
	installSpinner.stop();

	// let packageSpinner = ora(`Packaging ${buildOptions.name} v${buildOptions['app-version']} for ${buildOptions.platform} ${buildOptions.arch} ...`).start();

	console.log((`Packaging ${buildOptions.name} v${buildOptions['app-version']} for ${buildOptions.platform} ${buildOptions.arch} ...`));

	// 打包
	packager(buildOptions, (e, path) => {
		if (e) {
			throw e;
		}
		// packageSpinner.stop();
		console.log(chalk.green.bold('\nbuild success'));
	});
});
