import path from 'path';

const pwd = __dirname;

export default {
	webpack: {
		port: 5757,
		view: path.join(pwd, '../dist/index.html'),
		assetsRoot: path.join(pwd, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/'
	}
};
