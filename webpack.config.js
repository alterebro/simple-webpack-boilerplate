const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

	entry: {
		bundle: './src/index.js'
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.min.js'
	},

	module: {
		rules: [
			{
				test: /(\.css|\.less)$/,
				exclude: /(node_modules|dist)/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: "css-loader" },
					{ loader: "postcss-loader" },
					{ loader: "less-loader" }
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|dist)/,
				loader: 'babel-loader',
				query: {
                    'presets': [['env', {
                        "targets": {
                            "browsers": ["last 2 versions", "> 2%"]
                        }
                    }]]
                },
			},
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/app.html",
			filename: "index.html",
			inject: 'body',
			minify: { collapseWhitespace: true, removeComments: true },
			hash: true,
			xhtml: true
		}),
		new MiniCssExtractPlugin({
			filename: "app.min.css"
	    })
	]

};
