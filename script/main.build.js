/* eslint-disable */
import 'shelljs/global';
import path from 'path';
import minimist from 'minimist';
import packageJson from '../src/package.json';
import packager from 'electron-packager';
import ora from 'ora';
import chalk from 'chalk';

const argv = minimist(process.argv.slice(2));

if (!argv.platform || !argv.arch) {
	console.log(chalk.red.bold('\nError: ') + 'should bring argv. help msg as folllow\n');
	console.log(chalk.cyan.bold('Usage: ') + chalk.green('npm run build:main -- --platform=' + chalk.magenta.bold('<platform>') + ' --arch=' + chalk.magenta.bold('<arch>') + '\n\n') +
				chalk.magenta.bold('platform:') + ' 	darwin | linux | win32\n' +
				chalk.magenta.bold('arch:') + ' 		ia32 | x64\n');
	exit(1);
}

let options = {};

let iconMap = {
	darwin: path.join(__dirname, '../src/icon/icon.icns'),
	win32: path.join(__dirname, '../src/icon/icon.ico'),
	linux: ''
};

rm('-rf', path.join(__dirname, '../app/'));

options.name = packageJson['app-name'];
options.platform = argv.platform;
options.arch = argv.arch;
options.dir = path.join(__dirname, '../src');
options.version = '1.3.2';
options['app-version'] = packageJson.version;
options.ignore = 'render';
options.icon = iconMap[options.platform];
options.out = path.join(__dirname, '../app');

console.log(`\nPackaging ${options.name} v${options['app-version']} for ${options.platform} ${options.arch} ... \n`);

packager(options, (e, path) => {
	if (e) {
		console.log(e);
		return;
	}
	console.log(chalk.green.bold('\nbuild success\n'));

	console.log('app in ' + path[0] + '\n');
});
