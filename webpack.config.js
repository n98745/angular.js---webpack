/*
 * created by lyy on 2016/08/15
 * webpack.config.js
 */

var DefinePlugin = require('webpack').DefinePlugin;
var path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var outPath = 'dist';
var inputPath = 'app';

var isTestEnv = true;
if(process.argv[2] === '-p'){
    console.log("=========production environment=========");
    isTestEnv = false;
} else {
    console.log("=========test environment=========");
}

var definePlugins = new DefinePlugin({
  webpack_test : isTestEnv,
  webpack_prod : !isTestEnv
});

var config = {

  entry: path.resolve(__dirname, inputPath, "index.js"),
  output: {
    path: outPath,
    filename: "bundle.[hash].js"
  },

  module: {
    loaders: [

      // load and compile javascript
      {test: /\.js$/, exclude: /node_modules/, loader:"ng-annotate" },


      // load css and process less
      // { test: /\.css$/, loader: "style!css"},


      // load JSON files and HTML
      { test: /\.html$/, exclude: /node_modules/, loader:"raw" },

      // load fonts(inline base64 URLs for <=8k)
      { test: /\.(ttf|eot|svg|otf)$/, loader: "file" },
      { test: /\.woff(2)?$/, loader: "url?limit=8192&minetype=application/font-woff"},

      // load images (inline base64 URLs for <=8k images)
      { test: /\.(png|jpg|gif|svg)$/, loader: "url-loader?limit=8192&name: '[name].[ext]?[hash]'"}
    ]
  },

  // inject js bundle to index.html
  plugins: [
      definePlugins,
      new CopyWebpackPlugin([
          { from: path.resolve(__dirname, inputPath, "images"), to: path.resolve(outPath, "images")}
      ]),
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

if (isTestEnv) {
  config.module.loaders.push({
	  test: /\.css$/, loader: "style!css!autoprefixer?sourceMap"
  });
  // config.devtool = '#inline-source-map';
} else {
  config.module.loaders.push({
	  test: /\.css$/, loader: "style!css!autoprefixer"
  });
}

module.exports = config;

