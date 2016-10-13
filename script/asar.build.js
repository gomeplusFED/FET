import logger from '../support/logger.js';
import { generatePorductionPackageJson, buildStatic, babelMainFile, installModule, buildAsar, injectAppInfo } from '../support/build.process.js';

generatePorductionPackageJson()
	.then(() => {
		return injectAppInfo();
	})
	.then(() => {
		return buildStatic();
	})
	.then(() => {
		return babelMainFile();
	}).then(() => {
		return installModule();
	}).then(() => {
		return buildAsar();
	})
	.then(() => {
		logger.success('All succeed.');
	}).catch((e) => {
		throw e;
	});
