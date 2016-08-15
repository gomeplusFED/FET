import path from 'path';

const pwd = __dirname;

export default {
	port: 5757,
	view: path.join(pwd, '../dist/render/index.html'),
	assetsRoot: path.join(pwd, '../dist/render'),
	assetsSubDirectory: 'static',
	assetsPublicPath: '/'
};
