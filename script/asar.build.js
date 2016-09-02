import { generatePorductionPackageJson, buildStatic, copyMainFile, installModule, buildAsar, injectAppInfo } from '../support/build.process.js';

buildStatic()
	.then(() => {
		return generatePorductionPackageJson();
	})
	.then(() => {
		return injectAppInfo();
	})
	.then(() => {
		return copyMainFile();
	}).then(() => {
		return installModule();
	}).then(() => {
		return buildAsar();
	}).catch((e) => {
		throw e;
	});
