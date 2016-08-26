import path from 'path';

import webpack from 'webpack';
import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import env from './env.config.js';
import baseConfig from './webpack.common.js';
import FormatHtmlPlugin from '../support/formatHtml.js';
import baseWebpackConfig from './webpack.base.config.js';

let webpackConfig = {};

webpackConfig = merge(baseWebpackConfig, {
	output: {
		path: baseConfig.assetsRoot,
		publicPath: '../',
		filename: 'static/js/[name].[chunkhash].js',
		chunkFilename: 'static/js/[id].[chunkhash].js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: (module, count) => {
				return (
					module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
				);
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		})
	]
});

Object.keys(baseWebpackConfig.entry).forEach((item) => {
	webpackConfig.plugins.push(
		new HtmlWebpackPlugin({
			filename: `view/${item}.html`,
			template: `src/render/view/${item}.html`,
			inject: true,
			chunks: [item, 'manifest', 'vendor'],
			chunksSortMode: 'dependency',
			minify: {
				removeComments: true
			}
		})
	);
});

webpackConfig.plugins.push(new FormatHtmlPlugin());

// for close vue dev tools
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

export default webpackConfig;
