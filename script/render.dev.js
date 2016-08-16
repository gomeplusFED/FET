/* eslint-disable */
import path from 'path';
import { exec } from 'child_process';

import express from 'express';
import webpack from 'webpack';
import chalk from 'chalk';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import baseConfig from '../config/webpack.common.js';
import webpackConfig from '../config/webpack.dev.config.js';

const port = baseConfig.port || 5657;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
});

devMiddleware.waitUntilValid(() => {
	console.log(chalk.cyan.bold('\nwebpack-dev-server listening on port '+ baseConfig.port +' ...\n'));
});

const hotMiddleware = webpackHotMiddleware(compiler);

compiler.plugin('compilation', (compilation) => {
	compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
		hotMiddleware.publish({ action: 'reload' });
		cb();
	});
});

app.use(devMiddleware);
app.use(hotMiddleware);

const staticPath = path.join(baseConfig.assetsPublicPath, baseConfig.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

app.listen(port, (err) => {
	if (err) {
		console.log(err);
		return;
	}
});
