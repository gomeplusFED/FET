/* eslint-disable */
import 'shelljs/global';
import minimist from 'minimist';
import packageJon from '../package.json';
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

options.name = packageJon['app-name'];
options.platform = argv.platform;
options.arch = argv.arch;
options.dir = './';
options.version = '1.3.1';
options['app-version'] = packageJon.version;
// options.ignore = 'app';
options.overwrite = true;
options.icon = 'icon/icon.icns';
options.out = './app';

// console.log(`Packaging ${options.name} v${options['app-version']} for ${options.platform} ${options.arch} ... \n`);
// spinner.start();

packager(options, (e, path) => {
	// spinner.stop();
	console.log(chalk.green.bold('\nbuild success'));
});
/* eslint-disable */
