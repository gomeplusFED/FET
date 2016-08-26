import webpack from 'webpack';
import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import baseWebpackConfig from './webpack.base.config.js';

import { cssExtractLoaders } from '../support/common.js';

Object.keys(baseWebpackConfig.entry).forEach((name) => {
	baseWebpackConfig.entry[name] = ['./support/server.client.js'].concat(baseWebpackConfig.entry[name]);
});

let webpackConfig = {};

webpackConfig = merge(baseWebpackConfig, {
	devtool: '#eval-source-map',
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
});

Object.keys(baseWebpackConfig.entry).forEach((item) => {
	// console.log(item);
	webpackConfig.plugins.push(
		new HtmlWebpackPlugin({
			filename: `${item}.html`,
			template: `src/render/view/${item}.html`,
			inject: true,
			chunks: [item],
			chunksSortMode: 'dependency',
			minify: {
				removeComments: true
			}
		})
	);
});

export default webpackConfig;
