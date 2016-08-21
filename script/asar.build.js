import { buildStatic, copyMainFile, installModule, buildAsar } from '../support/build.process.js';

buildStatic()
	.then(() => {
		return copyMainFile();
	}).then(() => {
		return installModule();
	}).then(() => {
		return buildAsar();
	}).catch((e) => {
		console.log(e);
	});
