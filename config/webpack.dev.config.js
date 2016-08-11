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
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: 'FE-Tools',
			filename: 'index.html',
			template: 'view/index.html',
			inject: true,
			favicon: 'src/render/assets/img/icon.png'
		})
	],
	vue: {
		loaders: cssExtractLoaders()
	}
});

export default webpackConfig;
