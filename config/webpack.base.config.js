import path from 'path';

import webpack from 'webpack';

import baseConfig from './webpack.common.js';

import env from './env.config.js';

const rootPath = path.join(__dirname, '../');

export default {
	entry: {
		app: './src/render/app.js'
	},
	output: {
		path: baseConfig.assetsRoot,
		publicPath: baseConfig.assetsPublicPath,
		filename: '[name].js'
	},
	module: {
		preLoaders: [{
			test: /\.vue$/,
			loader: 'eslint',
			include: rootPath,
			exclude: path.join(rootPath, 'node_modules/')
		}, {
			test: /\.js$/,
			loader: 'eslint',
			include: rootPath,
			exclude: path.join(rootPath, 'node_modules/')
		}],
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			include: rootPath,
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
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'static/fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	vue: {
		sass: 'css!sass'
	},
	resolve: {
		extensions: ['', '.js', '.vue', '.scss']
		// alias: {
		// 	utils: path.join(rootPath, './src/util/'),
		// 	store: path.join(rootPath, './src/vuex/'),
		// 	actions: path.join(rootPath, './src/vuex/actions/')
		// }
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
	},
	target: 'electron-renderer',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(env)
		})
	]
};
