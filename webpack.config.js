/* eslint-disable no-undef */

const path = require('path');

module.exports = {
	entry: {
		main: [ '@babel/polyfill', './src/index.js' ]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
		publicPath: '/dist'
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			}
		]
	}
};
