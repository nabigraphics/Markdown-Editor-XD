const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
module.exports = {
    entry:{
        bundle:['babel-polyfill','./src/app.js','./src/scss/style.scss'],
        notipoix3:['./src/scss/react-notipoix3.scss']
    },
    output:{
        path:'/dist',
        filename:'[name].js',
        publicPath:'/'
    },
    devServer: {
        hot:true,
        inline: true,
        port: 25252,
        host:'0.0.0.0',
        contentBase: __dirname + '/dist/',
        historyApiFallback: true,
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['env','react']
                    }
                }
            },
            {
                test:/\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new LodashModuleReplacementPlugin()
    ],  
    resolve:{
        modules:['node_modules'],
        extensions:['.js','.scss']
    }
}