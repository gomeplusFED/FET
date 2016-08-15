import path from 'path';

import webpack from 'webpack';
import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import env from './env.config.js';
import baseConfig from './webpack.common.js';
import { cssExtractLoaders } from '../support/common.js';
import FormatHtmlPlugin from '../support/formatHtml.js';
import baseWebpackConfig from './webpack.base.config.js';

let webpackConfig = {};

webpackConfig = merge(baseWebpackConfig, {
	vue: {
		loaders: cssExtractLoaders({
			extract: true
		})
	},
	output: {
		path: baseConfig.assetsRoot,
		publicPath: './',
		filename: 'static/js/[name].[chunkhash].js',
		chunkFilename: 'static/js/[id].[chunkhash].js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		// extract css string to file
		new ExtractTextPlugin('static/css/[name].[contenthash].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: (module, count) => {
				return (
					module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../../node_modules')) === 0
				);
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		}),
		new HtmlWebpackPlugin({
			title: 'FE-Tools',
			filename: 'index.html',
			template: 'view/index.html',
			inject: true,
			chunksSortMode: 'dependency',
			minify: {
				removeComments: true
			},
			favicon: 'src/render/assets/img/icon.png'
		}),
		new FormatHtmlPlugin()
	]
});

if (env === 'production' || env === 'pre-production') {
	webpackConfig.plugins.push(new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	}));
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}));
}

export default webpackConfig;
