import logger from '../support/logger.js';
import { cleanDistPath, generatePorductionPackageJson, buildStatic, babelMainFile, installModule, buildAsar, injectAppInfo } from '../support/build.process.js';

const run = async function() {
	await cleanDistPath();
	await generatePorductionPackageJson();
	await injectAppInfo();
	await installModule();
	await buildStatic();
	await babelMainFile();
	await buildAsar();
	await logger.success('All succeed.');
};

run();
