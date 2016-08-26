import fs from 'fs';
import path from 'path';

import webpack from 'webpack';

import baseConfig from './webpack.common.js';
import env from './env.config.js';
import { cssExtractLoaders } from '../support/common.js';

const rootPath = path.join(__dirname, '../');

let entrys = {};
fs.readdirSync(path.join(rootPath, './src/render/entry')).forEach((item) => {
	entrys[item.replace(/\.js/, '')] = path.join(rootPath, './src/render/entry', item);
});

export default {
	entry: entrys,
	output: {
		path: baseConfig.assetsRoot,
		publicPath: baseConfig.assetsPublicPath,
		filename: '[name].js'
	},
	module: {
		preLoaders: [{
			test: /\.vue$/,
			loader: 'eslint',
			exclude: path.join(rootPath, 'node_modules/')
		}, {
			test: /\.js$/,
			loader: 'eslint',
			exclude: path.join(rootPath, 'node_modules/')
		}],
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			exclude: path.join(rootPath, 'node_modules/')
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'static/img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf|woff)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'static/fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	resolve: {
		extensions: ['', '.js', '.vue', '.scss'],
		alias: {
			utils: path.join(rootPath, './src/render/util')
		}
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
	},
	target: 'electron-renderer',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(env)
		})
	],
	vue: {
		loaders: cssExtractLoaders()
	}
};
