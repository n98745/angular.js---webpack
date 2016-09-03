/*
 * created by lyy on 2016/08/15
 * webpack.config.js
 */

var DefinePlugin = require('webpack').DefinePlugin;
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var outPath = 'dist';
var inputPath = 'app';

var isProductEnv = process.argv[2] === '-p';

var definePlugins = new DefinePlugin({
    webpack_test : !isProductEnv,
    webpack_prod : isProductEnv
});

var config = {

    entry: path.resolve(__dirname, inputPath, "index.js"),
    output: {
        path: outPath,
        filename: "bundle.[hash].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader:"ng-annotate"
            }, /*{
                test: /\.css$/,
                loader: "style!css!autoprefixer"
            }*/, {
                test: /\.html$/,
                exclude: /node_modules/,
                loader:"html"
            }, {
                test: /\.(ttf|eot|otf)$/,
                loader: "file"
            }, {
                test: /\.woff(2)?$/,
                loader: "url?limit=8192&minetype=application/font-woff"
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "url?limit=8192&name=images/[name].[ext]"
            }
        ]
    },

    plugins: [
        definePlugins,
        new HtmlWebpackPlugin({
            filename: path.resolve(outPath, 'index.html'),
            template: path.resolve(inputPath, "index.html")
        })
    ],

    /*
      // webpack dev server configuration
      devServer: {
        contentBase: "./src",
        noInfo: false,
        hot: false,
        port: 3333
      }
      */
    resolve:{
        extentions:["","js"]
    }
};

if (!isProductEnv) {
    console.log("--------------test environment---------------");
    config.module.loaders.push({
	    test: /\.css$/,
        loader: "style!css?sourceMap!autoprefixer"
    });
} else {
      config.module.loaders.push({
          test: /\.css$/,
          loader: "style!css!autoprefixer"
      });
}

module.exports = config;

