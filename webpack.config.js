const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
	//入口文件
	entry: path.resolve(__dirname,'src/js/index.js'),
	//出口文件
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'bundle.js',
	},
	mode: 'development',
	//模块解析
	module: {
		rules: [
		{
			test: /\.css$/,
			use: [ExtractTextPlugin.loader,'css-loader'],
		},
		{
			test:/\.js$/,
			exclude: /node_modules/,//不压缩该文件夹下的内容
			loader: 'babel-loader',
			options: {
				babelrc: false,
				presets: [
					require.resolve('@babel/preset-env',{modulse:false})
				],
				cacheDirectory: true,
			}
		},
		]
	},
	//插件
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname,'src/index.html'),
			filename: 'index.html',
			disableScript: true
		}),//删掉index.html里的所有script和link标签，最终在dist目录下自动生成打包后的index.html
		new ExtractTextPlugin("style.css"),//分离css文件，构建后目录只有一个style.css文件
		new CopyPlugin([{
			from: path.resolve(__dirname,'src/images'),
			to: path.resolve(__dirname,'dist/images'),
		}]),//将src/images下的所有图片复制到dist/images目录中
		new UglifyJSPlugin(),//压缩代码
		new CleanWebpackPlugin(),//每次构建之前删掉dist，避免上次构建的影响
		new webpack.HotModuleReplacementPlugin(),//热更新
	],
	devServer: {
		hot: true,
	}
}