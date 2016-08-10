/* eslint-disable */
import 'shelljs/global';
import minimist from 'minimist';
import packageJon from '../package.json';
import packager from 'electron-packager';
import ora from 'ora';

const argv = minimist(process.argv.slice(2));

if (!argv.platform || !argv.arch) {
	console.log('should bring argv ... help msg as folllow\n');
	console.log(`Usage: npm run package -s -- --platform=<platform> --arch=<arch>"
platform: 	darwin, linux, win32
arch: 		ia32, x64
`);
	exit(1);
}

let options = {};

options.name = packageJon['app-name'];
options.platform = argv.platform;
options.arch = argv.arch;
options.dir = './';
options.version = '1.3.1';
options['app-version'] = packageJon.version;
options.ignore = 'dist|app|\\.idea|.*\\.md|LICENSE';
options.overwrite = true;
options.icon = 'icon/icon.icns';
options.out = './app';

console.log(`Packaging ${options.name} v${options['app-version']} for ${options.platform} ${options.arch} ... \n`);
// spinner.start();

packager(options, (e, path) => {
	// spinner.stop();
	console.log('success');
});
